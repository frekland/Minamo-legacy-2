# Visual Lab V130 — compact reciprocal connections without losing exact editions

10 November 2026 · PR #99 · owner-private Visual Lab only

## Why this slice
V129 successfully returned two different source-grounded facts for a non-computing Project: its diagram cites Library Article r1, and Article r2 cites Project r4. Cloud Browser rendered two full cards with the same Article title, repeating both metadata and explanatory text. The owner wants sustained work to remain legible without losing canonical provenance. A local review also identified a possible presentation-level deduplication fault: direction was absent from the deduplication identity, so reciprocal citations to the *same exact edition* could be collapsed.

## Changes
- `app/project-connections.tsx`:
  - Preserve `incoming` versus `outgoing` in the projection identity, including the cited Project edition. Duplicate readings of the *same* direction remain deduplicated.
  - Group admitted source relationships only by exact `family + id`, never by a coincident title, while preserving each relation's version and target.
  - Show a single source title, then compact independent links such as **“Project cites r1 · earlier edition”** and **“Article r2 references this Project r4.”** Original citations navigate to their exact saved edition.
  - Keep the separately admitted “newer edition” shortcut when it is not already represented by another grouped link. Collapse detailed authored reasons under **Why linked** so provenance remains readable on demand.
  - Shorten the panel introduction; preserve current partial-coverage and preference caveats.
- `app/project-connections.css`: restrained nested edition treatment, no new metadata panel or progress structure.
- `tests/project-connections.test.mjs`: regression that outgoing and incoming to the *same exact Article edition* survive independently; identical-title unrelated sources remain distinct.

## Build and acceptance
- Focused tests: **12/12** passed across Project Connections and working-context reads; warning about CJS `import.meta` exists in test bundling but tests pass.
- `pnpm typecheck` **passed**.
- `pnpm build` **passed**, with existing third-party asset/chunk warnings, no change-specific errors.
- `git diff --check` **passed** before push.
- Private Lab source commit **`10dac15b83341086719a3d16d0a0e2a78877a5c5`** pushed successfully.
- Lab **V130** deployment **`appgdep_6af39d3765dc8191a706a3b9b9c7412b`** ultimately **succeeded**. Publication was pending longer than previous deployments; no duplicate save/deploy was initiated.
- Actual installed Visual Lab MCP after deployment returned exactly the same two relationship receipts for the synthetic visual composition Project: outgoing Article r1 `older-edition` with a distinct newer r2; incoming Article r2 `saved-inbound-record-link` with `citedProject` pinned to Project r4. `coverage.completeWithinScope:true`.
- Cloud Browser after deployment displayed **one Article heading and two compact directional edition links**. Expanding **Why linked** revealed the original diagram-node explanation and the separate Article-to-Project citation reason. Clicking “Project cites r1” opened Library Article **Retained edition · revision 1**, with a separate way to view the current edition; Back to Project worked. The incoming link opened the Article's current r2.

### Historical-view question resolved
The older Article r1's Related content panel also showed the Project. This initially looked like a possible revision leak. Code inspection identified that this panel derives *incoming* links from other records, including the Project's legitimate authored citation to Article r1. It did **not** demonstrate that Article r1 had acquired Article r2's later outbound link. No integrity defect is claimed from this observation.

## Limitations and next choices
- This is UI and presentation deduplication; no MCP tool inputs, canonical records, D1/R2 migrations or source admission rules changed, so **no connector reinstall**.
- The Project Connections panel is still optional and takes space when opened. The generic Your Work relationships view has a separate presentation and was not grouped in V130.
- Grouping is by source identity, not by meaning; it does not infer semantic interpretation, contradicting claims or learner intent.
- The synthetic creative fixture is good for edition correctness but does not yet prove comfortable continuity across an extended Japanese or scientific Project with multiple Notes/Library sources and withdrawals. That should be the next meaningful acceptance.
- Source is still hosted in the separate private Lab Site repository; public PR #99 documentation is **not yet a complete byte-for-byte mirror** of deployed app code. Reconciliation remains mandatory before production promotion.
- **Production V149 unchanged; PR #99 open/draft/unmerged.** No Activity/Attempt system or checkpoint authoring introduced; full historical regression suite was not run.
