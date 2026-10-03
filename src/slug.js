/**
 * Convert a human title into a URL slug: lowercased ASCII, words joined by
 * the separator (default "-"), runs of separators collapsed.
 */
export function slugify(title, separator = "-", maxWords, symbols = false) {
  if (typeof title !== "string") {
    throw new TypeError("title must be a string");
  }
  const sep = String(separator);
  if (sep === "") {
    throw new RangeError("separator must not be empty");
  }
  if (maxWords !== undefined && maxWords <= 0) {
    throw new RangeError("maxWords must be greater than 0");
  }
  if (symbols !== undefined && typeof symbols !== "boolean") {
    throw new TypeError("symbols must be a boolean");
  }

  let processedTitle = title;
  if (symbols) {
    processedTitle = processedTitle
      .replace(/\$/g, " dollar ")
      .replace(/&/g, " and ")
      .replace(/@/g, " at ");
  }

  let words = processedTitle
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
  if (maxWords !== undefined) {
    words = words.slice(0, maxWords);
  }
  if (words.length === 0) {
    return "";
  }
  const escaped = sep.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const collapse = new RegExp(`${escaped}{2,}`, "g");
  const trim = new RegExp(`^${escaped}|${escaped}$`, "g");
  return words.join(sep).replace(collapse, sep).replace(trim, "");
}
