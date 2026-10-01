# Wikidata item for MDTool

**Why:** Wikidata is the main knowledge-graph source for Google's Knowledge Graph, Bing and LLMs. A clean item with a **"different from"** link to MonoDevelop and SOLIDWORKS is the most direct fix for the "MDTool = MonoDevelop mdtool / SolidWorks MDTools" confusion. It also lets you add `sameAs: https://www.wikidata.org/wiki/Q…` to the Organization/WebApplication schema on mdtool.dev.

Checked 2026-10-01: no Wikidata item for "MDTool" exists (API search for `mdtool` returned nothing). All Q-IDs and P-IDs below were verified through the Wikidata API.

## ⚠️ Notability caveats (read first)

Wikidata accepts an item if it meets **one** of these (https://www.wikidata.org/wiki/Wikidata:Notability):
1. It has a sitelink to a Wikimedia page (Wikipedia, Commons and so on). MDTool has none.
2. It "refers to an instance of a clearly identifiable conceptual or material entity that can be described using **serious and publicly available references**." This is the only realistic route for MDTool.
3. It "fulfills a structural need" (for example, another item needs to link to it). Not applicable yet.

Today MDTool's only references are its own website and GitHub repo. **Self-published sources are weak**, and items about new tools whose references are all self-published do get nominated for deletion, especially if the item reads like promotion. To lower that risk:
- **Wait until you have at least 1-2 independent references** before creating the item. Good candidates: the Markdown Guide tool page (markdownguide.org/tools/mdtool, after the PR merges), an AlternativeTo or SaaSHub listing, Product Hunt, or a third-party article or review. Then add them as `reference URL` (P854) on statements.
- Keep everything factual and neutral; no marketing words in the label or description.
- Create the item from a Wikidata account with a few unrelated, genuine edits behind it. A brand-new account whose only edit creates its own product item looks like self-promotion.
- Don't create an item for yourself (Muhammad Usman) just to fill "developer". Use the pattern in step 5.
- If the item is nominated for deletion, reply on the Requests for deletions page with your independent references; don't recreate it.

## Step-by-step

1. Log in at https://www.wikidata.org and open **Special:NewItem**: https://www.wikidata.org/wiki/Special:NewItem
2. Fill in the English fields:
   - **Language:** `en`
   - **Label:** `MDTool`
   - **Description:** `web-based Markdown document converter` (lowercase, no period, no adjectives such as "free" or "best"; this follows Wikidata convention)
   - **Aliases:** `mdtool.dev` | `MDTool Markdown converter`
3. Click **Create**. You now have a Q-number. Write it down.
4. Add the Spanish label and description: on the item page, click "edit" in the "In more languages" box, or switch the interface language to Spanish:
   - **Label (es):** `MDTool`
   - **Description (es):** `conversor web de documentos Markdown`
   - **Aliases (es):** `mdtool.dev`
5. Add statements (**+ add statement**). Enter property → value → (optional qualifiers) → **publish**:

| Property | Value | Qualifiers / notes |
|----------|-------|--------------------|
| **instance of** (P31) | **web application** (Q189210) | |
| **instance of** (P31) | **online service** (Q19967801) | Optional second value |
| **instance of** (P31) | **file converter** (Q2996416) | Helps disambiguation (it's a converter, not an IDE tool) |
| **official website** (P856) | `https://www.mdtool.dev` | qualifier **language of work or name** (P407) = English (Q1860) |
| **source code repository URL** (P1324) | `https://github.com/usmankhan045/mdtool` | qualifiers: **version control system** (P8423) = Git (Q186055); **web interface software** (P10627) = GitHub (Q364) |
| **developer** (P178) | *unknown value* (click the ⚙ icon next to the value field → "unknown value") | qualifier **object named as** (P1932) = `Muhammad Usman`. This is the accepted pattern when the person has no item of their own. |
| **programmed in** (P277) | **TypeScript** (Q978185) | The repo's language per GitHub |
| **copyright license** (P275) | **TBD.** The repo has no LICENSE file as of 2026-10-01. **Leave this statement out until you add one.** If you choose MIT, the value is MIT License (Q334661). | Add the reference URL to the LICENSE file |
| **inception** (P571) | `2026-06` (set **precision = month**) | See the note below |
| **platform** (P400) | **web browser** (Q6368) | |
| **readable file format** (P1072) | Markdown (Q1193600); Office Open XML Wordprocessing Document (Q3033641); HTML (Q8811) | One statement per value |
| **writable file format** (P1073) | PDF (Q42332); Office Open XML Wordprocessing Document (Q3033641); HTML (Q8811); Markdown (Q1193600) | One statement per value |
| **language of work or name** (P407) | English (Q1860) | Interface language |
| **different from** (P1889) | **MonoDevelop** (Q764454) | **Key disambiguation statement.** MonoDevelop ships the `mdtool` CLI |
| **different from** (P1889) | **SOLIDWORKS** (Q751281) | For "SolidWorks MDTools" |
| **GitHub account** (P2037)? | **Don't add.** That property is for the project's own org or account, and `usmankhan045` is your personal account | |

6. **References.** On each main statement (P31, P856, P1324, P571), click "+ add reference" → **reference URL** (P854) → `https://www.mdtool.dev/about` (or the independent source once you have one) → **retrieved** (P813) = today's date.
7. On mdtool.dev, add the Wikidata URL to `sameAs` in the Organization/WebApplication JSON-LD (`components/seo/`). Also add `sameAs` links to the GitHub repo, Product Hunt and AlternativeTo once they exist.

**Inception note:** the first git commit is 2026-03-08 ("Initial DevMark launch"), and the product was renamed MDTool later. You asked for `2026-06`. That fits if June 2026 is when it launched publicly as MDTool on mdtool.dev (GSC submission was around late June 2026). If anyone challenges it, the safest sourced value is the one you can back with a public, dated reference.

## QuickStatements alternative (bulk, after the item exists)

Replace `Q_NEW` with your item ID. Tool: https://quickstatements.toolforge.org/ (log in with your Wikidata account). Version 1 syntax, tab-separated:

```
Q_NEW	Den	"web-based Markdown document converter"
Q_NEW	Des	"conversor web de documentos Markdown"
Q_NEW	Les	"MDTool"
Q_NEW	P31	Q189210
Q_NEW	P31	Q2996416
Q_NEW	P856	"https://www.mdtool.dev"
Q_NEW	P1324	"https://github.com/usmankhan045/mdtool"	P8423	Q186055	P10627	Q364
Q_NEW	P277	Q978185
Q_NEW	P571	+2026-06-00T00:00:00Z/10
Q_NEW	P400	Q6368
Q_NEW	P1072	Q1193600
Q_NEW	P1072	Q3033641
Q_NEW	P1072	Q8811
Q_NEW	P1073	Q42332
Q_NEW	P1073	Q3033641
Q_NEW	P1073	Q8811
Q_NEW	P1073	Q1193600
Q_NEW	P407	Q1860
Q_NEW	P1889	Q764454
Q_NEW	P1889	Q751281
```
(`/10` = month precision. Add the "developer = unknown value + object named as" statement by hand; it's easier in the UI. Add P275 only after the LICENSE exists.)
