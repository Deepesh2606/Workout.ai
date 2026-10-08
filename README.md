# HyperState

A sleek, dark-themed biomechanical muscle visualizer and hypertrophy workout planner. Built with React, Vite, Tailwind CSS, and `react-body-highlighter`.

## Features

1. **Home — Muscle Groups Grid**:
   - Interactive grid of the 8 primary anatomical muscle groups: **Chest, Back, Shoulders, Biceps, Triceps, Legs, Glutes, Abs**.
   - Displays real-time movement counts and targeting benefits.
   - Tapping any muscle group immediately filters the exercise library.

2. **Exercise Library & Fast Filters**:
   - Live search bar by exercise name, target muscle, equipment, or movement pattern.
   - Granular filters for **Equipment** (*Barbell, Dumbbell, Cable, Machine, Body Only, etc.*) and **Experience Level** (*Beginner, Intermediate, Expert*).
   - High-performance cards displaying exercise name, primary muscle, assistance muscles, equipment type, and visual thumbnail.

3. **Biomechanical Exercise Detail Page**:
   - **Interactive Body Diagram (`react-body-highlighter`)**: Highlights primary muscle targets in vibrant neon red (`#FF334B`) and secondary assisting muscles in warm amber (`#FB923C`), with an Anterior (Front) and Posterior (Back) toggle.
   - **Auto-Looping Slideshow**: Alternates smoothly between Phase 1 (Starting Position) and Phase 2 (Peak Contraction) using `yuhonas/free-exercise-db` assets. Includes play/pause, manual frame controls, and indicators.
   - **Step-by-Step Execution**: Clear numbered instructions for exact movement mechanics.
   - **HyperState Form & Mistake Analysis**: Iconic segmented card with glowing neon green (`#10B981`) and neon red (`#EF4444`) borders:
     - **Correct Form**: Key cues, scapular alignment, breathing mechanics, and tempo.
     - **Common Mistakes**: Frequent errors, injury risk factors, and immediate coaching corrections.

4. **Workout Day Planner**:
   - Create, edit, and organize multiple daily routines (*Push Day, Pull Day, Leg Day, etc.*).
   - Log working sets, target reps, weight (kg/lbs), and toggle completed reps.
   - Inline exercise quick-search and add modal.
   - Built-in rest timer (45s, 60s, 90s, 120s) with play/pause controls.
   - Automatically persisted to `localStorage`.

5. **Full Body Heatmap**:
   - Dual anatomical projection (Front & Back) displaying the cumulative training volume of all exercises in your current day plan.
   - Normalized 5-tier intensity heatmap (*Light, Moderate, Core, Heavy, Peak*).
   - Ranked muscle workload breakdown list; tap any muscle to view which exercises and sets are activating it.

6. **Design & UX**:
   - Premium dark theme (`#0B0F14` background with `#0F141C` and `#141B24` cards).
   - Neon red and neon green accents with subtle glow effects.
   - Mobile-first responsive layout with desktop navigation and mobile bottom tab bar.
   - Smooth transitions using `motion`.

---

## Data Source & Caching

Exercises are sourced from [yuhonas/free-exercise-db](https://github.com/yuhonas/free-exercise-db):
- Fetched dynamically from GitHub Raw.
- Cached automatically in the browser's `localStorage` (`youcan_exercises_cache_v2`).
- Bundled fallback dataset ensures instant load without blocking on network latency or offline mode.

---

## Quickstart

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd youcan-exercise-visualizer

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port specified by Vite) to view the app.

### Production Build

```bash
npm run build
npm run preview
```

---

## Deploy to Vercel

This app is client-side only (no backend required) and deploy-ready for Vercel:

1. Push this repository to GitHub.
2. In Vercel, click **New Project** and import the repository.
3. Framework Preset: **Vite** (detected automatically).
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Click **Deploy**.
