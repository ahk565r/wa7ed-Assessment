# Wa7ed Assessment

و1حد للتقييمات

A bilingual (Arabic / English) Technology, AI, Cybersecurity and Regulatory Readiness Assessment platform for SMEs.

Front-end MVP: plain HTML, CSS and vanilla JavaScript. No framework, no backend, no database, no secrets.

## Purpose

The project helps organizations evaluate:

- Technology maturity and governance
- Business systems and processes
- Cloud and infrastructure
- Cybersecurity and risk
- Data, backup and business continuity
- AI and automation readiness
- Vendor and financial management
- People, skills and change
- Regulatory readiness

## Files

| File | Purpose |
|---|---|
| `index.html` | Main interface |
| `style.css` | Visual design and responsive layout |
| `questions.js` | Assessment sections and questions (edit here to change content) |
| `app.js` | Navigation, storage, scoring and results |
| `README.md` | Project documentation |
| `.gitignore` | Files excluded from Git |

`questions.js` must load before `app.js` (already set in `index.html`).

## Run locally

Open `index.html` in a browser.

Or serve the folder (recommended, closer to GitHub Pages):

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a repository named `wa7ed-assessment`.
2. Upload all six files to the repository root.
3. Settings → Pages → Build and deployment → Source: **Deploy from a branch**.
4. Branch: **main**, folder: **/(root)** → Save.
5. Wait 1–2 minutes. The site will be at:

```
https://USERNAME.github.io/wa7ed-assessment/
```

All paths are relative, so no configuration changes are needed.

## Scoring

| Value | English | العربية |
|---|---|---|
| 1 | Not in place | غير موجود |
| 2 | Partially in place | موجود بشكل محدود |
| 3 | In place but inconsistent | موجود ولكن غير منتظم |
| 4 | Well established | مطبق بشكل جيد |
| 5 | Fully established and measured | مطبق بالكامل ويتم قياسه |
| N/A | Not applicable / Not sure | لا ينطبق / غير متأكد |

Rules:

- N/A and unanswered questions are excluded — they never reduce a score.
- Domain % = domain average ÷ 5 × 100.
- A domain with no numeric answers is left out of the results.
- Overall score = average of the domain averages (each domain weighted equally).
- Organization Profile is informational and is not scored.

## Maturity Levels

| Average | Level | المستوى |
|---|---|---|
| 1.00–1.80 | Initial | مبدئي |
| 1.81–2.60 | Developing | قيد التطوير |
| 2.61–3.40 | Defined | مُعرّف |
| 3.41–4.20 | Managed | مُدار |
| 4.21–5.00 | Optimized | مُحسن |

Averages are rounded to two decimals before classification.

## Design

| Token | Value | Use |
|---|---|---|
| Navy | `#0A2540` | Text, primary buttons, selected answers |
| Deep blue | `#12406B` | Hero and results gradients |
| Teal | `#14A3A8` | Accent on dark surfaces, progress |
| Deep teal | `#0B7C82` | Accent on light surfaces (AA contrast) |
| Light gray | `#F2F5F8` | Page background |

Typeface: IBM Plex Sans Arabic (Google Fonts, Arabic + Latin), falling back to Segoe UI / Tahoma.

Signature element: the maturity ladder. The 1–5 answer buttons rise like steps, and the results page shows the overall level on the same ladder. Domain bars carry tick marks at the maturity band boundaries (36%, 52%, 68%, 84%).

## Current Features

- Arabic (RTL), English (LTR) and bilingual modes
- Progress bar, completion %, per-section answered counters
- Section sidebar (horizontal scroller on mobile)
- Previous / Next / Save, auto-save to `localStorage`
- Optional notes per section (saved as you type)
- Results: overall score, maturity level, domain scores, top 3 strengths, top 3 improvement areas, next steps
- Back to assessment and restart
- Responsive layout for desktop, tablet and iPhone

## localStorage keys

| Key | Content |
|---|---|
| `wa7edAnswers` | Answers by question ID |
| `wa7edNotes` | Notes by section ID |
| `wa7edLanguage` | `both`, `ar` or `en` |

Data stays in the respondent's browser only. Nothing is sent anywhere.

## Future Roadmap

- Google Sheets integration
- Supabase
- Client records
- Regulatory mapping
- Automated recommendations
- PDF reports
- Email notifications
- Consultant dashboard

## Security

Do not store in this repository:

- Passwords
- Tokens
- API keys
- Database credentials
- Client confidential information

When a backend is added, keep keys server-side (or use Supabase row-level security with only the public anon key in the browser).
