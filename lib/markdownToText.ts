import { Marked, type Token, type Tokens } from 'marked';

export interface MarkdownToTextOptions {
  /** Prefix list items with "- " / "1. " (default true). */
  listMarkers?: boolean;
  /** Render links as "text (url)" instead of just "text" (default true). */
  linkUrls?: boolean;
  /** Join soft-wrapped lines inside a paragraph into one line (default false). */
  joinLines?: boolean;
}

// A private Marked instance so the global config in lib/markdown.ts (breaks: true,
// custom renderer) never leaks into the token stream we walk here.
const parser = new Marked({ gfm: true, breaks: false });

// All 252 HTML 4 named entities (case-sensitive: &Eacute; is É, &eacute; is é),
// plus &apos; and &check;. Generated from Python's html.entities.
const NAMED_ENTITIES: Record<string, string> = {
  AElig:"Æ", Aacute:"Á", Acirc:"Â", Agrave:"À", Alpha:"Α", Aring:"Å", Atilde:"Ã", Auml:"Ä", Beta:"Β",
  Ccedil:"Ç", Chi:"Χ", Dagger:"‡", Delta:"Δ", ETH:"Ð", Eacute:"É", Ecirc:"Ê", Egrave:"È", Epsilon:"Ε",
  Eta:"Η", Euml:"Ë", Gamma:"Γ", Iacute:"Í", Icirc:"Î", Igrave:"Ì", Iota:"Ι", Iuml:"Ï", Kappa:"Κ", Lambda:"Λ",
  Mu:"Μ", Ntilde:"Ñ", Nu:"Ν", OElig:"Œ", Oacute:"Ó", Ocirc:"Ô", Ograve:"Ò", Omega:"Ω", Omicron:"Ο",
  Oslash:"Ø", Otilde:"Õ", Ouml:"Ö", Phi:"Φ", Pi:"Π", Prime:"″", Psi:"Ψ", Rho:"Ρ", Scaron:"Š", Sigma:"Σ",
  THORN:"Þ", Tau:"Τ", Theta:"Θ", Uacute:"Ú", Ucirc:"Û", Ugrave:"Ù", Upsilon:"Υ", Uuml:"Ü", Xi:"Ξ",
  Yacute:"Ý", Yuml:"Ÿ", Zeta:"Ζ", aacute:"á", acirc:"â", acute:"´", aelig:"æ", agrave:"à", alefsym:"ℵ",
  alpha:"α", amp:"&", and:"∧", ang:"∠", aring:"å", asymp:"≈", atilde:"ã", auml:"ä", bdquo:"„", beta:"β",
  brvbar:"¦", bull:"•", cap:"∩", ccedil:"ç", cedil:"¸", cent:"¢", chi:"χ", circ:"ˆ", clubs:"♣", cong:"≅",
  copy:"©", crarr:"↵", cup:"∪", curren:"¤", dArr:"⇓", dagger:"†", darr:"↓", deg:"°", delta:"δ", diams:"♦",
  divide:"÷", eacute:"é", ecirc:"ê", egrave:"è", empty:"∅", emsp:" ", ensp:" ", epsilon:"ε", equiv:"≡",
  eta:"η", eth:"ð", euml:"ë", euro:"€", exist:"∃", fnof:"ƒ", forall:"∀", frac12:"½", frac14:"¼", frac34:"¾",
  frasl:"⁄", gamma:"γ", ge:"≥", gt:">", hArr:"⇔", harr:"↔", hearts:"♥", hellip:"…", iacute:"í", icirc:"î",
  iexcl:"¡", igrave:"ì", image:"ℑ", infin:"∞", int:"∫", iota:"ι", iquest:"¿", isin:"∈", iuml:"ï", kappa:"κ",
  lArr:"⇐", lambda:"λ", lang:"〈", laquo:"«", larr:"←", lceil:"⌈", ldquo:"“", le:"≤", lfloor:"⌊", lowast:"∗",
  loz:"◊", lrm:"‎", lsaquo:"‹", lsquo:"‘", lt:"<", macr:"¯", mdash:"—", micro:"µ", middot:"·", minus:"−",
  mu:"μ", nabla:"∇", nbsp:" ", ndash:"–", ne:"≠", ni:"∋", not:"¬", notin:"∉", nsub:"⊄", ntilde:"ñ", nu:"ν",
  oacute:"ó", ocirc:"ô", oelig:"œ", ograve:"ò", oline:"‾", omega:"ω", omicron:"ο", oplus:"⊕", or:"∨",
  ordf:"ª", ordm:"º", oslash:"ø", otilde:"õ", otimes:"⊗", ouml:"ö", para:"¶", part:"∂", permil:"‰", perp:"⊥",
  phi:"φ", pi:"π", piv:"ϖ", plusmn:"±", pound:"£", prime:"′", prod:"∏", prop:"∝", psi:"ψ", quot:"\"",
  rArr:"⇒", radic:"√", rang:"〉", raquo:"»", rarr:"→", rceil:"⌉", rdquo:"”", real:"ℜ", reg:"®", rfloor:"⌋",
  rho:"ρ", rlm:"‏", rsaquo:"›", rsquo:"’", sbquo:"‚", scaron:"š", sdot:"⋅", sect:"§", shy:"­", sigma:"σ",
  sigmaf:"ς", sim:"∼", spades:"♠", sub:"⊂", sube:"⊆", sum:"∑", sup:"⊃", sup1:"¹", sup2:"²", sup3:"³",
  supe:"⊇", szlig:"ß", tau:"τ", there4:"∴", theta:"θ", thetasym:"ϑ", thinsp:" ", thorn:"þ", tilde:"˜",
  times:"×", trade:"™", uArr:"⇑", uacute:"ú", uarr:"↑", ucirc:"û", ugrave:"ù", uml:"¨", upsih:"ϒ",
  upsilon:"υ", uuml:"ü", weierp:"℘", xi:"ξ", yacute:"ý", yen:"¥", yuml:"ÿ", zeta:"ζ", zwj:"‍", zwnj:"‌",
  apos:"'", check:"✓",
};

/** Decode HTML entities without touching the DOM (works on server and client). */
export function decodeEntities(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]*);/gi, (match, body: string) => {
    if (body[0] === '#') {
      const code = body[1] === 'x' || body[1] === 'X' ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10);
      if (!Number.isFinite(code) || code < 0 || code > 0x10ffff) return match;
      try {
        return String.fromCodePoint(code);
      } catch {
        return match;
      }
    }
    // Exact case first (&Eacute; vs &eacute;), then lowercase for shouty forms like &COPY;.
    const named = NAMED_ENTITIES[body] ?? NAMED_ENTITIES[body.toLowerCase()];
    return named ?? match;
  });
}

/** Remove HTML tags (and script/style/comment content), turning <br> and block closers into newlines. */
export function stripHtml(html: string): string {
  return decodeEntities(
    html
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(p|div|li|h[1-6]|tr|blockquote|pre|section|article)\s*>/gi, '\n')
      .replace(/<\/?[a-z][^>]*>/gi, ''),
  )
    .split('\n')
    .map((line) => line.trim())
    .join('\n');
}

function inlineText(tokens: Token[] | undefined, opts: Required<MarkdownToTextOptions>): string {
  if (!tokens) return '';
  let out = '';
  let dropLeadingSpace = false;
  for (const token of tokens) {
    // Only the token immediately after a vanished tag loses its leading space.
    const trimLeading = dropLeadingSpace;
    dropLeadingSpace = false;
    switch (token.type) {
      case 'text': {
        const t = token as Tokens.Text;
        let value = t.tokens ? inlineText(t.tokens, opts) : decodeEntities(t.text);
        if (trimLeading) value = value.replace(/^[ \t]+/, '');
        out += opts.joinLines ? value.replace(/[ \t]*\n[ \t]*/g, ' ') : value;
        break;
      }
      case 'escape':
        out += (token as Tokens.Escape).text;
        break;
      case 'strong':
      case 'em':
      case 'del':
        out += inlineText((token as Tokens.Strong).tokens, opts);
        break;
      case 'codespan':
        // Code spans are literal in Markdown: "&amp;" inside backticks stays "&amp;".
        out += (token as Tokens.Codespan).text;
        break;
      case 'br':
        out += '\n';
        break;
      case 'link': {
        const link = token as Tokens.Link;
        const label = inlineText(link.tokens, opts).trim();
        const href = link.href.replace(/^mailto:/i, '');
        if (!opts.linkUrls || !href || href === label || href.startsWith('#')) {
          out += label || href;
        } else {
          out += label ? `${label} (${link.href})` : link.href;
        }
        break;
      }
      case 'image':
        out += decodeEntities((token as Tokens.Image).text);
        break;
      case 'html': {
        const stripped = stripHtml((token as Tokens.HTML).text);
        // A tag that vanishes entirely (e.g. an inline <!-- comment -->) would leave
        // the spaces on both sides, so drop the one that follows it.
        if (!stripped && out.endsWith(' ')) dropLeadingSpace = true;
        out += stripped;
        break;
      }
      default: {
        const generic = token as { tokens?: Token[]; text?: string };
        out += generic.tokens ? inlineText(generic.tokens, opts) : decodeEntities(generic.text ?? '');
      }
    }
  }
  return out;
}

function indent(text: string, spaces: number): string {
  const pad = ' '.repeat(spaces);
  return text
    .split('\n')
    .map((line) => (line ? pad + line : line))
    .join('\n');
}

function renderList(list: Tokens.List, opts: Required<MarkdownToTextOptions>): string {
  const start = typeof list.start === 'number' ? list.start : 1;
  return list.items
    .map((item, i) => {
      const marker = opts.listMarkers ? (list.ordered ? `${start + i}. ` : '- ') : '';
      const task = item.task ? (item.checked ? '[x] ' : '[ ] ') : '';
      // Each child block on its own line; nested lists are indented under the item.
      const parts = item.tokens
        .filter((child) => child.type !== 'checkbox' && child.type !== 'space')
        .map((child) => {
          if (child.type === 'list') return indent(renderList(child as Tokens.List, opts), 2);
          return renderBlock(child, opts);
        })
        .filter((part) => part.trim() !== '');
      const [first = '', ...rest] = parts;
      const firstLine = marker + task + first.replace(/^\[[ xX]\] /, '');
      const continuation = rest.map((part) => (part.startsWith('  ') ? part : indent(part, marker ? marker.length : 0)));
      return [firstLine, ...continuation].join('\n');
    })
    .join('\n');
}

function renderBlock(token: Token, opts: Required<MarkdownToTextOptions>): string {
  switch (token.type) {
    case 'space':
    case 'hr':
    case 'def':
      return '';
    case 'heading':
    case 'paragraph':
      return inlineText((token as Tokens.Paragraph).tokens, opts);
    case 'text': {
      const t = token as Tokens.Text;
      return t.tokens ? inlineText(t.tokens, opts) : decodeEntities(t.text);
    }
    case 'code':
      return (token as Tokens.Code).text;
    case 'blockquote':
      return renderBlocks((token as Tokens.Blockquote).tokens, opts);
    case 'list':
      return renderList(token as Tokens.List, opts);
    case 'table': {
      const table = token as Tokens.Table;
      const row = (cells: Tokens.TableCell[]) => cells.map((cell) => inlineText(cell.tokens, opts).replace(/\s*\n\s*/g, ' ').trim()).join('\t');
      return [row(table.header), ...table.rows.map(row)].join('\n');
    }
    case 'html':
      return stripHtml((token as Tokens.HTML).text).trim();
    default: {
      const generic = token as { tokens?: Token[]; text?: string };
      return generic.tokens ? inlineText(generic.tokens, opts) : decodeEntities(generic.text ?? '');
    }
  }
}

function renderBlocks(tokens: Token[], opts: Required<MarkdownToTextOptions>): string {
  return tokens
    .map((token) => renderBlock(token, opts))
    .filter((block) => block.trim() !== '')
    .join('\n\n');
}

/**
 * GFM footnotes ("text[^1]" + "[^1]: note") aren't parsed by marked, so they would
 * leave raw "[^1]" markers. Rewrite them to plain "[1]" references and "[1] note"
 * lines. Fenced code blocks are left untouched.
 */
function plainFootnotes(source: string): string {
  return source
    .split(/(^(?:```|~~~)[^\n]*\n[\s\S]*?^(?:```|~~~)[ \t]*$)/m)
    .map((part, i) =>
      i % 2 === 1
        ? part
        : part
            .replace(/^\[\^([^\]\s]+)\]:[ \t]*/gm, '[$1] ')
            .replace(/\[\^([^\]\s]+)\]/g, '[$1]')
    )
    .join('');
}

/**
 * Convert Markdown to clean plain text: formatting markers removed, paragraph breaks kept,
 * lists as "- " / "1. " lines, links as "text (url)", images as alt text, code without
 * fences, tables as tab-separated rows, HTML tags stripped and entities decoded.
 */
export function markdownToText(markdown: string, options: MarkdownToTextOptions = {}): string {
  const opts: Required<MarkdownToTextOptions> = {
    listMarkers: options.listMarkers ?? true,
    linkUrls: options.linkUrls ?? true,
    joinLines: options.joinLines ?? false,
  };

  // Drop YAML front matter, which is metadata rather than readable text.
  const source = plainFootnotes(
    markdown.replace(/\r\n?/g, '\n').replace(/^---\n[\s\S]*?\n(---|\.\.\.)\n/, '')
  );
  const tokens = parser.lexer(source);

  return renderBlocks(tokens, opts)
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
