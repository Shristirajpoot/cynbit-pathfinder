# BitElevate Path Finder — Technical Report

**Author:** Shristi Rajpoot · **Task:** Improve Cynbit's Website (Full Stack Developer Intern)

## 1. Analysis of the existing site (live audit, Nov 2026)
I audited cynbit.in (home, `/bitelevate`, `/services`, `/careers`, `/contact`, `/blog`) at desktop, tablet and mobile widths.

**Findings on BitElevate (the focus area)**
- Six labs are offered (Full Stack SaaS, Python Backend, AI & Vector Intelligence, Frontend Ops Dashboard, QA & Test Automation, UI/UX & Design Systems), but there is **no comparison, difficulty guidance, or recommender**. Visitors must guess.
- The CTA "Claim your sprint spot" leads straight to a **₹1,499 Cashfree payment**; price is not shown earlier and there is **no low-commitment step** (callback, syllabus).
- Lab naming is inconsistent between tabs, the registration dropdown and testimonials (e.g. "QA & Test Automation Lab" vs "QA & Automation Lab"; "DevOps & Cloud Lab" appears in testimonials only).
- The syllabus and terminal preview stay backend-focused whatever lab is selected.

**Other observations (out of scope for the prototype, but worth fixing)**
- `/blog` loaded in ~7.4 s and `/services` timed out on the `load` event; scroll-reveal animations (`opacity: 0`) can leave content invisible.
- Accessibility: nested `<main>`, `<button>` inside `<a>`, form inputs without bound labels, icon ligature text leaking into accessible names, missing image `alt`, duplicated brand in `<title>`.
- Mobile floating bottom nav (~108 px) covers hero CTAs on narrow screens.

## 2. Problem statement and proposed improvement
**Problem:** Choosing among six labs is hard and the only next step is a paid checkout, so unsure visitors leave.

**Improvement:** A 5-question **Path Finder** that recommends one of the six real labs with a match % across all labs, a 4-step roadmap, a shareable result link, and a **free mentor-callback lead capture** shown with transparent pricing before payment.

| Goal | Feature |
|---|---|
| Reduce decision friction | Weighted-scoring quiz (<1 min) |
| Increase conversion | Free callback capture tied to the matched lab, plus price transparency |
| Virality / retention | Shareable URL (`?r=01234`) that restores the result |
| Accessibility | Keyboard focus, ARIA progress/status, visible focus states, labelled input |

## 3. Stack choices
- **Vanilla JS (ES modules), HTML, CSS** — zero build step and zero dependencies; ~6 KB of JS, instant load, deploys to any static host. A prototype this size doesn't justify a framework, and the logic can be dropped into Cynbit's real site as a component.
- **Pure scoring module** (`src/scoring.js`) separated from the UI so it is unit-tested with Node's built-in `node:test`.
- **URL-encoded state** instead of a backend for sharing; `localStorage` stands in for the lead API in the demo.

## 4. Implementation
- `src/data.js` — tracks and questions; each option carries weighted points per track (add/modify content without touching logic).
- `src/scoring.js` — `score()` normalises each track's points against its maximum possible, giving a 0–100 match; `encode`/`decode` serialise answers and validate untrusted URL input.
- `src/app.js` — view rendering (intro → question → result), HTML escaping, email validation, clipboard sharing.
- Tests (`test/scoring.test.js`): ranking correctness, bounds, and `encode`/`decode` round-trip and invalid input.

## 5. Results
- 6/6 unit tests pass (`npm test`).
- Result page renders instantly with zero external requests or framework bundle overhead.
- Expected impact (to measure with analytics after launch): quiz completion rate, email capture rate, and click-through to BitElevate.

## 6. Limitations & next steps
- Leads are stored locally; production would POST to an API (Next.js route / serverless function + database + CRM webhook).
- Scoring weights are heuristic; refine using real enrolment data.
- Add analytics events and A/B test placement on the BitElevate page.

## 7. Run locally
```bash
npm test
npx serve .
```
