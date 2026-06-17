# Bioinformatics · 21 Days

A self-paced, interactive bioinformatics study site for **R + Python**, built as a static site that publishes cleanly on **GitHub Pages**.

It is themed around real-world infectious-pathogen diagnostic (IVD) R&D so the worked examples and case studies are relevant to that domain.

## What's inside

- **21 daily lessons** — objectives, curated YouTube searches, reading, hands-on tasks, an interactive quiz, GitHub repos, Reddit threads, and a case study.
- **Three weeks** — Week 1 foundations, Week 2 R + Bioconductor, Week 3 Python + professional tooling.
- **Quiz Arena** — 20 random questions across all 21 days.
- **Case Studies** — Level 0 → Level 3, with real code (shell, R, Python).
- **Resources hub** — channels, repos, subreddits, canonical databases.
- **Progress tracking** — saved in your browser's `localStorage` (no account, no server).
- **Light / Dark theme** — toggle in the navbar.

## File layout

```
bioinformatics-21days/
├── index.html              ← landing page (curriculum grid)
├── day.html                ← renders any day via ?day=N
├── resources.html
├── case-studies.html
├── quiz.html
├── README.md
├── .nojekyll               ← tells GitHub Pages to serve files as-is
└── assets/
    ├── styles.css
    ├── main.js             ← theme, progress, quiz, page rendering
    └── days-data.js        ← all 21 days of curriculum content
```

## Run it locally

It's pure static HTML/CSS/JS — no build step. Just open `index.html` in a browser. For best behavior (some browsers block `localStorage` on the `file://` scheme), serve it:

```bash
# Python
python -m http.server 8000
# then open http://localhost:8000/

# OR Node
npx serve .
```

## Publish on GitHub Pages

1. Create a new GitHub repo, e.g. `bioinformatics-21days`.
2. Push these files to the `main` branch.

   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/bioinformatics-21days.git
   git push -u origin main
   ```

3. In the repo **Settings → Pages**:
   - **Source**: Deploy from a branch
   - **Branch**: `main` / `/ (root)`
   - Save.

4. Within a minute or two your site is live at:
   ```
   https://<YOUR-USERNAME>.github.io/bioinformatics-21days/
   ```

### To use it as your *user-site* root (`<username>.github.io`)

Push the same files to a repo named exactly `<YOUR-USERNAME>.github.io` instead — your site will be served at `https://<YOUR-USERNAME>.github.io/`.

## Customizing the content

All curriculum content lives in **`assets/days-data.js`** as a single `DAYS` array. Each day looks like:

```js
{
  day: 5, weekNum: 1, week: "Week 1 · Foundations",
  title: "Public Databases",
  summary: "...",
  intro: "...",
  tags: [{label:"Databases", cls:"bio"}],
  objectives: [...],
  videos:  [{title, url, note}],      // url → opens on YouTube
  reading: [{title, url, note}],
  tasks:   ["...", "..."],
  quiz:    [{q, options:[...], answer:<index>, explain:"..."}],
  github:  [{title, url, note}],
  reddit:  [{title, url, note}],
  caseStudy: {level: 0..3, title, body, code?: "..."}
}
```

Edit, save, refresh. No build step. No framework.

## Why no embedded YouTube videos?

YouTube video IDs are unstable (videos get removed). Curated YouTube **search** URLs always return fresh, real results, so the site won't rot. If you want to embed specific videos you trust, add an `embed: "https://www.youtube.com/embed/..."` property next to `url` in a `videos` entry — the renderer in `assets/main.js` already supports it.

## License

MIT. Use freely for personal or team study. If you fork it as your own learning log, drop a link in the README so others can follow your progress.

## Credits

Designed as a personal study site to accompany infectious-pathogen IVD R&D (Gachon University · KRIBB · 중겸 partnership context, 2026 R&D plan).
