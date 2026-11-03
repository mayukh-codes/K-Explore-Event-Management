// ============================================================
// register.js — Form validation & LocalStorage management
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  populateEventSelect();
  prefillFromURL();
  initFormValidation();
  loadRegistrationHistory();
});

// ─── Populate event dropdown ──────────────────────────────────
function populateEventSelect() {
  const select = document.getElementById("event-select");
  if (!select || typeof EVENTS === "undefined") return;

  EVENTS.forEach(ev => {
    const opt = document.createElement("option");
    opt.value = ev.id;
    opt.textContent = `${ev.title} — ${formatShortDate(ev.date)}`;
    select.appendChild(opt);
  });
}

// ─── Pre-fill from URL param ──────────────────────────────────
function prefillFromURL() {
  const params = new URLSearchParams(window.location.search);
  const eventId = params.get("event");
  if (eventId) {
    const select = document.getElementById("event-select");
    if (select) select.value = eventId;
    updateEventInfo(eventId);
  }
}

// ─── Show event info card when event selected ─────────────────
document.getElementById("event-select")?.addEventListener("change", e => {
  updateEventInfo(e.target.value);
});

function updateEventInfo(eventId) {
  const infoBox = document.getElementById("event-info-box");
  if (!infoBox || !eventId || typeof EVENTS === "undefined") return;

  const ev = getEventById(eventId);
  if (!ev) { infoBox.innerHTML = ""; return; }

  const spotsLeft = getSpotsLeft(ev);
  infoBox.innerHTML = `
    <div class="event-info-preview">
      <img src="${ev.image}" alt="${ev.title}" class="preview-img">
      <div class="preview-details">
        <h4>${ev.title}</h4>
        <p><i class="fas fa-calendar"></i> ${formatDate(ev.date)}</p>
        <p><i class="fas fa-clock"></i> ${ev.time} – ${ev.endTime}</p>
        <p><i class="fas fa-map-marker-alt"></i> ${ev.venue}</p>
        <p><i class="fas fa-ticket-alt"></i> ₹${ev.price.toLocaleString("en-IN")}</p>
        <p class="${spotsLeft < 20 ? "spots-low" : "spots-ok"}">
          <i class="fas fa-users"></i> ${spotsLeft} spots remaining
        </p>
      </div>
    </div>
  `;
  infoBox.classList.add("visible");
}

// ─── Real-time Form Validation ────────────────────────────────
function initFormValidation() {
  const form = document.getElementById("registration-form");
  if (!form) return;

  const fields = {
    name: {
      el: form.querySelector("#full-name"),
      validate: v => /^[A-Za-z\s]{3,60}$/.test(v.trim()),
      message: "Name must be 3–60 letters only."
    },
    email: {
      el: form.querySelector("#email"),
      validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      message: "Enter a valid email address."
    },
    phone: {
      el: form.querySelector("#phone"),
      validate: v => /^[6-9]\d{9}$/.test(v.trim()),
      message: "Enter a valid 10-digit Indian mobile number."
    },
    event: {
      el: form.querySelector("#event-select"),
      validate: v => v !== "",
      message: "Please select an event."
    },
    terms: {
      el: form.querySelector("#terms"),
      validate: v => v,
      message: "You must accept the terms and conditions."
    }
  };

  // Live validation
  Object.entries(fields).forEach(([key, field]) => {
    if (!field.el) return;
    const eventType = key === "terms" ? "change" : "input";
    field.el.addEventListener(eventType, () => {
      const val = key === "terms" ? field.el.checked : field.el.value;
      validateField(field.el, field.validate(val), field.message);
    });
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    let valid = true;

    Object.entries(fields).forEach(([key, field]) => {
      if (!field.el) return;
      const val = key === "terms" ? field.el.checked : field.el.value;
      const ok = field.validate(val);
      validateField(field.el, ok, field.message);
      if (!ok) valid = false;
    });

    if (valid) submitRegistration(form, fields);
  });
}

function validateField(el, isValid, message) {
  const wrapper = el.closest(".form-group");
  if (!wrapper) return;
  const errEl = wrapper.querySelector(".error-msg");

  if (isValid) {
    wrapper.classList.remove("invalid");
    wrapper.classList.add("valid");
    if (errEl) errEl.textContent = "";
  } else {
    wrapper.classList.add("invalid");
    wrapper.classList.remove("valid");
    if (errEl) errEl.textContent = message;
  }
}

// ─── Submit & Save to LocalStorage ───────────────────────────
function submitRegistration(form, fields) {
  const eventId = parseInt(form.querySelector("#event-select").value);
  const ev = typeof EVENTS !== "undefined" ? getEventById(eventId) : null;

  const registration = {
    id: `REG-${Date.now()}`,
    timestamp: new Date().toISOString(),
    name: form.querySelector("#full-name").value.trim(),
    email: form.querySelector("#email").value.trim(),
    phone: form.querySelector("#phone").value.trim(),
    eventId,
    eventTitle: ev ? ev.title : "Unknown Event",
    eventDate: ev ? ev.date : "",
    eventVenue: ev ? ev.venue : "",
    eventPrice: ev ? ev.price : 0
  };

  // Save
  const existing = JSON.parse(localStorage.getItem("eventRegistrations") || "[]");
  existing.push(registration);
  localStorage.setItem("eventRegistrations", JSON.stringify(existing));

  // Show success
  showSuccessModal(registration);
  form.reset();
  document.querySelectorAll(".form-group").forEach(g => {
    g.classList.remove("valid", "invalid");
  });
  const infoBox = document.getElementById("event-info-box");
  if (infoBox) { infoBox.innerHTML = ""; infoBox.classList.remove("visible"); }
  loadRegistrationHistory();
}

// ─── Success Modal ────────────────────────────────────────────
function showSuccessModal(reg) {
  const modal = document.getElementById("success-modal");
  if (!modal) return;

  modal.querySelector(".reg-id").textContent = reg.id;
  modal.querySelector(".reg-name").textContent = reg.name;
  modal.querySelector(".reg-event").textContent = reg.eventTitle;
  modal.querySelector(".reg-date").textContent = formatShortDate(reg.eventDate);
  modal.querySelector(".reg-email").textContent = reg.email;

  modal.classList.add("visible");
  document.body.style.overflow = "hidden";

  modal.querySelector(".modal-close")?.addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });

  function closeModal() {
    modal.classList.remove("visible");
    document.body.style.overflow = "";
  }
}

// ─── Registration History Table ───────────────────────────────
function loadRegistrationHistory() {
  const historySection = document.getElementById("registration-history");
  if (!historySection) return;

  const data = JSON.parse(localStorage.getItem("eventRegistrations") || "[]");

  if (data.length === 0) {
    historySection.innerHTML = `<p class="no-history">No registrations yet. Register for an event above!</p>`;
    return;
  }

  const rows = [...data].reverse().map(reg => `
    <tr>
      <td><span class="reg-badge">${reg.id}</span></td>
      <td>${reg.name}</td>
      <td>${reg.eventTitle}</td>
      <td>${formatShortDate(reg.eventDate)}</td>
      <td>₹${reg.eventPrice?.toLocaleString("en-IN") || "—"}</td>
      <td><span class="status-confirmed">Confirmed ✓</span></td>
    </tr>
  `).join("");

  historySection.innerHTML = `
    <table class="history-table">
      <thead>
        <tr>
          <th>Registration ID</th>
          <th>Name</th>
          <th>Event</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <button class="btn btn-outline btn-sm mt-2" onclick="clearHistory()">
      <i class="fas fa-trash"></i> Clear History
    </button>
  `;
}

function clearHistory() {
  if (confirm("Are you sure you want to clear all registration history?")) {
    localStorage.removeItem("eventRegistrations");
    loadRegistrationHistory();
    if (typeof showToast === "function") showToast("History cleared.", "info");
  }
}

