// Text sanitisation for the generated PDF.
//
// pdfmake renders from the embedded font's outlines only, and its bundled Roboto is
// a SUBSET with no emoji and no arrows/dingbats — so those characters come out as
// "tofu" rectangles (□). We fix that in two passes over every text string:
//
//   1. Convert known, meaningful-but-missing symbols to ASCII that Roboto CAN render
//      (→ becomes "->", ✓ becomes "[x]", …). Meaning is preserved, no box.
//   2. Strip emoji entirely AND tidy the whitespace they leave, so there's no box
//      and no orphaned gap. (A monochrome emoji font only ever looks worse, so we
//      don't embed one.)
//
// Pass 1 runs first so symbols that are *also* classed as emoji (e.g. ➡, ✔) get
// converted to ASCII rather than dropped.

/* eslint-disable @typescript-eslint/no-explicit-any */
type Node = any;

const log = (...args: unknown[]) =>
  typeof process !== 'undefined' &&
  process.env.NODE_ENV !== 'production' &&
  console.log('[pdf:text]', ...args);

// Missing-but-meaningful glyphs → renderable ASCII. Covers the common arrow and
// check/cross variants that show up in technical docs.
const SYMBOL_MAP: Record<string, string> = {
  '→': '->', // → rightwards arrow
  '⟶': '->', // ⟶ long rightwards arrow
  '➔': '->', // ➔ heavy wide-headed arrow
  '➡': '->', // ➡ black rightwards arrow (emoji)
  '←': '<-', // ← leftwards arrow
  '⟵': '<-', // ⟵ long leftwards arrow
  '↔': '<->', // ↔ left-right arrow
  '⇒': '=>', // ⇒ rightwards double arrow
  '⇐': '<=', // ⇐ leftwards double arrow
  '✓': '[x]', // ✓ check mark
  '✔': '[x]', // ✔ heavy check mark
  '✗': '[ ]', // ✗ ballot x
  '✘': '[ ]', // ✘ heavy ballot x
};
const SYMBOL_RE = new RegExp(
  '[' + Object.keys(SYMBOL_MAP).join('') + ']',
  'gu'
);

// A single emoji unit: ZWJ sequences (👨‍👩‍👧), regional-indicator flags (🇵🇰),
// keycaps (#️⃣), and standalone pictographs (🟢 ☀ ✅). Based on Extended_Pictographic
// — NOT \p{Emoji} — so bare digits / '#' / '*' are never matched. Non-capturing so
// it can be embedded in the sequence regex below without shifting capture indices.
const ATOM =
  '(?:\\p{RI}\\p{RI}' +
  '|[#*0-9]\\uFE0F\\u20E3' +
  '|\\p{Extended_Pictographic}\\uFE0F?(?:\\u200D\\p{Extended_Pictographic}\\uFE0F?)*)';

// One or more emoji (allowing spaces between them) plus the spaces hugging the run,
// so we can swallow "🔴🟡 " or " ☀ " in one shot. No capture groups → the replace
// callback's (match, offset, string) args stay correct.
const SEQ_RE = () =>
  new RegExp(`[ \\t]*${ATOM}(?:[ \\t]*${ATOM})*[ \\t]*`, 'gu');

let converted = 0;
let stripped = 0;

// Clean one string: convert known symbols to ASCII, then strip emoji + collapse the
// gap each emoji run leaves:
//   - run at the start or end of the fragment → removed with its spaces
//   - run in the middle → replaced by a single space (keeps the two sides apart)
function cleanString(s: string): string {
  const withAscii = s.replace(SYMBOL_RE, (ch) => {
    converted++;
    return SYMBOL_MAP[ch];
  });
  return withAscii.replace(SEQ_RE(), (match: string, offset: number, full: string) => {
    stripped++;
    const atStart = offset === 0;
    const atEnd = offset + match.length === full.length;
    return atStart || atEnd ? '' : ' ';
  });
}

// Walk the pdfmake content tree and clean every text string in place. Handles strings
// inside arrays, node.text (string or nested array), and any other container keys
// (stack, columns, table.body, ul, ol, …).
function walk(node: Node): void {
  if (node == null || typeof node !== 'object') return;

  if (Array.isArray(node)) {
    for (let i = 0; i < node.length; i++) {
      if (typeof node[i] === 'string') node[i] = cleanString(node[i]);
      else walk(node[i]);
    }
    return;
  }

  if (typeof node.text === 'string') {
    node.text = cleanString(node.text);
  } else if (node.text != null) {
    walk(node.text);
  }

  for (const key of Object.keys(node)) {
    if (key === 'text') continue;
    walk(node[key]);
  }
}

// Entry point: convert missing symbols to ASCII and strip emoji from the content
// tree. Synchronous, no network, no fonts. Mutates the tree in place.
export function applyEmojiFont(content: Node): void {
  converted = 0;
  stripped = 0;
  walk(content);
  log('text sanitised', { symbolsConverted: converted, emojiStripped: stripped });
}
