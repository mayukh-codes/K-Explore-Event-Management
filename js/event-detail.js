// ============================================================
// event-detail.js — Renders the single event detail page
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id || typeof EVENTS === "undefined") {
    showNotFound();
    return;
  }

  const ev = getEventById(id);
  if (!ev) { showNotFound(); return; }

  renderEventDetail(ev);
  renderRelatedEvents(ev);
  createCountdown(ev.date, "event-countdown");
  initScrollEffects();
});

function renderEventDetail(ev) {
  document.title = `${ev.title} — EventSphere`;

  const cat = (typeof CATEGORIES !== "undefined")
    ? CATEGORIES.find(c => c.id === ev.category)
    : null;

  const spots = getSpotsLeft(ev);
  const pct = getAvailabilityPercent(ev);

  // Hero image
  const heroImg = document.getElementById("detail-hero-img");
  if (heroImg) {
    heroImg.src = ev.image;
    heroImg.alt = ev.title;
  }

  // Badge
  const badgeEl = document.getElementById("detail-badge");
  if (badgeEl && ev.badge) {
    badgeEl.textContent = ev.badge;
    badgeEl.style.display = "inline-block";
  }

  // Category
  const catEl = document.getElementById("detail-category");
  if (catEl) catEl.innerHTML = `${cat?.icon || ""} ${cat?.label || ev.category}`;

  // Title
  const titleEl = document.getElementById("detail-title");
  if (titleEl) titleEl.textContent = ev.title;

  // Meta info
  const metaFields = {
    "detail-date": `<i class="fas fa-calendar-alt"></i> ${formatDate(ev.date)}`,
    "detail-time": `<i class="fas fa-clock"></i> ${ev.time} – ${ev.endTime}`,
    "detail-venue": `<i class="fas fa-map-marker-alt"></i> ${ev.venue}`,
    "detail-organizer": `<i class="fas fa-user-tie"></i> ${ev.organizer}`,
    "detail-price": `<i class="fas fa-ticket-alt"></i> ₹${ev.price.toLocaleString("en-IN")}`,
    "detail-capacity": `<i class="fas fa-users"></i> ${ev.capacity.toLocaleString("en-IN")} total capacity`
  };

  Object.entries(metaFields).forEach(([id, html]) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  });

  // Description
  const descEl = document.getElementById("detail-description");
  if (descEl) {
    descEl.innerHTML = ev.longDescription
      .split("\n")
      .map(line => line.trim() ? `<p>${line}</p>` : "")
      .join("");
  }

  // Tags
  const tagsEl = document.getElementById("detail-tags");
  if (tagsEl) {
    tagsEl.innerHTML = ev.tags.map(t => `<span class="tag">#${t}</span>`).join("");
  }

  // Availability
  const availEl = document.getElementById("detail-availability");
  if (availEl) {
    availEl.innerHTML = `
      <div class="avail-stats">
        <span>${ev.registered.toLocaleString("en-IN")} registered</span>
        <span class="${spots < 20 ? "spots-low" : "spots-ok"}">
          ${spots <= 0 ? "<strong>Sold Out</strong>" : `<strong>${spots}</strong> spots left`}
        </span>
      </div>
      <div class="avail-bar large">
        <div class="avail-fill ${pct > 85 ? "avail-hot" : ""}" style="width:${pct}%"></div>
      </div>
      <p class="avail-label">${pct}% filled</p>
    `;
  }

  // Register CTA
  const cta = document.getElementById("detail-register-btn");
  if (cta) {
    if (spots <= 0) {
      cta.textContent = "Sold Out";
      cta.disabled = true;
      cta.classList.add("btn-disabled");
    } else {
      cta.href = `register.html?event=${ev.id}`;
    }
  }

  // Share button
  const shareBtn = document.getElementById("share-btn");
  if (shareBtn) {
    shareBtn.addEventListener("click", () => {
      if (navigator.share) {
        navigator.share({ title: ev.title, url: window.location.href });
      } else {
        navigator.clipboard.writeText(window.location.href);
        if (typeof showToast === "function") showToast("Link copied to clipboard!", "success");
      }
    });
  }
}

function renderRelatedEvents(ev) {
  const container = document.getElementById("related-events");
  if (!container || typeof EVENTS === "undefined") return;

  const related = EVENTS
    .filter(e => e.id !== ev.id && e.category === ev.category)
    .slice(0, 3);

  if (related.length === 0) {
    container.closest("section")?.remove();
    return;
  }

  container.innerHTML = related.map(e => `
    <article class="event-card mini-card">
      <div class="card-image-wrap">
        <img src="${e.image}" alt="${e.title}" class="card-img" loading="lazy">
        ${e.badge ? `<span class="card-badge">${e.badge}</span>` : ""}
      </div>
      <div class="card-body">
        <h4 class="card-title"><a href="event-detail.html?id=${e.id}">${e.title}</a></h4>
        <div class="card-meta">
          <span><i class="fas fa-calendar-alt"></i> ${formatShortDate(e.date)}</span>
        </div>
        <div class="card-meta">
          <span><i class="fas fa-map-marker-alt"></i> ${e.venue.split(",")[0]}</span>
        </div>
        <div class="card-price-action" style="margin-top:0.75rem">
          <span class="card-price">₹${e.price.toLocaleString("en-IN")}</span>
          <a href="event-detail.html?id=${e.id}" class="btn btn-outline btn-sm">View</a>
        </div>
      </div>
    </article>
  `).join("");
}

function showNotFound() {
  document.getElementById("detail-content")?.insertAdjacentHTML("afterbegin", `
    <div class="not-found-state">
      <div class="not-found-icon">🎫</div>
      <h2>Event Not Found</h2>
      <p>The event you're looking for doesn't exist or has been removed.</p>
      <a href="events.html" class="btn btn-primary">Browse All Events</a>
    </div>
  `);
}
