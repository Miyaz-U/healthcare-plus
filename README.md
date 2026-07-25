# HealthCare+ 🏥

A responsive doctor appointment booking website built with **HTML5, CSS3, and vanilla JavaScript (ES6)** — no frameworks, no libraries, no backend.

🔗 **Live demo:**https://miyaz-u.github.io/healthcare-plus/

## About

HealthCare+ lets patients browse doctors, filter them by specialization, search by name, and book appointments online — all with a clean, professional healthcare-themed UI. This was built as a hands-on project to practice core front-end fundamentals: DOM manipulation, form validation, responsive layouts, and browser storage — without relying on any frontend framework.

## Features

**Core**
- Multi-page site: Home, Doctors, Appointment, About, Contact
- Doctor listings generated dynamically from a JavaScript array of objects
- Filter doctors by specialization + live search by name (combinable)
- Full appointment booking form with field-by-field validation (name, age, phone, email, date, symptoms)
- Date validation (no past dates)
- Custom success notification (auto-dismisses after 3 seconds)
- Fully responsive: 4 → 2 → 1 doctor cards across desktop, tablet, and mobile; collapsible mobile navigation

**Bonus**
- 🌙 Dark / Light theme toggle (persisted via `localStorage`)
- ⏳ Loading spinner while doctors "load"
- ✨ Animated, staggered doctor card entrance
- 🕐 Available time slots shown per selected doctor
- ❤️ Favorite doctors (persisted via `localStorage`)
- 📋 Appointment history with remove/clear (persisted via `localStorage`)
- 📅 Site-wide reminder banner for the next upcoming appointment (dismiss persisted via `sessionStorage`)

## Tech Stack

- HTML5 (semantic markup, forms, tables where relevant)
- CSS3 (Flexbox, Grid, CSS variables, animations, media queries)
- JavaScript ES6 (arrays, objects, template literals, `localStorage`/`sessionStorage`, event delegation)

No frameworks. No build step. Just open `index.html` in a browser.

## Folder Structure

```
HealthCare+
│
├── index.html
├── doctors.html
├── appointment.html
├── about.html
├── contact.html
│
├── css/
│   ├── style.css
│   ├── doctor.css
│   ├── appointment.css
│   ├── about.css
│   ├── contact.css
│   └── responsive.css
│
├── js/
│   ├── doctorsData.js
│   ├── doctors.js
│   ├── filter.js
│   ├── favourites.js
│   ├── validation.js
│   ├── notification.js
│   ├── history.js
│   ├── remainder.js
│   └── main.js
│
└── images/
    ├── logo.jpeg
    ├── banners/
    ├── doctors/
    └── icon/
```

## Running Locally

No installation needed — this is a static site.

1. Clone the repo:
   ```bash
   git clone https://github.com/YOUR-USERNAME/healthcare-plus.git
   ```
2. Open `index.html` directly in your browser, or serve it with any static server (e.g. the VS Code "Live Server" extension).

## Deployment

Deployed via **GitHub Pages** directly from the `main` branch. Any push to `main` automatically redeploys the live site.

## Notes

- All doctor and appointment data is stored in the browser (`localStorage`), not a real database — this is a front-end learning project with no backend.
- Built in phases (setup → doctors listing → filter/search → appointment form → validation/booking → responsive design → additional pages → bonus features) as a structured learning exercise.
