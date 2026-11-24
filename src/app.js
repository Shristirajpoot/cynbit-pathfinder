import { TRACKS, QUESTIONS } from "./data.js";
import { score, encode, decode } from "./scoring.js";

const app = document.getElementById("app");
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
let answers = [];

function intro() {
  app.innerHTML = `
    <section class="card">
      <h1>Not sure where to start?<br/><em>Find your BitElevate track.</em></h1>
      <p class="sub">Answer ${QUESTIONS.length} quick questions and get a personalised learning path, a step-by-step roadmap, and a shareable result. Takes under a minute.</p>
      <div class="row"><button class="btn" id="start">Start the quiz</button></div>
    </section>`;
  document.getElementById("start").onclick = () => { answers = []; question(0); };
}

function question(i) {
  const q = QUESTIONS[i];
  app.innerHTML = `
    <section class="card">
      <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="${QUESTIONS.length}" aria-valuenow="${i}"><div style="width:${(i / QUESTIONS.length) * 100}%"></div></div>
      <div class="step">Question ${i + 1} of ${QUESTIONS.length}</div>
      <h2>${esc(q.q)}</h2>
      ${q.options.map((o, idx) => `<button class="opt" data-i="${idx}">${esc(o.t)}</button>`).join("")}
      ${i > 0 ? `<div class="row"><button class="btn ghost" id="back">← Back</button></div>` : ""}
    </section>`;
  app.querySelectorAll(".opt").forEach((b) => (b.onclick = () => {
    answers[i] = Number(b.dataset.i);
    i + 1 < QUESTIONS.length ? question(i + 1) : result(answers, true);
  }));
  const back = document.getElementById("back");
  if (back) back.onclick = () => question(i - 1);
  app.querySelector(".opt").focus();
}

function result(ans, pushUrl) {
  const ranked = score(ans);
  const top = TRACKS[ranked[0].key];
  const code = encode(ans);
  if (pushUrl) history.replaceState(null, "", `?r=${code}`);
  const shareUrl = `${location.origin}${location.pathname}?r=${code}`;

  app.innerHTML = `
    <section class="card">
      <div class="hero-icon">${top.icon}</div>
      <div class="step">Your best match · ${ranked[0].pct}%</div>
      <h1><em>${esc(top.name)}</em></h1>
      <p class="sub">${esc(top.blurb)}</p>
      <hr/>
      <h2>Your match across tracks</h2>
      ${ranked.map((r) => `<div class="bar"><div class="lbl"><span>${esc(TRACKS[r.key].name)}</span><span>${r.pct}%</span></div><div class="track"><div class="fill" data-w="${r.pct}"></div></div></div>`).join("")}
      <hr/>
      <h2>Suggested roadmap</h2>
      <ol class="road">${top.roadmap.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>
      <hr/>
      <h2>Not ready to pay yet? Talk to a mentor first</h2>
      <p class="sub">BitElevate is a 60-day sprint (₹1,499 via Cashfree). Get a free callback and syllabus for <strong>${esc(top.name)}</strong> before you commit.</p>
      <form id="lead" novalidate>
        <input type="email" id="email" placeholder="you@example.com" aria-label="Email address" required />
        <button class="btn" type="submit">Request callback</button>
      </form>
      <div id="msg" role="status"></div>
      <div class="row">
        <button class="btn ghost" id="share">Copy share link</button>
        <a class="btn ghost" href="https://www.cynbit.in/bitelevate/paths" target="_blank" rel="noopener">View full syllabus</a>
        <button class="btn ghost" id="retry">Retake</button>
      </div>
    </section>`;

  requestAnimationFrame(() => app.querySelectorAll(".fill").forEach((f) => (f.style.width = f.dataset.w + "%")));

  document.getElementById("retry").onclick = () => { history.replaceState(null, "", location.pathname); intro(); };
  document.getElementById("share").onclick = async (e) => {
    try { await navigator.clipboard.writeText(shareUrl); e.target.textContent = "Copied ✓"; }
    catch { prompt("Copy this link:", shareUrl); }
  };
  document.getElementById("lead").onsubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const msg = document.getElementById("msg");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { msg.className = "err"; msg.textContent = "Please enter a valid email."; return; }
    const leads = JSON.parse(localStorage.getItem("pf_leads") || "[]");
    leads.push({ email, track: ranked[0].key, pct: ranked[0].pct, at: new Date().toISOString() });
    localStorage.setItem("pf_leads", JSON.stringify(leads));
    msg.className = "note"; msg.textContent = "Thanks! A Cynbit mentor will reach out (demo: stored locally).";
  };
}

const initial = decode(new URLSearchParams(location.search).get("r"));
initial && !initial.includes(null) ? result(initial, false) : intro();
