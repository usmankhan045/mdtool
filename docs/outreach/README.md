# MDTool authority and backlink outreach kit

Prepared 2026-10-01 for https://www.mdtool.dev. Nothing in this folder has been submitted, posted or opened as a PR. The owner does every step.

## Where things stand

- Referring domains: 3 (filterhn.com, startup-list.org, parkscomputing.com).
- Show HN #48906238 (2026-07-14): 3 points, no discussion.
- github.com/usmankhan045/mdtool: 0 stars, no description, no topics, **no LICENSE file**, and a stray file named `B` in the repo root.
- Bing ranks MDTool on page 1 (positions 6-9) for "markdown cheat sheet with examples" and "markdown to word". Copilot cited it 58K times in 3 months. Google ranks it at 50-80 because the site has little authority.
- Strongest proof point: Markdown → Word that outputs real Heading 1-6 styles, so the Word Navigation pane and the automatic table of contents work.
- Entity confusion: AI tools mix up "MDTool" with MonoDevelop's `mdtool` CLI and with SolidWorks MDTools.

## Do these first (they unblock most targets below)

- [ ] **Add a LICENSE to the repo** (MIT is the usual choice; the decision is yours). Several lists require one: BubuAnabelas lists "Lacks license" as a reason to delete an entry, awesome-docs requires a "thoroughly documented" project, and OpenAlternative accepts only open-source projects. Until a license exists, write "TBD" for the license field in Wikidata.
- [ ] Delete the stray `B` file from the repo root.
- [ ] Apply `github-repo.md`: description, homepage, 15 topics, and the README hero with the disambiguation line.
- [ ] Create the AlternativeTo account **today**. New accounts must be 7 days old before they can submit an app.
- [ ] Set up free keyword alerts (for example F5Bot at f5bot.com) for "markdown to word", "markdown to pdf", "docx to markdown" and "md to docx". Fresh Reddit and HN threads are worth far more than archived ones.

## Prioritized checklist (ordered by value ÷ effort)

Link type: **dofollow (verified)** means I checked the live HTML. "reported" means third-party submission guides say so; check with your browser's inspector after the listing goes live. GitHub always adds `rel="nofollow"` to links in READMEs, but awesome-list entries still pay off: they get mirrored by sites such as trackawesomelist and LibHunt, LLMs train on them, and maintainers and writers read them.

| # | Target | URL | Link type | Effort | Expected value | Kit file | Status |
|---|--------|-----|-----------|--------|----------------|----------|--------|
| 1 | Markdown Guide tool directory (PR adding `_tools/mdtool.md`) | https://github.com/mattcone/markdown-guide → https://www.markdownguide.org/tools/ | **dofollow (verified)** | S (1 file + 2 images) | **Very high.** This is the top authority for "markdown cheat sheet", which is your best Bing query. Active: the tinyMD PR was merged 2026-04-11 | `awesome-lists.md` §1 | [ ] |
| 2 | GitHub repo polish (description, topics, LICENSE, hero) | https://github.com/usmankhan045/mdtool | n/a (entity + trust) | S | High. Unblocks #3-#8 and #20. GitHub is the #2 result for the "mdtool" brand query | `github-repo.md` | [ ] |
| 3 | mundimark/awesome-markdown-editors → "Markdown Online Editors" | https://github.com/mundimark/awesome-markdown-editors | nofollow (GitHub) | S | High. 2.3K stars, merged PRs in Jul-Aug 2026, and a direct precedent (MD2PDF.cc is listed) | `awesome-lists.md` §2 | [ ] |
| 4 | mundimark/awesome-markdown → "Markdown to PDF" | https://github.com/mundimark/awesome-markdown | nofollow (GitHub) | S | High. 1.9K stars, PR merged 2026-09-29 | `awesome-lists.md` §3 | [ ] |
| 5 | testthedocs/awesome-docs → "Tool Collection" | https://github.com/testthedocs/awesome-docs | nofollow (GitHub) | S | Medium-high. Docs-as-code audience; 5 PRs merged 2026-09-25 | `awesome-lists.md` §4 | [ ] |
| 6 | BolajiAyodeji/awesome-technical-writing → "Useful Tools" | https://github.com/BolajiAyodeji/awesome-technical-writing | nofollow (GitHub) | S | Medium-high. 2.3K stars, technical writers are the core Markdown → Word persona, and browser tools are accepted | `awesome-lists.md` §5 | [ ] |
| 7 | AlternativeTo (alternative to Pandoc, Dillinger, CloudConvert, Typora) | https://alternativeto.net/manage/new/ | reported nofollow | M (7-day account wait, review takes days to 1 week) | High. Ranks for "X alternative" queries and LLMs cite it heavily | `directories.md` §1 | [ ] |
| 8 | SaaSHub | https://www.saashub.com/services/submit | nofollow unless you add their badge (check) | S | Medium-high. Has existing Pandoc, Dillinger, CloudConvert, Typora and StackEdit pages to attach to | `directories.md` §2 | [ ] |
| 9 | Product Hunt launch | https://www.producthunt.com/launch | nofollow (redirect) | L (2 weeks of prep) | High for brand and entity signals, plus a long tail of scraped copies | `product-hunt.md` | [ ] |
| 10 | Show HN v2 (Word headings + Mermaid PDF angle) | https://news.ycombinator.com/submit | nofollow | M | High if it reaches the front page; developers and bloggers link from there | `show-hn-v2.md` | [ ] |
| 11 | dev.to cross-posts ×3 with `canonical_url` | https://dev.to/new | link from body, canonical back to you | M per post | Medium-high. dev.to posts rank well in Google and pass the canonical | `devto-crosspost.md` | [ ] |
| 12 | Hashnode cross-posts ×3 ("Original article URL") | https://hashnode.com | canonical | S after dev.to | Medium | `devto-crosspost.md` | [ ] |
| 13 | Peerlist Launchpad (opens Mondays, free) | https://peerlist.io/launchpad | profile link | S | Medium. 230K builders, random order on Mon-Tue | `directories.md` §8 | [ ] |
| 14 | Uneed (free waiting line) | https://www.uneed.best/submit-a-tool | dofollow (reported) **if** you reach the launch-day upvote threshold | S | Medium | `directories.md` §5 | [ ] |
| 15 | DevHunt (weekly, GitHub login) | https://devhunt.org | reported dofollow | S | Medium. Developer audience | `directories.md` §6 | [ ] |
| 16 | Fazier (free Basic tier) | https://fazier.com/submit | dofollow (reported, DR ~83) | S, but the free tier requires a Fazier link in your footer | Medium | `directories.md` §9 | [ ] |
| 17 | MicroLaunch | https://microlaunch.net | dofollow (reported) | S | Low-medium | `directories.md` §10 | [ ] |
| 18 | Reddit and community replies (disclosed) | see file | nofollow | M (ongoing) | Medium for traffic plus LLM citations (Reddit is heavily cited by Copilot and Perplexity) | `reddit-and-communities.md` | [ ] |
| 19 | YouTube screencast (2 min) | https://studio.youtube.com | nofollow, but a strong entity and AI-citation signal | M | Medium. Google shows video results for "markdown to word" | `youtube.md` | [ ] |
| 20 | Wikidata item | https://www.wikidata.org/wiki/Special:NewItem | nofollow (entity signal) | M | Medium for disambiguation; **deletion risk until press or independent coverage exists** | `wikidata.md` | [ ] |
| 21 | Slant ("I Recommend" on existing Markdown topics) | https://www.slant.co | nofollow | S | Low-medium | `directories.md` §3 | [ ] |
| 22 | OpenAlternative (**only after the LICENSE is added**) | https://openalternative.co/submit | reported dofollow | S | Medium (open-source alternative to CloudConvert and Typora export) | `directories.md` §11 | [ ] |
| 23 | BubuAnabelas/awesome-markdown → "Converters" | https://github.com/BubuAnabelas/awesome-markdown | nofollow (GitHub) | S | **Low probability.** Last merge 2023-05 and 72 open PRs. Still worth a 5-minute PR because the list has 959 stars | `awesome-lists.md` §6 | [ ] |
| 24 | devtoolsd/awesome-devtools → "Docs & Knowledge" | https://github.com/devtoolsd/awesome-devtools | nofollow (GitHub) | S | **Low probability.** Last merge 2025-10 and 100+ open PRs | `awesome-lists.md` §7 | [ ] |

## Targets checked and rejected (for now)

| Target | Why |
|--------|-----|
| There's An AI For That | Lists only AI tools, GPTs and AI influencers, and charges a submission fee. MDTool is not an AI product, so a listing would misrepresent it. |
| Toolify.ai | AI-tool directory. Third-party guides dated Aug 2026 report a $99 one-time fee with no reliable free path. Not a fit. |
| free-for.dev | Covers free tiers of as-a-Service offerings for **infrastructure developers** (sysadmins, DevOps). The maintainer says it is "opinionated" and off-topic entries get rejected. MDTool is a weak fit. A draft for "Other Free Resources" is in `directories.md` §4 in case you want to try, but it is low priority. |
| matiassingers/awesome-readme (Tools) | CONTRIBUTING.md requires that tools have "established demand (i.e. a significant number of users, stars, etc)" and are "not new". Revisit once the repo has about 100+ stars. A draft is kept in `awesome-lists.md` §8. |
| r/selfhosted | Sub rules require self-hostable software. MDTool has no license and no self-host instructions (Docker or `npm run build && npm start`). A draft is kept but marked conditional. |

## Content gaps found while preparing this kit (fix before outreach that depends on them)

1. The three posts named for cross-posting (`markdown-to-google-docs`, `markdown-to-pdf-python-pandoc`, `markdown-in-vscode`) **do not exist yet**: they return 404 on mdtool.dev and are not in `content/blog/`. Publish them on mdtool.dev first. `devto-crosspost.md` assumes those slugs.
2. There is **no Markdown → plain text tool** live (`/markdown-to-text` returns 404). All copy in this kit leaves plain text out. Add it back once the page ships.
3. No custom PDF margins and no Markdown footnotes (marked runs with `gfm: true` and no footnote extension). The reply drafts avoid claiming either.

## Top 5 actions by value

1. Fix the repo (LICENSE, description, topics, remove `B`, README hero). About 30 minutes, and it unblocks most other rows.
2. Open the PR for the Markdown Guide `_tools/mdtool.md` page. It is the only verified dofollow link here, and it comes from the top authority for "markdown cheat sheet".
3. Open the four active awesome-list PRs (mundimark ×2, awesome-docs, awesome-technical-writing) in one sitting.
4. Create the AlternativeTo account now, then submit on day 8 together with SaaSHub.
5. Record the 2-minute YouTube video, then launch on Product Hunt and post Show HN v2 in different weeks, both using the video and its GIFs.
