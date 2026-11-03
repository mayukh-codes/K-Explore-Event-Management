// ============================================================
// countdown.js — Countdown timers for event pages
// ============================================================

const activeTimers = [];

function createCountdown(targetDate, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  function update() {
    const now = new Date();
    const target = new Date(targetDate + "T00:00:00");
    const diff = target - now;

    if (diff <= 0) {
      container.innerHTML = `<div class="countdown-ended"><i class="fas fa-calendar-check"></i> Event has started!</div>`;
      return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    container.innerHTML = `
      <div class="countdown-unit">
        <span class="countdown-value">${String(days).padStart(2, "0")}</span>
        <span class="countdown-label">Days</span>
      </div>
      <div class="countdown-sep">:</div>
      <div class="countdown-unit">
        <span class="countdown-value">${String(hours).padStart(2, "0")}</span>
        <span class="countdown-label">Hours</span>
      </div>
      <div class="countdown-sep">:</div>
      <div class="countdown-unit">
        <span class="countdown-value">${String(minutes).padStart(2, "0")}</span>
        <span class="countdown-label">Mins</span>
      </div>
      <div class="countdown-sep">:</div>
      <div class="countdown-unit">
        <span class="countdown-value">${String(seconds).padStart(2, "0")}</span>
        <span class="countdown-label">Secs</span>
      </div>
    `;
  }

  update();
  const id = setInterval(update, 1000);
  activeTimers.push(id);
  return id;
}

// Mini countdown for event cards (days only)
function createMiniCountdown(targetDate, el) {
  if (!el) return;
  const days = Math.ceil((new Date(targetDate) - new Date()) / (1000 * 60 * 60 * 24));
  if (days <= 0) {
    el.innerHTML = `<span class="badge-live">Live Now</span>`;
  } else if (days === 1) {
    el.innerHTML = `<span class="countdown-mini urgent">Tomorrow!</span>`;
  } else if (days <= 7) {
    el.innerHTML = `<span class="countdown-mini urgent">${days} days left</span>`;
  } else {
    el.innerHTML = `<span class="countdown-mini">${days} days away</span>`;
  }
}

// Cleanup all timers when navigating
window.addEventListener("beforeunload", () => {
  activeTimers.forEach(id => clearInterval(id));
});
