# 🎉 EventSphere — Event Management Website

> A modern, fully responsive event management website built with HTML5, CSS3, and Vanilla JavaScript.

[![Live Demo](https://img.shields.io/badge/Live-Demo-6C63FF?style=for-the-badge&logo=vercel)](https://your-deployment-url.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/your-username/Elective)

---

## 📌 Overview

**EventSphere** is a full-featured event management website that allows users to:
- 🔍 Browse and discover upcoming events across India
- 🔎 Search and filter events by category, name, venue, or tags
- 📋 View detailed event information with countdown timers
- 📝 Register for events with form validation and confirmation
- 🌙 Switch between dark and light mode
- 💾 View registration history stored in LocalStorage

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| **HTML5** | Semantic page structure |
| **CSS3** | Custom properties, Flexbox, Grid, animations |
| **JavaScript (ES6+)** | Dynamic rendering, DOM manipulation, LocalStorage |
| **Font Awesome 6** | Icons throughout the UI |
| **Google Fonts (Inter)** | Typography |
| **Unsplash API** | Event imagery (CDN URLs) |

> No frameworks or build tools required. Pure vanilla HTML/CSS/JS.

---

## 📁 Project Structure

```
Elective/
├── index.html              # Homepage with hero, featured events, categories
├── events.html             # Browse all events with search & filter
├── event-detail.html       # Individual event detail page with countdown
├── register.html           # Registration form with validation
├── about.html              # About page with team, mission, timeline
├── css/
│   ├── style.css           # Main stylesheet (2000+ lines)
│   └── responsive.css      # Responsive breakpoints
├── js/
│   ├── events-data.js      # Events data store + utility functions
│   ├── main.js             # Core: navbar, theme, scroll animations
│   ├── events.js           # Events page: render, search, filter, sort
│   ├── event-detail.js     # Single event page renderer
│   ├── register.js         # Form validation + LocalStorage
│   └── countdown.js        # Countdown timer components
└── README.md
```

---

## ✨ Features

### 🏠 Homepage
- Animated hero section with gradient blobs and floating cards
- Featured events grid (3-column layout)
- Animated statistics counter (50K+ attendees, 500+ events, etc.)
- Category browsing grid linking to filtered events page
- Customer testimonials section
- Call-to-action banner

### 📅 Events Listing Page
- **8 events** across 7 categories
- **Real-time search** — filter by title, description, venue, or tags
- **Category filter pills** — filter by Technology, Arts, Business, Health, Music, Education, Food
- **Sort options** — by date (asc/desc), price (asc/desc), or name (A–Z)
- Animated event cards with lazy-loaded images
- Live spot availability bars
- Mini countdown badges on each card

### 🎫 Event Detail Page
- Full event image hero with overlay
- Detailed info grid (date, time, venue, organizer, price, capacity)
- Formatted long description
- Sticky sidebar with:
  - Live countdown timer (days/hours/mins/secs)
  - Availability bar with spots remaining
  - Registration CTA button
- Related events section (same category)
- Share button (Web Share API + clipboard fallback)

### 📝 Registration Page
- **Form fields**: Full name, email, phone, event selection, requirements, terms
- **Real-time validation** with custom error messages:
  - Name: 3–60 letters only
  - Email: RFC-compliant regex
  - Phone: 10-digit Indian mobile (starts 6–9)
  - Event: required selection
  - Terms: required checkbox
- **Visual feedback**: green ✓ / red border per field
- **Event preview card** appears when event is selected
- **Success modal** with booking ID and event details
- **Registration history table** — persisted to LocalStorage
- Clear history button with confirmation

### 🌙 Dark / Light Mode
- Implemented via CSS custom properties on `[data-theme]`
- Persisted in `localStorage` across sessions
- Smooth transitions on all color/background changes

### ⏱️ Countdown Timers
- Full countdown (DD:HH:MM:SS) on event detail pages
- Mini "X days away" / "Tomorrow!" / "Live Now" badges on cards
- Urgent styling for events within 7 days

### 🔁 LocalStorage
- Theme preference (`theme`)
- Registration history (`eventRegistrations`) — array of booking objects

### 📱 Responsive Design
- **Breakpoints**: 1100px, 768px, 480px, 360px
- Mobile-first approach with a slide-in drawer navigation
- Touch-friendly UI elements
- Horizontal scroll for tables on small screens

### 🎨 UI/UX Highlights
- CSS custom properties for consistent theming
- Intersection Observer API for scroll-triggered animations
- Animated gradient blobs on hero section
- Card hover effects (lift + image zoom)
- Toast notification system
- Back-to-top button
- Animated counter statistics

---

## 🚀 Getting Started

### Run Locally

```bash
# Clone the repository
git clone https://github.com/your-username/Elective.git

# Navigate to project directory
cd Elective

# Open in browser (no build step required)
# Simply open index.html in your browser
```

Or serve with a local server for best results:

```bash
# Using Python
python -m http.server 8080

# Using Node.js (npx)
npx serve .

# Using VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

### Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "Initial commit: EventSphere project"
git branch -M main
git remote add origin https://github.com/your-username/Elective.git
git push -u origin main

# Then enable GitHub Pages in Settings → Pages → Deploy from main branch
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

---

## 📊 Event Data

The website includes **8 sample events** across **7 categories**:

| # | Event | Category | Date | Price |
|---|-------|----------|------|-------|
| 1 | TechFest 2026 | Technology | Dec 15, 2026 | ₹1,499 |
| 2 | Creative Arts Summit | Arts | Dec 22, 2026 | ₹799 |
| 3 | Startup Pitch Night | Business | Dec 28, 2026 | ₹2,499 |
| 4 | Wellness & Yoga Retreat | Health | Jan 8, 2027 | ₹3,999 |
| 5 | Music Fest India 2027 | Music | Jan 20, 2027 | ₹1,299 |
| 6 | Data Science Bootcamp | Technology | Jan 25, 2027 | ₹2,999 |
| 7 | Literary Festival Kolkata | Education | Feb 5, 2027 | ₹299 |
| 8 | Food & Culture Carnival | Food | Feb 14, 2027 | ₹499 |

---

## 🎯 Bonus Features Implemented

- [x] **Dark/Light mode** with localStorage persistence
- [x] **Event countdown timers** (full + mini)
- [x] **Smooth scroll animations** via Intersection Observer
- [x] **LocalStorage** registration data management
- [x] **Animated statistics counter**
- [x] **Toast notifications**
- [x] **Web Share API** integration
- [x] **Responsive across all breakpoints**

---

## 📸 Screenshots

| Page | Description |
|------|-------------|
| Homepage | Hero section, featured events, categories, testimonials |
| Events | Full listing with search, category filter, and sort |
| Event Detail | Full event info, countdown timer, sidebar registration CTA |
| Register | Form with real-time validation and registration history |
| About | Mission, team cards, timeline, values |
| Dark Mode | All pages support dark mode |

---

## 🎓 Project Information

- **Course**: Elective — Web Development
- **Technology**: HTML5, CSS3, Vanilla JavaScript
- **Version Control**: Git + GitHub
- **Deployed on**: Vercel / Netlify / GitHub Pages

---

## 📄 License

This project is created for educational purposes as part of a web development elective course assignment.

---

> Built with ❤️ using pure HTML, CSS, and JavaScript — no frameworks, no build tools, just web standards.
