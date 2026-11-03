// ============================================================
// events.js — Events listing page: render, search, filter, sort
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderEvents(EVENTS);
  initSearch();
  initFilters();
  initSort();
});

let currentCategory = "all";
let currentQuery = "";
let currentSort = "date-asc";

// ─── Render Category Pills ────────────────────────────────────
function renderCategories() {
  const container = document.getElementById("category-pills");
  if (!container) return;

  CATEGORIES.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = `pill ${cat.id === "all" ? "active" : ""}`;
    btn.dataset.category = cat.id;
    btn.innerHTML = `<span>${cat.icon}</span> ${cat.label}`;
    btn.addEventListener("click", () => {
      document.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = cat.id;
      applyFilters();
    });
    container.appendChild(btn);
  });
}

// ─── Render Event Cards ───────────────────────────────────────
function renderEvents(events) {
  const grid = document.getElementById("events-grid");
  const count = document.getElementById("result-count");
  if (!grid) return;

  if (count) count.textContent = `${events.length} event${events.length !== 1 ? "s" : ""} found`;

  if (events.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <h3>No events found</h3>
        <p>Try adjusting your search or filters.</p>
        <button class="btn btn-primary" onclick="resetFilters()">Clear Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = events.map(ev => createEventCard(ev)).join("");

  // Animate cards
  grid.querySelectorAll(".event-card").forEach((card, i) => {
    card.style.animationDelay = `${i * 60}ms`;
    card.classList.add("card-enter");
  });

  // Init mini countdowns
  grid.querySelectorAll(".mini-countdown").forEach(el => {
    createMiniCountdown(el.dataset.date, el);
  });
}

function createEventCard(ev) {
  const spots = getSpotsLeft(ev);
  const pct = getAvailabilityPercent(ev);
  const cat = CATEGORIES.find(c => c.id === ev.category);

  return `
    <article class="event-card" data-id="${ev.id}">
      <div class="card-image-wrap">
        <img src="${ev.image}" alt="${ev.title}" class="card-img" loading="lazy">
        <div class="card-overlay">
          <span class="card-category">${cat?.icon || ""} ${cat?.label || ev.category}</span>
          ${ev.badge ? `<span class="card-badge">${ev.badge}</span>` : ""}
        </div>
        <div class="card-countdown mini-countdown" data-date="${ev.date}"></div>
      </div>
      <div class="card-body">
        <h3 class="card-title">
          <a href="event-detail.html?id=${ev.id}">${ev.title}</a>
        </h3>
        <div class="card-meta">
          <span><i class="fas fa-calendar-alt"></i> ${formatShortDate(ev.date)}</span>
          <span><i class="fas fa-clock"></i> ${ev.time}</span>
        </div>
        <div class="card-meta">
          <span><i class="fas fa-map-marker-alt"></i> ${ev.venue.split(",")[0]}</span>
        </div>
        <p class="card-desc">${ev.description.substring(0, 110)}…</p>
        <div class="card-footer">
          <div class="availability">
            <div class="avail-bar">
              <div class="avail-fill ${pct > 85 ? "avail-hot" : ""}" style="width:${pct}%"></div>
            </div>
            <span class="${spots < 30 ? "spots-low" : "spots-ok"}">
              ${spots <= 0 ? "Sold Out" : `${spots} spots left`}
            </span>
          </div>
          <div class="card-price-action">
            <span class="card-price">₹${ev.price.toLocaleString("en-IN")}</span>
            <a href="event-detail.html?id=${ev.id}" class="btn btn-primary btn-sm">View Details</a>
          </div>
        </div>
      </div>
    </article>
  `;
}

// ─── Search ───────────────────────────────────────────────────
function initSearch() {
  const input = document.getElementById("search-input");
  const clearBtn = document.getElementById("search-clear");
  if (!input) return;

  input.addEventListener("input", () => {
    currentQuery = input.value.toLowerCase();
    if (clearBtn) clearBtn.style.display = currentQuery ? "flex" : "none";
    applyFilters();
  });

  clearBtn?.addEventListener("click", () => {
    input.value = "";
    currentQuery = "";
    clearBtn.style.display = "none";
    applyFilters();
  });
}

// ─── Sort ─────────────────────────────────────────────────────
function initSort() {
  const select = document.getElementById("sort-select");
  if (!select) return;
  select.addEventListener("change", () => {
    currentSort = select.value;
    applyFilters();
  });
}

// ─── Filter Tags (from URL) ───────────────────────────────────
function initFilters() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get("category");
  if (cat) {
    currentCategory = cat;
    document.querySelectorAll(".pill").forEach(p => {
      p.classList.toggle("active", p.dataset.category === cat);
    });
    applyFilters();
  }
}

// ─── Apply All Filters & Sort ─────────────────────────────────
function applyFilters() {
  let result = [...EVENTS];

  // Category
  if (currentCategory !== "all") {
    result = result.filter(e => e.category === currentCategory);
  }

  // Search
  if (currentQuery) {
    result = result.filter(e =>
      e.title.toLowerCase().includes(currentQuery) ||
      e.description.toLowerCase().includes(currentQuery) ||
      e.venue.toLowerCase().includes(currentQuery) ||
      e.tags.some(t => t.toLowerCase().includes(currentQuery))
    );
  }

  // Sort
  result.sort((a, b) => {
    switch (currentSort) {
      case "date-asc":  return new Date(a.date) - new Date(b.date);
      case "date-desc": return new Date(b.date) - new Date(a.date);
      case "price-asc": return a.price - b.price;
      case "price-desc": return b.price - a.price;
      case "name-asc":  return a.title.localeCompare(b.title);
      default: return 0;
    }
  });

  renderEvents(result);
}

function resetFilters() {
  currentCategory = "all";
  currentQuery = "";
  currentSort = "date-asc";
  document.getElementById("search-input").value = "";
  document.querySelectorAll(".pill").forEach(p => {
    p.classList.toggle("active", p.dataset.category === "all");
  });
  document.getElementById("sort-select").value = "date-asc";
  renderEvents(EVENTS);
}

