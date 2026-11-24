# BitElevate Path Finder

Interactive track-recommender prototype built for the **Cynbit Technologies — Full Stack Developer Intern** technical assessment.

## What it solves
Cynbit's [BitElevate](https://www.cynbit.in/bitelevate) page offers six specialised labs without a comparison tool or recommender, and sends visitors straight to a ₹1,499 Cashfree checkout with no low-commitment step. **BitElevate Path Finder** guides visitors in under a minute to the right lab, shows a match breakdown and 4-step roadmap, generates a shareable result link (`?r=...`), and offers a free mentor callback with transparent pricing before payment.

## Technical Report
Read the full live-site audit, problem statement, architecture decisions, and results in **[REPORT.md](./REPORT.md)**.

## Project Structure
```text
├── index.html            # Page shell and semantic landmarks
├── styles.css            # Dark theme, responsive layout, reduced-motion support
├── src/
│   ├── data.js           # Six real BitElevate labs and weighted quiz questions
│   ├── scoring.js        # Pure match-percentage engine and URL encode/decode
│   └── app.js            # Quiz flow, accessible UI, share link, callback capture
├── test/
│   └── scoring.test.js   # Unit tests covering all 6 labs and edge cases
└── REPORT.md             # Full technical report and website audit
```

## Run Locally
Requires Node.js 18+ (zero external dependencies):

```bash
# Run unit tests (8/8 passing)
npm test

# Serve locally
npx serve .
```
