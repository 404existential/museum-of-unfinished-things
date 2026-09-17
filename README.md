# The Museum of Unfinished Things // Dark Maximalist Edition

> *“Everything here was once intended to become something else.”*  
> **A public digital archive devoted to preserving the evidence of human intention.**

---

## ⚡ Visual Identity: The Dark Maximalist Record Wall

**The Museum of Unfinished Things** is a high-octane digital institution built to hold work that stopped before its intended conclusion: abandoned software prototypes, novels paused mid-chapter, business models trapped in spreadsheets, unrecorded music, and unmade inventions.

Nothing here is framed as a lesson in productivity. The record is enough.

- **Obsidian Void Canvas**: Deep `#050505` backdrop with gritty film grain and giant ghost `ARCHIVE` typography.
- **Fluorescent Palette**: Acid Yellow (`#d7ff00`), Hot Punk Pink (`#ff3b9d`), Electric Cyan (`#27e7ff`), and Safety Orange (`#ff6b00`).
- **Slanted UNFINISHED Hazard Tape**: 45-degree warning tape and stamped `RECORD // 01` tags across card corners.
- **Hard Offset Neon Shadows**: `11px 11px` saturated drop shadows with dynamic organic rotations (`-1.4deg`, `1.7deg`) that straighten and elevate on hover.
- **Curated Wings**: *Never Launched* (Code), *Chapter Seven* (Manuscripts), and *Almost a Business* (Commerce).

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom brutalist shadow and color tokens
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend**: [Supabase](https://supabase.com/) Database (`artifacts` table) with instant offline `localStorage` fallback
- **Audio Synthesis**: Programmatic Web Audio API for mechanical clicks and tribute chimes
- **Certificate Generator**: HTML5 Canvas rendering high-res punk-brutalist archival posters
- **CI/CD**: GitHub Actions workflow for zero-touch deployment to GitHub Pages

---

## 🚀 Running Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Vite Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```
The optimized bundle will be compiled into the `dist/` directory.

---

## 🌐 Deploying to GitHub Pages

A GitHub Actions workflow is preconfigured in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

1. Push your changes to the `main` branch:
   ```bash
   git push origin main
   ```
2. In your repository on GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `GitHub Actions`.
4. The workflow will automatically build and publish your site at:
   `https://404existential.github.io/museum-of-unfinished-things/`

---

## 📜 Database Schema

The SQL schema for the public Supabase archive is located in [`supabase.sql`](supabase.sql).

---

*Preserved in the public archive. The museum does not preserve success; it preserves evidence of intention.*