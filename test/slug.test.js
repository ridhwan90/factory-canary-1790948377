import { test } from "node:test";
import assert from "node:assert/strict";
import { slugify } from "../src/slug.js";

test("lowercases and joins words with the default separator", () => {
  assert.equal(slugify("Hello Factory World"), "hello-factory-world");
});

test("collapses punctuation runs into one separator", () => {
  assert.equal(slugify("Canary --- Run!"), "canary-run");
});

test("strips diacritics to ascii", () => {
  assert.equal(slugify("Café Métrics"), "cafe-metrics");
});

test("trims leading and trailing separators", () => {
  assert.equal(slugify("  trimmed title "), "trimmed-title");
});

test("honors a custom separator", () => {
  assert.equal(slugify("one two three", "_"), "one_two_three");
});

test("rejects non-string titles", () => {
  assert.throws(() => slugify(42), TypeError);
});

test("rejects an empty separator", () => {
  assert.throws(() => slugify("x", ""), RangeError);
});

test("truncates to maxWords when provided", () => {
  assert.equal(slugify("One Two Three Four", "-", 2), "one-two");
});

test("does not truncate when maxWords exceeds word count", () => {
  assert.equal(slugify("One Two", "-", 5), "one-two");
});

test("rejects maxWords <= 0", () => {
  assert.throws(() => slugify("x", "-", 0), RangeError);
  assert.throws(() => slugify("x", "-", -1), RangeError);
});

test("maps symbols to words when symbols is true", () => {
  assert.equal(slugify("Tom & Jerry", "-", undefined, true), "tom-and-jerry");
  assert.equal(slugify("$100 @ stake", "-", undefined, true), "dollar-100-at-stake");
});

test("mapped words participate in maxWords truncation", () => {
  assert.equal(slugify("A & B & C", "-", 2, true), "a-and");
});

test("does not map symbols when symbols is false", () => {
  assert.equal(slugify("Tom & Jerry"), "tom-jerry");
  assert.equal(slugify("Tom & Jerry", "-", undefined, false), "tom-jerry");
});

test("rejects non-boolean symbols parameter", () => {
  assert.throws(() => slugify("test", "-", undefined, "invalid"), TypeError);
  assert.throws(() => slugify("test", "-", undefined, null), TypeError);
});
