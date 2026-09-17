# The Museum of Unfinished Things

> *“Everything here was once intended to become something else.”*  
> **A public digital archive devoted to preserving the evidence of intention.**

---

## 🏛️ About the Institution

**The Museum of Unfinished Things** is a permanent digital institution for work that ceased before its intended conclusion: abandoned software prototypes, novels frozen mid-chapter, business models that stayed in spreadsheets, unrecorded albums, and unmade inventions.

Nothing here is framed as a lesson in productivity or failure. In human creative life, the decision to stop is as genuine as the decision to begin. The record is enough.

---

## ✨ Reconstructed & Upgraded Features

### 1. Curated Dual Aesthetic
- **Exhibition Paper & Ink (Default)**: Warm, tactile ivory tones (`#f8f6f0`), deep archival charcoal typography (`#141312`), crimson wax seal stamps (`#8c2d23`), and subtle paper grain overlay.
- **Nocturne Vault Mode**: Deep slate-obsidian vault palette (`#0d0e10`), illuminated parchment text (`#eee9df`), brass and gold metallic accents (`#d6ab4e`).
- **Monumental Typography**: Google Fonts pairing of **Playfair Display** (editorial serif), **Plus Jakarta Sans** (clean modern UI), and **JetBrains Mono** (archival accession tags).

### 2. Interactive Reading Room
- High-fidelity reading experience for all cataloged accessions.
- **Provenance Breakdown**: Accession code (`A—XXXXXXX`), category, founding year, archival status, and contributor credit.
- **Evidence & Marginalia**: Dedicated callout preserving the exact circumstances under which work stopped.
- **Tribute Counter ("I Witness This Intention" 🕯️)**: Interactive visitor tribute counter stored locally and synchronized across visits.

### 3. Real-Time Deposit Intake with Live Card Preview
- Interactive deposit flow for contributors to record their unfinished works.
- **Instant Split Preview**: As you type the title, category, year, and story, the physical archival card updates dynamically in real time before submission.
- **Accession Stamping**: Generates unique museum accession codes (`A—XXXXXXX`) with official confirmation receipt.
- **Hybrid Storage**: Persists instantly to local browser cache and synchronizes directly with the public **Supabase** database when online.

### 4. Canvas Archival Certificate Generator
- Built-in HTML5 Canvas generator rendering high-resolution, exportable digital accession certificates (1200×630).
- Includes museum seals, watermark, accession tags, and quotation typography.
- Ready for immediate download (PNG), clipboard citation linking, or 1-click sharing to **X** and **WhatsApp**.

### 5. Curated Exhibition Wings
- **Wing 01: Never Launched** — Code, platforms, and tools prepared for release dates that never arrived.
- **Wing 02: Chapter Seven** — Manuscripts, screenplays, and poetry collections paused mid-sentence.
- **Wing 03: Almost a Business** — Financial models, supplier sheets, and ventures that never served a customer.

### 6. Synthesized Tactile Web Audio
- Pure programmatic Web Audio API audio synthesis—**zero external audio files or network requests required**.
- Soft tactile clicks on card interactions, paper shuffles on modal navigation, and gentle resonant chimes upon witnessing intention.
- Global audio toggle in header.

### 7. Print-Ready Exhibition Catalog (`@media print`)
- Meticulously designed print styles for printing to physical paper or exporting to PDF.
- Hides buttons, toggles, and modals while formatting all collection records into a clean, typography-first exhibition catalog.

### 8. Contributor Vault & Curator Desk
- Contributor panel to inspect your deposited records.
- Authenticated Curator Desk controls (using access key `404existential` or `curator2026`) to inspect, edit, publish, or withdraw accessions.

---

## 🛠️ Technology Architecture

- **Frontend**: Vanilla HTML5, modern semantic CSS3, ES6+ JavaScript.
- **Aesthetics**: Responsive CSS Grid & Flexbox, CSS Custom Properties, Grain SVG shader, Canvas API.
- **Backend Sync**: Supabase Database (`artifacts` & `profiles` tables) via Supabase JS SDK.
- **Audio Engine**: Web Audio API (programmatic oscillator and noise synthesis).
- **Deployment**: 100% static, zero-build-step architecture ready for GitHub Pages or static web servers.

---

## 🚀 Running Locally

Because the museum is a clean, self-contained static application, you can run it with any static HTTP server:

### Using Python:
```bash
python -m http.server 8000
```
Then visit: `http://localhost:8000`

### Using Node / npx:
```bash
npx serve .
```

---

## 🌐 Deploying to GitHub Pages

1. Ensure all files are committed to the `main` branch.
2. In your GitHub repository settings, navigate to **Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
4. Select `main` branch and `/ (root)` directory.
5. Click **Save**. Your site will be live at:
   `https://<username>.github.io/museum-of-unfinished-things/`

---

## 📜 Database Schema (Supabase)

The complete SQL schema for public accessions and contributor profiles is located in [`supabase.sql`](file:///C:/Users/saiye/.gemini/antigravity-ide/scratch/museum-of-unfinished-things/supabase.sql).

---

*Preserved by the public archive. The museum does not preserve success; it preserves evidence of intention.*