# Minamo PR #99 — Visual Lab V141: cross-subject Home discovery and stable Note tables

Date: 11 November 2026  
Status: **owner-private Visual Lab deployed; production unchanged; PR draft/unmerged**  
Lab version: **V141** — `appgprj_6aeba0aa528c81918be19dd51427b2cb~appgver_16654e3fdebc8191a6f12cae47e0f73e`  
Deployment: `appgdep_6af43c9395308191805feca334c35660` — **succeeded; MCP enabled**  
Exact deployed private source: `f98f06f529a9739719b03960809ad5fa86689dbd`  
Site: https://minamo-visual-lab.jscymru.chatgpt.site/

## Owner decision and scope

**Finish the Lab experience and PR #99's substantive scope before public-source reconciliation or production integration.** Source parity is a later gate that remains open; it must not block continued Lab work. Do not merge PR #99 or change production V149.

**Substantial synthetic Lab authoring is explicitly permitted and encouraged where it makes acceptance more convincing.** Agents may create and revise independent Notes and Questions, Projects with long histories, Library sources, annotations, flags, linked work, media and activity as needed. Do not impose an artificial cap on fixture complexity. Keep provenance explicit: constructed examples, GPT-written reasoning, owner/learner writing, external sources and measurements are distinct. Never present a proposed protocol as a conducted experiment or constructed history as learner achievement. Lab examples must not mandate Work threads, checkpoints, progress dashboards, Activity/Attempt flows or conversation handoffs.

This document supersedes specific V140 gaps where resolved, but does not replace the earlier reports.

## Problem selection

Fresh-conversation, cross-domain acceptance in V138–V140 established a credible save/retrieve/continue path across creative, scientific, Japanese and computing material. Three related experience gaps remained:

1. **Discovery did not adequately bridge a local, scoped Home visit history with the owner's other currently eligible Projects.** A recent visit was merely device-local metadata and could be stale, trashed or out of scope; it must never confer permission or supply canonical content.
2. **A standalone Question could exist without a Project but lacked an equivalent calm Home shelf.** This made the independence of investigative work technically true but practically obscure.
3. **An independent Note's methodological A/B/C comparison table displayed as literal pipes.** That made the Note harder to read even though source bytes, exact revisions and citations were correct.

These are domain-independent weaknesses: they affect scientific methods, creative alternatives, language examples and computing comparisons alike.

## V141 implementation

### 1. Subject-aware Home and safe recent visits

- Home queries Projects, Library Articles, Notes and standalone Questions, with a dedicated **Independent questions** shelf and a direct route to all Questions.
- The question shelf calls out that **no Project is required**; this is an affordance rather than a compulsory hierarchy.
- Home retains favourites and existing shelves, and displays useful links to **All subjects** when the current scope is empty.
- The recent-Project/Article visit projection is limited to eight device-local IDs, then **revalidated against canonical `/api/context`** before being surfaced. Current eligible server records determine title, revision, learning space and rights; no local title/body/permission is trusted. Disappeared, trashed and wrong-scope entries are omitted.
- The scope remains an organisational filter, not an authority grant. A visitor's old local history cannot resurrect inaccessible records.
- Responsive three-column layout reduces to two and one columns at narrower widths without dropping existing content.

### 2. A readable Note comparison without changing its evidence identity

- Bounded Markdown tables (2–12 columns; at most 80 data rows) render as semantic `<table>` with headers, safely scrollable width and ordinary inline emphasis/links.
- The display parser deliberately retains **the exact V140 canonical text projection** for the Note, including pipes and separator row, so existing annotation UTF-16 coordinates and saved renditions still target the same text. Rendered cell runs are mapped back to canonical positions.
- HTML remains inert and existing safe-link restrictions still apply. Unsupported table syntax degrades to plain text. Source-edit workflows remain available.
- This is a **display improvement**, not a migration or rewrite of retained Note source. It does not claim a full Markdown/GFM authoring engine.

### 3. Owner-authorised independent Question

Created a Project-free GPT-authored synthetic Question: `investigation:lab-question-framing-evidence-20261111`, r1; exact rendition `r-2567ef2bc730c35bc0d533a4c300347c8d8d8f371cd7587c210493cdb0ae8ebf`.

It poses a genuine *unanswered* creative-methods question: whether stronger frame-edge contrast directs attention to a portrait face or distracts from it. It distinguishes three competing explanations and specifies how an unperformed A/B/C comparison could separate them. It explicitly says **no photographs, viewers, measurements or outcomes exist**. No Project link is created. This is useful Lab data, not a fabricated learner record.

## Verification: code, live browser and MCP

**Focused tests: 19/19 passed.** `tests/home-visits.test.mjs`, `tests/notes-writing.test.mjs`, `tests/note-video.test.mjs`; typecheck and production build passed. Diff check and private source worktree clean. The full obsolete/legacy suite was intentionally not run.

Tests exercise eligible/trash/scope/latest-revision Home projection, table geometry and bounded syntax, escaped pipes, links and emphasis, code-fence escape, XSS inertness, server render, and exact canonical-offset stability.

**Live Cloud Browser, V141:**

1. Reloaded the existing independent framing Note r5; its Version / Designed change / Plausible competing interpretations comparison was exposed as a **semantic accessible table**, where V140 had displayed a pipe-delimited block.
2. Saved editions and exact citations to the synthetic Article r2 and creative Project r4 remained present.
3. In **Other**, Home displayed the visual-composition and Cherwell Projects, Library sources, recent Notes and the new standalone Question.
4. Clicked the standalone Question from Home. Its own Question workspace opened, showed the full proposed protocol and explicit **TEST ONLY / synthetic** warning, and offered linked-work navigation despite having none; no Project was required.
5. Switched to **All** using the scope control. Home displayed recent **Radio Island** and **Japanese Live** Projects alongside the creative material, plus cross-subject Library and Notes, and retained favourites. The owner-facing all-subject Home tab was left open.

These are observed behaviours, not a claim of broad mobile or full-permission acceptance.

**Installed Visual Lab MCP, independent readback:**

- `read_minamo_record` returned the new Question's exact r1 body, `actor:gpt`, `synthetic:true`, empty links and exact rendition.
- `read_minamo_record_changes` returned five dated GPT-authored synthetic revisions of independent Note `lab-independent-framing-note-20261111`, with literal bounded change excerpts and exact destinations. r1–r3 elaborated competing explanations and a **not-conducted** protocol; r4 added Library Article r2; r5 added creative Project r4. **r4 and r5 share the same content rendition but are distinct saved revisions with different relationships.**
- `get_minamo_collaboration_preferences` returned global preference revision 4: balanced context, saved related material, requested initiative, balanced authoring detail and direct Project editing, with explicit limits that settings do not confer write or source rights.
- MCP requires a stated owner-requested `purpose`. A first call without it returned `request_scope_required`; retrying with explicit acceptance purposes succeeded. This is an intentional guard but an ergonomics edge for fresh GPT chats.

### Correction to V140 interpretation

The Japanese Note's apparent duplicated Project citation is **two different exact page pins**, one to the r10 dialogue section and another to the r10 grammar section. These target the same edition but **distinct anchor locations**. They should be grouped or labelled intelligibly, *not* mechanically deduplicated or deleted. The Note may still benefit from a more compact citation presentation.

## Critical PR #99 standing as of V141

| Ambition | Verified state | Limitation / next evidence |
| --- | --- | --- |
| Save and retrieve work without prior chat memory | Implemented and independently exercised via installed MCP and browser for multiple domains | Needs more blinded owner-style continuations and permission-denial edge cases |
| Preserve authentic revisions, citations and chronology | Strong for Projects and newer standalone Note/Article/Question histories; exact edition and actor/synthetic distinctions observed | Relationship-only revisions and same-rendition saves need consistently legible UI; deeper long-history acceptance |
| Project-independent work | Implemented: standalone Notes and Questions, direct Home/Your Work routes | Discovery still bounded, richer cross-links and relationships may require explicit authoring |
| Home, Projects, Library and Your Work coherence | Improved: scoped and All-subject browsing; recent visits revalidated; Questions now visible | First-page browse remains capped; large/old corpus discoverability and visual density need broader acceptance |
| Owner-controlled GPT collaboration | Revisioned global preferences retrievable; Project overrides/settings and context policy exist | Dynamic *tool exposure* is not implied; preferences mainly govern context depth, related records and authoring/editing policy; need negative/path testing |
| Cross-domain flexible Project patterns | Creative, scientific, Japanese, Radio Island and Python fixtures retained | More authentic usage and user review needed; some surfaces still feel separate |
| Checkpoint/Activity/Attempt removal | New Project authoring and current continuity are checkpoint-free | Legacy APIs/data/terminology and dependencies need an explicit targeted inventory before any retirement |
| MCP contracts, permissions and data integrity | Read revisions and change summaries, per-record provenance, scope gates and revision protection implemented in Lab | End-to-end permission revocation, large result pagination, repeat/partial-failure recovery and tool discoverability deserve acceptance |
| Visual simplicity | Home route and Note table materially improved; older edition navigation corrected in prior slice | Full mobile, drawing/media and uncluttered context review incomplete |
| Lab/production parity | Lab has substantial retained production functions and new PR #99 experimental work | Neither full feature parity nor source-byte parity has been verified |

### What we should not call done

- The Lab is **not** production-ready. The owner has not yet personally evaluated the complete PR #99 Lab experience.
- All connected-workspace relationships do not arise automatically. Meaningful links are saved explicitly by real authoring, page pins or confirmed relationships, and the UI still needs to reduce manual ceremony.
- Some material remains difficult to discover beyond the bounded Home page, especially in long histories or filtered scopes.
- Provenance labels do not turn a supplied article, synthetic scenario or self-report into empirical evidence.
- A retrieved change summary records *literal differences*; the reason for a change is only known when the saved text or metadata actually says so.
- V141's Markdown table visual parsing does not add structured table editing; subtle selection/annotation UX across hidden delimiters warrants further inspection.
- `WorkingContextHost` is present in source but not mounted as a universal shell; do not claim all surfaces are powered by one context presenter.
- Public PR #99 remains **documentation/architecture only relative to the deployed private Lab implementation**. No byte-for-byte reproducible source mirror has been made and none is claimed.

## Next coherent Lab-first phase — before owner review

1. **Deep multi-domain continuity and discovery:** work through long Japanese, Cherwell, visual composition and Radio Island histories as a new GPT. Exercise Question→Note→Library→Project relationships, older-edition targets, flags/annotations and missing-link diagnostics. Generate additional sizeable, clearly synthetic fixtures if needed.
2. **Make relationships effortless and legible:** compact distinct page pins, nearby context without noisy repetition, reciprocal navigation, and natural link suggestions arising from saved material. Preserve explicit intentional relationship evidence and no mandatory Project/Work thread.
3. **Owner-control and contract hardening:** settings/Project override changes with permissions, user-requested-only writes, historical/trashed/denied references, pagination, stale revisions, idempotency and clear error recovery. Examine whether the MCP context payload is complete enough without overloading GPT.
4. **Broader UX acceptance:** Home/Projects/Library/Your Work routes, empty-scope escape, mobile and desktop densities; drawing, image, executable and packaged-game parity, without privileging Python.
5. **Then owner personal evaluation** of the complete Lab changes relative to production V149. Only after the owner is satisfied should the team reconcile private deployment source with public PR branch, run migration/diff and integration checks, and decide whether/how to port into production. Source reconciliation remains a required *future* gate, not the current task.

This report records what was actually read, deployed, run and seen. It intentionally does not infer learner progress or pretend public source parity.
