# Connected Workspaces — Visual Lab V105 and fresh-connector acceptance (10 Nov 2026)

**Scope:** Visual Lab only. Production V149 unchanged. PR #99 remains unmerged. This report supplements [V103–V104](CONNECTED-WORKSPACES-LAB-V104-ACCEPTANCE-2026-11-10.md) and prior V98–V102 reports.

## Release provenance

- Site: https://minamo-visual-lab.jscymru.chatgpt.site/
- Private Sites project: `appgprj_6aeba0aa528c81918be19dd51427b2cb`.
- Lab Sites source commit: `349f24c79f297590e2ad16a1feeed5a4bde7251d`.
- Saved Lab version: **V105**, `appgprj_6aeba0aa528c81918be19dd51427b2cb~appgver_8ba2b11f4fd0819198758dff93a8c7c2`.
- Private deployment: `appgdep_6af30fba22d48191afcd729d28a7e74c`, status **succeeded**.
- This source is in the *independent Lab Sites repository*, not in public GitHub PR #99. No production deployment or merge.

## Fresh conversation: actual installed MCP after connector reinstall

The refreshed `publish_minamo_manuscript` tool description explicitly permits flexible Project `##` headings with **no required Intent, Outcome or Checkpoint fields**. Earlier stale tool instructions that insisted on all three were no longer present.

1. Published a new synthetic Computing Project directly through the installed `publish_minamo_manuscript` tool, without any of the three progress labels. Project: `ms-716ab980c46ad32f6d5e568d08182675f7c4ce2f`, *When a reproducible route changes its story*, with real Python source drawn from previously retained Radio Island work and honest reproduction limits.
2. Read its canonical composition through the installed `get_project_composition`, revised it using the actual `apply_project_update` tool with expected revision and a retry-stable operation ID, then read current and exact earlier revisions, changes and immutable manuscript source. The new paragraph was present only in rev2; the original source was retained. No checkpoint metadata was produced.
3. Browser acceptance of this V104-authored Project identified a design defect: **generic “Notebook” / “Guide” tabs** represented natural H2 headings only as nested Guide topics. The checkpoint-free data was correct, but navigation contradicted the flexible authoring model.

## V105 correction

`lib/manuscript.ts` now creates canonical `projectComposition` for fresh Project manuscripts: one native section per real Project section, including the introduction, rather than going through the legacy Journey adapter. Each native section uses the normal notebook pattern and references its canonical section block; original text, code and immutable source remain canonical.

For targeted manuscript revisions with a prior native composition:

- Preserve existing owner-arranged sections, slots, blocks and cross-record references.
- Append new authored sections as new native tabs; do not silently hide them.
- Follow heading-title edits only if a tab still uses its original automatic title; retain a customised tab label.
- Remove broken section blocks when manuscript sections are removed, without discarding unrelated authored layout structures.
- Stop with an explicit capacity/identity conflict when a new layout cannot represent the manuscript within existing bounded native limits. This is a non-destructive rejection.
- Legacy Projects without a native composition continue to use the prior read adapter.

This remains **Project authoring**, not activity/progress tracking.

## V105 local checks

- `node --test tests/checkpoint-free-project-authoring.test.mjs tests/manuscript-metadata.test.mjs`: **5 passed**, 0 failed (initial slice).
- `node --test tests/manuscript-stage-rename.test.mjs tests/manuscript-introduction.test.mjs tests/pr83-composition.test.mjs`: **4 passed**, 0 failed (legacy identity and protected edits).
- Updated `tests/checkpoint-free-project-authoring.test.mjs` re-run: **1 passed**, 0 failed, including creation, exact history, natural composition, edits, added heading and heading rename.
- `pnpm typecheck`: succeeded.
- `pnpm build`: succeeded. Existing non-blocking dependency/chunk warnings remain; entire historical suite intentionally not run.

## V105 actual installed MCP and Cloud Browser verification

Published a separate fresh synthetic Project directly through installed Lab MCP:

- Title: *Resolver traces: what the observation leaves open*.
- ID: `ms-1daba79f97c81f70e2aa6a1ac4b81aa98eaf95a7`, rev1.
- Publication operation: `pr99-v105-fresh-mcp-natural-headings-20261110-v1`.
- Immutable source digest: `7e668d26b5adb7504a7572568f84387d6367e177f093053e016bafef05f6e2fe`.
- Six canonical sections / six native layout tabs: *Introduction*; *The ambiguity*; *A small controlled model*; *Evidence required before a real conclusion*; *An alternative explanation*; *Unresolved questions*.
- Contains an executable pure-Python cache model, clearly marked as a model, not a measured DNS trace. No real execution, learner authorship or achievement was asserted.
- Installed `get_project_composition` confirmed identical authored/layout headings, one code part and stage entries containing only identity/title fields. **No checkpoint fields**.
- Cloud Browser on the deployed URL displayed all six named top-level tabs (not Notebook/Guide), real code in the selected model tab, a restrained two-column layout, and Notes drawer. The previously authored V104 Project still rendered via its historical adapter.

## Critical limitations and next development

1. **Compatibility is not migration.** Previously published V104 natural Project still has the legacy Notebook/Guide adapter; V105 applies to newly authored Projects, while old records remain read-compatible. Consider an opt-in / evidence-driven layout upgrade for older Projects, carefully preserving direct edits.
2. **Navigation long titles.** Long authored headings wrap into three or more lines in the narrow tab rail, giving uneven rhythm. Avoid additional metadata panels; improve typography, truncation/tooltip or responsive rail proportions.
3. **Automatic connections need broader real-world stress.** V103/V104 canonical references and inbound Note links were verified, but cross-Project relationship preservation under manuscript section deletion/renaming plus native artefact updates should receive dedicated tests.
4. **Personalisation depth.** Server-backed global and per-Project settings already affect working context and connection limits (V104 tests). A longer fresh-chat exercise should show those changes in the *quality* of authoring decisions, not just the shape of returned context.
5. **Tool language.** Although checkpoint obligations were removed, the manuscript tool still refers to “Journeys”, “Activities” and a blanket “Start working locally stage” for practical computing goals. Review those editorial nudges for unnecessarily rigid structure; do not remove legitimate legacy read contracts merely to hide old terminology.
6. **Substantial continuity.** V104 Radio Island data and exact-revision evidence remain the stronger longitudinal example. The new V105 DNS model is an authoring/navigation acceptance, not a claim that a learner completed a multi-session investigation.

**Boundary:** No Activity/Attempt revival, no mandatory progress replacement, no production deploy, no PR merge. This PR is still an implementation/acceptance ledger: Lab code has not been ported into the public repository.
