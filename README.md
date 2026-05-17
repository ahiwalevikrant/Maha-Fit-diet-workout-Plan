# 🍃 MahaFit — Maharashtrian Fitness & Diet Planner

A personalised, **no-signup** fitness and diet plan generator built specifically for Maharashtrian families.

## ✨ Features

- **Single or Couple plans** — one app, two personalised plans
- **PCOD/PCOS support** — dedicated yoga, diet, and hormone-balancing tips
- **Maharashtrian diet** — jowar bhakri, sol kadhi, thalipeeth, chaas and more
- **Equipment-aware** — skipping rope, resistance bands, yoga mat, dumbbells, or no equipment
- **Health conditions** — knee pain, back pain, thyroid, diabetes, BP support
- **PDF Export** — download your full plan as PDF
- **3-Month phased plan** — Foundation → Intensity → Shred
- **No signup, no account, no ads** — just your plan

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## 📦 Build for Production

```bash
npm run build
```

Output in the `dist/` folder — deploy anywhere (Vercel, Netlify, GitHub Pages).

## 🛠️ Tech Stack

- **React 18** + **Vite**
- **jsPDF** + **html2canvas** for PDF export
- Zero external UI libraries — 100% custom design
- Mobile-first responsive layout

## 📁 Project Structure

```
src/
├── components/
│   ├── Onboarding.jsx    # Multi-step questionnaire
│   ├── Dashboard.jsx     # Main plan view + tab navigation
│   ├── WorkoutTab.jsx    # Workout plan with accordion
│   ├── DietTab.jsx       # Meal plan + smart swaps
│   └── TipsTab.jsx       # Tips + Progress tracker
├── data/
│   └── mahaData.js       # Full Maharashtrian food & workout DB
└── utils/
    └── generatePlan.js   # Plan generation logic
```

## 🌿 About

Built with love for Maharashtrian families who want real, practical fitness advice rooted in their own food culture — not generic western diet plans.

> **Disclaimer:** This app is for healthy adults. Consult a doctor for PCOD, diabetes, or any medical condition before starting a new fitness regime.
