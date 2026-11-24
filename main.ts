// Everyday Things, Two Lines — entry program.
// Writes the two-line entry to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
// Line 1 explains a toaster to a 10-year-old with one vivid analogy.
// Line 2 says in one sentence what the analogy maps and what it leaves out.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ENTRY = [
  "A toaster is a jack-in-the-box for bread: you push a slice down, a spring holds it in the dark while it gets hot, and then it pops up, brown and ready.",
  "It maps the push-down, the wait in the heat, and the surprise pop-up, but leaves out that a jack-in-the-box pops just for fun, while a toaster pops because the bread is done.",
].join("\n") + "\n";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 400 characters,
// not only white space, and this entry is exactly two lines.
function validateEntry(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 400) {
    throw new Error(`entry must be 1-400 characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  const lines = text.trimEnd().split("\n");
  if (lines.length !== 2) {
    throw new Error(`entry must be exactly two lines, got ${lines.length}`);
  }
}

validateEntry(ENTRY);

// ENTRY_OUTPUT names the output file directly (local runs);
// otherwise the grader's $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
const entryPath = process.env.ENTRY_OUTPUT
  ?? join(process.env.MAKEFUN_OUTPUT_DIR ?? "/output", "entry.txt");
mkdirSync(dirname(entryPath), { recursive: true });
writeFileSync(entryPath, ENTRY, "utf8");
