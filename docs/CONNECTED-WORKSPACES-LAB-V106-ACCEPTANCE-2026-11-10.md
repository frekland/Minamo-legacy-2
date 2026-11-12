# Connected Workspaces — Visual Lab V106 canonical first-read context (10 Nov 2026)

**Scope:** Independent, owner-private Visual Lab only. Production V149 unchanged; PR #99 unmerged. Complements the [V105 accepted authoring/navigation report](CONNECTED-WORKSPACES-LAB-V105-ACCEPTANCE-2026-11-10.md).

## Discovery in an actual fresh MCP read

After the V105 six-section Project was authored and browser-verified, `get_minamo_working_context({focus:{family:"journey",id:"ms-1daba79f97c81f70e2aa6a1ac4b81aa98eaf95a7"}})` returned the correct identity, exact rendition, collaboration policy and uncertainty markers—but its `selected[0].preview` was `{"text":"","complete":false}`. The writing exists in canonical sections, while the legacy `body` field is intentionally empty. A GPT needed another tool call to discover even the subject outline. This is a real cross-conversation continuity weakness, not missing data.

## Implemented

`lib/working-context-read.ts` now uses a bounded canonical-source preview:

- Where no canonical sections exist, retain the prior body preview behaviour.
- Where sections exist, include a bounded literal heading outline (up to six titles, with more-coverage indication), the first available authored prose, and—at detailed context depth where budget allows—an excerpt from the last section. The server does **not** write a generated “state”, conclusion, next action, achievement or relationship.
- Honour existing concise/balanced/detailed preview budgets of 220/450/800 characters; mark any section-based orientation `complete:false` so GPT knows to retrieve the exact material.
- Preserve owner and retained-edition checks, source permissions, immutable revision identity, read-only semantics and the existing overall 64 KiB context cap. No tool signature or connector reinstall is required.
- Added `A-PREVIEW` fixture covering a Project with empty legacy body and genuine section text/code, checking the literal headings/excerpt, boundedness, incomplete flag and absence of read-side mutations.

## Release

- Site: https://minamo-visual-lab.jscymru.chatgpt.site/
- Lab source commit: `a7e06a3b87020d4f021e92b6853a05379ca38cfb`.
- Owner-private saved version: **V106**, `appgprj_6aeba0aa528c81918be19dd51427b2cb~appgver_d29c09bf784c8191baf6ee1e0b96b02f`.
- Private deployment: `appgdep_6af312b40dcc8191a50da7f71795c321`, **succeeded**.
- Source remains in separate Lab Sites Git, not the public PR branch. No production or merge action.

## Focused verification

- Prior `tests/working-context-read.test.mjs` and `tests/collaboration-preferences.test.mjs` run: eight passed, one new fixture failure because it omitted an unrelated **legacy stage identity** required by the low-level record API. That was fixed in the fixture; it was not a checkpoint requirement.
- Corrected `node --test --test-name-pattern='A-PREVIEW' tests/working-context-read.test.mjs`: **1 passed**.
- `pnpm typecheck`: succeeded; `pnpm build`: succeeded. No historical full regression suite.
- **Actual installed MCP acceptance after deployment:** same `get_minamo_working_context` focus now returns:
  - Exact Project rev1 and immutable rendition `r-68f105058d71e33721f38067d5d376dd4805faa7deb7dfa5527e464ba112c5ae`.
  - `preview.text`: `Sections: Introduction · The ambiguity · A small controlled model · Evidence required before a real conclusion · An alternative explanation · Unresolved questions\nA reproducible query is useful evidence, but it does not by itself identify which cache answered. This synthetic Lab Project retains a proposed probe and its limits; it is not a record of a learner carrying it out.`
  - `preview.complete:false`, `collaboration.effective:{contextDepth:"balanced",relatedMaterial:"saved",initiative:"requested"}`, `evidenceLimit:12`, `coverage.gaps:["external-unobserved"]`.
  - No unrelated records, relations or evidence invented merely to fill context.

## Interpretation and limits

A fresh GPT can now see what a section-authored Project contains before choosing exact deeper reads. It **cannot** infer what the learner last did, which part matters most or whether code was executed; the read correctly says so. A detailed first read remains an orientation, not a substitute for `get_project_composition` and exact-source provenance. Future work should test this with a genuinely long, mixed artefact Project and preference-dependent context depth, while resisting the temptation to build a synthetic activity summary.
