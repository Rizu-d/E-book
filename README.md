# 📖 Student Handbook 2022/2023 – Interactive Flipbook

An interactive, lightweight 3D digital flipbook built with pure **HTML, CSS, and Vanilla JavaScript** (zero external libraries) for the **Student Handbook 2022/2023** of the **Faculty of Humanities and Social Sciences, University of Ruhuna**.

🔗 **Live Demo:** [https://rizu-d.github.io/E-book/](https://rizu-d.github.io/E-book/)

---

## ✨ Features

- **Realistic 3D Page-Flip Animation:** Smooth CSS 3D transforms with dynamic spine shading and `prefers-reduced-motion` accessibility support.
- **Responsive Dual & Single-Page Views:** Automatically adapts between a two-page book spread on desktop and a single-page view on mobile/portrait screens, with a manual toggle button.
- **Interactive Navigation Panel:**
  - **Table of Contents (TOC):** Expandable multi-level chapter and sub-topic navigation across all 21 chapters (including Sinhala examination guidelines).
  - **Page Thumbnails:** Lazy-loaded visual grid of all 160 pages for quick jumping.
- **Zoom & Pan:** Zoom levels from `100%` up to `300%` (`100%`, `125%`, `150%`, `200%`, `250%`, `300%`) with click-and-drag panning on desktop and pinch-to-zoom on touch devices.
- **Multiple Control Methods:**
  - Range slider & direct page number input
  - Keyboard shortcuts (`ArrowRight`, `ArrowLeft`, `Space`, `PageDown`, `PageUp`, `Home`, `End`, `+`, `-`, `0`, `F`, `Escape`)
  - Touch swipe gestures & clickable left/right page zones
  - URL hash deep-linking (e.g., `https://rizu-d.github.io/E-book/#77` opens directly to page 77)
- **Offline Ready:** Works directly in any modern browser without a build step, bundler, or backend server.

---

## 📁 Project Structure

```text
E-book/
├── index.html      # Main layout, top bar, side navigator, stage, and controls
├── style.css       # 3D flipbook styling, responsive layout, and dark glassmorphism UI
├── script.js       # Flipbook engine, TOC data, lazy-loading, zoom, and input handlers
├── pages/          # High-resolution page images (001.jpg – 160.jpg)
├── thumbs/         # Thumbnail images for the page preview panel (001.jpg – 160.jpg)
└── README.md       # Project documentation
```

---

## 🚀 Getting Started

### Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/Rizu-d/E-book.git
   ```
2. Navigate to the project folder and open `index.html` in any web browser.

### Customizing for Another Book
To reuse this flipbook template for a different publication, update the configuration constants at the top of `script.js`:

```javascript
const TOTAL     = 160;                 // Total number of pages
const AR        = 515.88 / 728.52;     // Page aspect ratio (width / height)
const PAGE_DIR  = 'pages/';            // Folder containing 001.jpg, 002.jpg, ...
const THUMB_DIR = 'thumbs/';           // Folder containing thumbnail images
```

Then update the `TOC` array in `script.js` to match your book's chapters and page numbers.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
| :--- | :--- |
| `→` / `PageDown` / `Space` | Next page |
| `←` / `PageUp` | Previous page |
| `Home` | Jump to first page (Cover) |
| `End` | Jump to last page |
| `+` / `=` | Zoom in |
| `-` / `_` | Zoom out |
| `0` | Reset zoom to 100% |
| `F` | Toggle full-screen mode |
| `Esc` | Close side drawer (on mobile) |

---

## 🛠️ Built With

- **HTML5** – Semantic structure and ARIA accessibility attributes
- **CSS3** – CSS Grid, Custom Properties, 3D `preserve-3d` transforms, and responsive media queries
- **JavaScript (ES6+)** – Windowed DOM rendering, lazy image loading, Pointer Events, and `ResizeObserver`

---

## 📄 Credits

- **Content:** Student Handbook 2022/2023, Faculty of Humanities and Social Sciences, University of Ruhuna.
- **Repository & Maintenance:** [@Rizu-d](https://github.com/Rizu-d)