// ============================================================
// main.js — Core utilities: theme, navbar, scroll effects
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavbar();
  initScrollEffects();
  initBackToTop();
  highlightActiveNav();
});

// ─── Theme (Dark / Light) ────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem("theme") || "light";
  applyTheme(saved);

  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  const icon = document.querySelector("#theme-toggle i");
  if (icon) {
    icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
  }
}

// ─── Navbar ──────────────────────────────────────────────────
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navOverlay = document.querySelector(".nav-overlay");

  // Scroll shadow
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }
  });

  // Mobile menu
  menuToggle?.addEventListener("click", () => {
    navMenu?.classList.toggle("open");
    navOverlay?.classList.toggle("visible");
    const icon = menuToggle.querySelector("i");
    if (icon) {
      icon.className = navMenu?.classList.contains("open")
        ? "fas fa-times"
        : "fas fa-bars";
    }
  });

  navOverlay?.addEventListener("click", closeMenu);
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  function closeMenu() {
    navMenu?.classList.remove("open");
    navOverlay?.classList.remove("visible");
    const icon = menuToggle?.querySelector("i");
    if (icon) icon.className = "fas fa-bars";
  }
}

function highlightActiveNav() {
  const page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach(link => {
    const href = link.getAttribute("href");
    if (href === page || (page === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
}

// ─── Scroll-based Animations ──────────────────────────────────
function initScrollEffects() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".fade-in, .slide-up, .slide-left, .slide-right").forEach(el => {
    observer.observe(el);
  });
}

// ─── Back to Top ─────────────────────────────────────────────
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ─── Utility ─────────────────────────────────────────────────
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container") || createToastContainer();
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "times-circle" : "info-circle"}"></i>
    <span>${message}</span>
  `;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

function createToastContainer() {
  const div = document.createElement("div");
  div.id = "toast-container";
  document.body.appendChild(div);
  return div;
}

// ─── Stats Counter Animation ─────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.getAttribute("data-target"));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString("en-IN");
  }, 16);
}

function initCounters() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll(".stat-number[data-target]").forEach(el => {
    observer.observe(el);
  });
}
