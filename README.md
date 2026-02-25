# Itzfizz Digital — Scroll-Driven Hero Section

A premium scroll-driven hero section animation built for Itzfizz Digital's web development internship assignment.

## ✨ Features

- **Staggered intro animation** — Headline letters reveal with an expo ease, stats animate in one by one with delay
- **Scroll-driven car animation** — The hero car moves smoothly across the viewport tied to scroll progress (not time-based)
- **GSAP ScrollTrigger** — All scroll animations use `scrub` for perfectly fluid, physics-like interpolation
- **Letter drift effect** — Headline letters drift apart as you scroll with alternating directions
- **Performance optimized** — Uses `transform` properties only, no layout reflows, `willChange` hints applied
- **Noise overlay** — Subtle film grain texture for a premium feel
- **Content section** — Services cards with hover interactions and scroll-triggered reveal

## 🛠 Tech Stack

- **Next.js 14** (App Router, static export ready)
- **React 18**
- **Tailwind CSS**
- **GSAP + ScrollTrigger**
- **TypeScript**

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# The /out folder is ready to deploy to GitHub Pages
```

## 📦 Deployment (GitHub Pages)

1. Push to GitHub repository
2. Go to Settings → Pages → set source to `gh-pages` branch or `/out` folder
3. Or use the `gh-pages` npm package:

```bash
npm install --save-dev gh-pages
# Add to package.json scripts:
# "deploy": "next build && touch out/.nojekyll && gh-pages -d out"
npm run deploy
```

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout with fonts & noise overlay
│   ├── page.tsx         # Main page
│   └── globals.css      # Global styles & CSS variables
├── components/
│   ├── HeroSection.tsx  # Hero + scroll animations (main assignment)
│   └── ContentSection.tsx # Services section with scroll reveal
├── public/              # Static assets
└── README.md
```

## 🎨 Design Choices

- **Color palette**: Deep black `#050505` + warm gold `#c8a96e` — luxury digital studio aesthetic
- **Typography**: Bebas Neue (display) + DM Sans (body) — editorial & modern
- **Car**: Custom SVG top-view sports car — no external image dependency
- **Noise texture**: Inline SVG grain overlay for depth without extra requests

## Submission Checklist

- [ ] Live URL (GitHub Pages)
- [ ] GitHub Repository URL
