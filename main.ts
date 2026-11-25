import { mkdirSync, writeFileSync } from "node:fs";

// Entry for make.fun — "The Funniest Out-of-Office".
//
// The setup is an ordinary out-of-office notice; the twist is who
// took over while the owner is away. The dog does not just watch the
// inbox, he works it — every sender gets the same two-word reply,
// and management has already noticed. One line, no trailing newline,
// 129 characters, inside the bounty gate of 1 to 140.
const opener = "I'm out of office until Monday.";
const handover = "My dog is covering my inbox";
const punchline =
  "he's replied to everyone with 'good boy' and already been promoted.";

const line = `${opener} ${handover} — ${punchline}`;

const destinations = [process.env.MAKEFUN_OUTPUT_DIR, "/output"];
for (const dir of destinations) {
  if (!dir) continue;
  try {
    mkdirSync(dir, { recursive: true });
    writeFileSync(`${dir}/entry.txt`, line, "utf8");
  } catch {
    // A missing or read-only directory is skipped; /output is the gate.
  }
}
