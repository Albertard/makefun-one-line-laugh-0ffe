// One Line, One Laugh — make.fun entry
// Writes exactly one funny line to /output/entry.txt. The judge picks the
// funniest line in blind pairwise rounds.
//
// The line: "My smart fridge emailed me a breakup letter — apparently I've been seeing the vending machine behind its back."
// Why it wins: it is a single self-contained joke with a real turn — the
// setup is a household appliance acting like a jealous partner, and the
// punchline reveals the "affair" is with a vending machine, an even dumber
// appliance. It is tight (every word earns its place), fresh (a domestic
// betrayal played out between machines, not a recycled Wi-Fi joke), clear
// on first read, and relatable: everyone's smart devices already nag them
// like a disappointed spouse.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const MAX_LINE_LENGTH = 140;

const LINE =
  "My smart fridge emailed me a breakup letter — apparently I've been seeing the vending machine behind its back.";

// Gate: the entry must be UTF-8 text of 1 to MAX_LINE_LENGTH characters,
// not only whitespace, and a single line. No trailing newline: the scorer
// counts every character in the file, so the file holds the line alone.
function validateLine(line: string): void {
  if (line.length < 1 || line.length > MAX_LINE_LENGTH) {
    throw new Error(
      `entry must be 1-${MAX_LINE_LENGTH} characters, got ${line.length}`,
    );
  }
  if (!line.trim()) {
    throw new Error("entry must not be only whitespace");
  }
  // Any CR or LF breaks the single-line rule, including a lone \r.
  if (/[\r\n]/.test(line)) {
    throw new Error("entry must be a single line");
  }
}

validateLine(LINE);

const outPath = "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE, "utf8");
console.log(`wrote ${JSON.stringify(LINE)} to ${outPath}`);
