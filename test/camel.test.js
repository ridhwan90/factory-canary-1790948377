import { test } from "node:test";
import assert from "node:assert/strict";
import { camelCase } from "../src/camel.js";

test("camelCases space-separated titles", () => {
  assert.equal(camelCase("hello factory world"), "helloFactoryWorld");
});

test("collapses separator runs and trims leading and trailing separators", () => {
  assert.equal(camelCase("  multiple   spaces here "), "multipleSpacesHere");
  assert.equal(camelCase("\tmultiple\n\tspace\tkinds\n"), "multipleSpaceKinds");
});

test("treats hyphens as word separators", () => {
  assert.equal(camelCase("already-kebab-case"), "alreadyKebabCase");
});

test("treats mixed punctuation runs as one separator", () => {
  assert.equal(camelCase("mix-- and _-match"), "mixAndMatch");
});

test("returns the empty string for empty input", () => {
  assert.equal(camelCase(""), "");
});

test("returns the empty string for separator-only input", () => {
  assert.equal(camelCase("  \t - "), "");
});

test("lowercases the first word and leaves later word suffixes untouched", () => {
  assert.equal(camelCase("Hello WORLD again"), "helloWORLDAgain");
});

test("rejects non-string titles", () => {
  assert.throws(() => camelCase(42), TypeError);
  assert.throws(() => camelCase(null), TypeError);
  assert.throws(() => camelCase(undefined), TypeError);
  assert.throws(() => camelCase(), TypeError);
  assert.throws(() => camelCase(true), TypeError);
  assert.throws(() => camelCase({}), TypeError);
  assert.throws(() => camelCase(["a", "b"]), TypeError);
  assert.throws(() => camelCase(new String("boxed title")), TypeError);
});
