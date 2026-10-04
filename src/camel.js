/**
 * Convert a human title into camelCase: runs of whitespace and ASCII
 * punctuation act as word separators and are removed, the first word is
 * lowercased, and the first letter of each subsequent word is capitalized.
 */
export function camelCase(title) {
  if (typeof title !== "string") {
    throw new TypeError("title must be a string");
  }
  const words = title.split(/[\s!-\/:-@[-`{-~]+/).filter(Boolean);
  if (words.length === 0) {
    return "";
  }
  const [first, ...rest] = words;
  return [
    first.toLowerCase(),
    ...rest.map((word) => word[0].toUpperCase() + word.slice(1)),
  ].join("");
}
