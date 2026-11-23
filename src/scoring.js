import { TRACKS, QUESTIONS } from "./data.js";

/** answers: array of chosen option index per question. Returns tracks sorted by match %. */
export function score(answers) {
  const totals = Object.fromEntries(Object.keys(TRACKS).map((k) => [k, 0]));
  const max = Object.fromEntries(Object.keys(TRACKS).map((k) => [k, 0]));

  QUESTIONS.forEach((question, i) => {
    for (const k of Object.keys(TRACKS)) {
      max[k] += Math.max(0, ...question.options.map((o) => o.s[k] || 0));
    }
    const opt = question.options[answers[i]];
    if (opt) for (const [k, v] of Object.entries(opt.s)) totals[k] += v;
  });

  return Object.keys(TRACKS)
    .map((key) => ({ key, pct: max[key] ? Math.round((totals[key] / max[key]) * 100) : 0 }))
    .sort((a, b) => b.pct - a.pct);
}

export const encode = (answers) => answers.join("");
export const decode = (str) =>
  /^\d+$/.test(str || "") && str.length === QUESTIONS.length
    ? [...str].map(Number).map((n, i) => (n < QUESTIONS[i].options.length ? n : null))
    : null;
