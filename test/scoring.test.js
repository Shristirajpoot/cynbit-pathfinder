import test from "node:test";
import assert from "node:assert";
import { score, encode, decode } from "../src/scoring.js";

test("builder answers rank full-stack first", () => {
  const r = score([0, 0, 2, 4, 0]);
  assert.strictEqual(r[0].key, "fullstack");
});

test("design answers rank UI/UX first", () => {
  const r = score([1, 1, 0, 1, 3]);
  assert.strictEqual(r[0].key, "uiux");
});

test("percentages are within 0-100", () => {
  for (const { pct } of score([2, 2, 3, 2, 1])) assert.ok(pct >= 0 && pct <= 100);
});

test("encode/decode roundtrip and invalid input", () => {
  assert.deepStrictEqual(decode(encode([0, 1, 2, 3, 0])), [0, 1, 2, 3, 0]);
  assert.strictEqual(decode("abc"), null);
  assert.strictEqual(decode("01"), null);
});

test('QA answers rank QA lab first', () => { assert.strictEqual(score([3, 5, 0, 3, 2])[0].key, 'qa'); });
test('AI answers rank AI lab first', () => { assert.strictEqual(score([2, 2, 3, 2, 1])[0].key, 'ai'); });
test('Backend answers rank Python Backend lab first', () => { assert.strictEqual(score([0, 3, 2, 0, 1])[0].key, 'backend'); });
test('Frontend answers rank Frontend Ops lab first', () => { assert.strictEqual(score([1, 4, 1, 5, 0])[0].key, 'frontend'); });
