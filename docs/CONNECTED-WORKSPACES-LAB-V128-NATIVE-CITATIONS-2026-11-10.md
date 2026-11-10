# Minamo Visual Lab V128 — Native cross-domain citations (10 November 2026)

## Scope and deployed identity

- Existing owner-isolated Visual Lab Site: `appgprj_6aeba0aa528c81918be19dd51427b2cb`; https://minamo-visual-lab.jscymru.chatgpt.site/
- Deployed Visual Lab **V128**; deployment `appgdep_6af3979751fc8191812d3ec5bd62475f`; source commit `d5e4f073236b9eac8ab17d27bc4ed7775cc7caed`; status **succeeded**.
- Production **V149 unchanged**. PR #99 remains unmerged/draft.
- No MCP input/tool definitions changed; no connector reinstall requested.
- Site source is the separate private Site Git repository. The public PR source is **not yet a complete mirror** of this Lab build; do not imply otherwise.

## Problem

Existing working-context reads followed explicit `record.links`, Project-composition block references and Note page pins. But canonical reading content can itself contain explicit references: a diagram node or connection can cite an exact Article, and an excerpt cites an admitted Source edition. A Project could show these to a human while GPT's `get_minamo_working_context` and its Connections panel failed to show the linked original. Requiring a second, manually maintained `record.links` was unnecessarily fragile and especially ill-suited to research and creative Projects.

## V128 implementation

1. `lib/atlas/project.ts`: `atlasRecordLinks` now projects authored diagram node/edge citations and exact Source excerpt references from canonical sections. They reuse the existing identity deduplication and owner/edition-rights admission paths. It does **not** infer relationships from diagram topology, title similarity, cited prose, or arbitrary external URLs.
2. `lib/working-context-read.ts`: admitted relation receipts include the independently checked source title and preserve explicit citation provenance. The API/MCP still distinguishes current and retained editions, reports newer editions separately, and never promotes a diagram assertion to verified evidence.
3. `app/project-connections.tsx` and `app/working-context.tsx`: human-facing links now show the admitted source's title even when that record was not present in the bounded local workspace list.
4. Integration coverage in `tests/working-context-read.test.mjs`: same-target diagram references deduplicate; same-title unrelated Article is excluded; exact older Article citation remains pinned after its revision; newer Article is separately admitted; revoked Source excerpts disappear from the relationship read; foreign owner selection is unavailable; reads write no operations.

No new activity, checkpoint, Work thread, relationship table or per-user tracking was introduced.

## Focused verification

- `node --test tests/working-context-read.test.mjs tests/project-connections.test.mjs`: **10 passed, 0 failed**.
- `pnpm typecheck`: passed.
- `pnpm build`: passed, with existing Piper browser-externalisation and chunk warnings.
- `git diff --check`: passed.
- The entire historical regression suite was **not run**.

### Actual installed Lab MCP acceptance

The existing explicitly synthetic Project `lab-visual-composition-questions-20261110` was extended from **r3 to r4** using `apply_minamo_command` and an exact targeted native diagram edit. It now cites a newly authored synthetic Library Article `ms-5fc60f7facbe98b2b440b27f2dbd4d436bd54965` titled **Framing and attention: comparing visual alternatives**, created through the actual `publish_minamo_manuscript` connector with an immutable source edition and five substantial sections. The Library explanation distinguishes hypothetical A/B/C composition variants from actual photographs or viewer observations. Neither is claimed as learner-authored or external empirical evidence.

An initial direct Article creation correctly met the editorial guard requiring manuscript publication. After checking Library coverage and editorial guidance, the manuscript route succeeded, returning two *advisory* editorial warnings (the coverage query was not bound in `existing`, and no external further-reading URL was included). These are recorded, not silently described as passing editorial quality.

The installed `get_minamo_working_context` on Project r4 returned one exact Article relation for two node/edge citations, source title, `quality:'exact-edition'`, the exact pinned rendition, and an authored-diagram-provenance explanation. `read_minamo_record` separately returned the Article r1 with its synthetic marking and five retained sections.

### Cloud Browser acceptance

On V128, the creative Project r4's collapsed Connections panel expanded to show:
- **Saved links → Article → Framing and attention: comparing visual alternatives**
- Citation origin: the *Foreground edge* diagram node in *Alternative arrangements*, without claiming that the diagram hypothesis is true.

The exact Article link opened the five-section Library reading, including its native comparison table. **Back to Project** returned to the pinned Project edition and section. The three Project tabs, original alternatives table and diagram remained intact. The connection card was legible within the charcoal/cyan direction, but its open panel consumes notable vertical space. The diagram itself has no obvious inline citation indicator; finding the linked original requires opening Connections. This is a useful next UX improvement, not an acceptance failure for the underlying read.

## Limitations and next work

- This slice proves *outgoing, explicitly authored, exact native citations*. It does not automatically interpret semantic relevance, validate an empirical conclusion, or discover every **inbound** Library/Note link. Notes with saved page pins are covered by a different focused evidence path; general article/section inbound discovery remains incomplete.
- A manually authored description may still be stale after a substantial source revision; the read preserves exact pinned versions and offers newer editions, but does not rewrite interpretations.
- Synthetic cross-domain acceptance is **not a genuine fresh-conversation user study**. It proves a deterministic connector/read/UI path.
- Both source provenance and relation reasons could be made more compact and discoverable directly at the cited diagram part.
- Public PR source parity with the deployed private Lab build remains a separately documented pre-migration requirement.

**Next recommended bounded slice:** source-grounded inbound relationships for Project/Note/Library, with a bounded rights-checked read and explicit direction; preserve original/exact source revisions and never convert merely lexical candidates into accepted links.
