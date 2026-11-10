# Connected Workspaces — Visual Lab V107 inbound Note pins and Project continuity (10 Nov 2026)

**Scope:** Independent owner-private Visual Lab only. Production V149 unchanged. PR #99 remains unmerged. This follows the [V106 first-read context acceptance](CONNECTED-WORKSPACES-LAB-V106-ACCEPTANCE-2026-11-10.md).

## Discovered defect: a saved relationship omitted from continuity

The general Project/reference graph (`lib/atlas/project.ts`) already regarded a Note's explicit `pagePins` as owner-saved reference evidence. The `lib/continuity-evidence.ts` read path used by `get_minamo_working_context`, Project Connections and Your Work collected only `record.links`, `anchor` and `flagTarget`. Thus a Note whose only relationship was an exact page pin was **absent** from a Project's continuity evidence. GPT had to duplicate that already-saved relationship in `Note.links` for the Project to discover it.

A new `A-INBOUND` fixture first reproduced the failure: the Project focus returned no Note although the Note held an owner-owned exact pin.

## Implementation

`lib/continuity-evidence.ts` now includes `record.pagePins` in the references admitted by `recordPaths`, before generic links. The existing per-link rights, exact edition, section and part checks remain mandatory. No stored links are synthesized, no relationship is created by reading, and no achievement or activity is inferred.

The focused test also checks:

- A pin to a retained exact Project edition survives a later Project edit/removal of the current referenced part.
- A *current-only* pin to a removed part is not silently reattached to replacement content.
- The Note is not returned to a different owner.
- The read makes no write operations.

This complements the already present `work-thread-integrity.ts` reconciliation, which automatically follows unchanged moved parts and marks removed/ambiguous Work-thread references as unresolved. It does **not** reimplement that prior C4 functionality.

## V107 provenance

- Site: https://minamo-visual-lab.jscymru.chatgpt.site/
- Lab source commit: `dc0b3eadb1d6d14319154918e1276f28cda7e335`
- Owner-private saved version: **V107**, `appgprj_6aeba0aa528c81918be19dd51427b2cb~appgver_19bf0f44ecb88191bad0b0486453c181`.
- Private deployment: `appgdep_6af31c87d2408191a150a592e1fb831a`, **succeeded**.
- Independent Lab Sites Git source only; public GitHub PR #99 remains an architecture/acceptance ledger, not a mergeable code implementation. No production deployment.

## Verification

- Pre-fix focused regression `A-INBOUND`: **failed as predicted**, with `false !== true` for the absent pin-only Note.
- Post-fix `node --test tests/working-context-read.test.mjs tests/project-work-threads-c4.test.mjs tests/collaboration-preferences.test.mjs`: **11 passed, 0 failed**.
- `pnpm typecheck`: passed. `pnpm build`: passed (existing non-blocking piper/bundle warnings). Full historical suite not run.

**Actual installed Lab MCP after V107 publication:**

1. Read the V105 DNS Project `ms-1daba79f97c81f70e2aa6a1ac4b81aa98eaf95a7` rev1 and exact code part `s3/p4`, rendition `r-68f105058d71e33721f38067d5d376dd4805faa7deb7dfa5527e464ba112c5ae`.
2. Confirmed the Project initially had no Note page pins.
3. Created a clearly **synthetic GPT-authored** Note `pr99-v107-dns-cache-analysis`, rev1, *Why the cache model cannot identify a resolver*. The Note explicitly says it is not a learner observation and that no real DNS trace was run. The Note's `links` array was **empty**.
4. Via `set_note_page_pin` operation `pr99-v107-pin-dns-note-to-exact-model-20261110-v1`, pinned that Note to the exact Project rendition, section `s3`, part `p4`; the Note became rev2. No duplicate `links` entry was written.
5. `get_minamo_working_context` with only the Project focus now returns that Note as `authored-writing` in `evidence.items`, with the exact edition/section/part path and honest synthetic prose. `get_note_page_pins` independently returns exactly one pinned Note. The `relations` array remains empty; the incoming Note is intentionally evidence, not a fabricated outgoing edge.

**Cloud Browser user acceptance:**

- Opened the deployed six-section DNS Project and expanded **Connections**.
- The panel showed **Notes and work**, the exact Note title, date, and a restrained excerpt.
- Clicking the Note navigated to its retained rendition in **Your work** and rendered the complete text.
- **Back to Project** returned to the Project successfully. It reset the selected section to Introduction and collapsed Connections: functional, but a long-project navigation polish opportunity.
- The Connections panel is deliberately collapsed by default; when open it consumes a fairly tall area above the Project reader. Consider an unobtrusive inline treatment only after longer content stress tests.

## Remaining work and risks

1. Broad cross-Project links and Work artefacts need equally realistic readback tests, including changed interpretations, exact source rights and one-to-many relationships.
2. The full continuity reader is bounded and may exclude older candidates. A stale current-only pin is withheld rather than guessed; whether to expose a private, non-disclosing *unresolved link* diagnostic deserves design/rights review.
3. Returning from Your Work could preserve the selected Project section or exact passage instead of resetting to the introduction.
4. This is one narrow continuity defect fixed; the longitudinal six-month mixed-artefact Project and fresh third-conversation acceptance remain broader future requirements.
5. MCP preference `initiative` is still more advisory than server-enforced; authoring/editing style controls remain underdeveloped.

No Activity/Attempt authoring, mandatory checkpoints, GPT handoffs, fabricated learner history, production deployment or PR merge were introduced.
