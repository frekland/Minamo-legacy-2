# Minamo PR #99 — Visual Lab V118 native Python source packages

**10 November 2026. Visual Lab only.** Production remains V149; PR #99 is unmerged.

## Problem and scope

Independent Radio Island acceptance in [V116](CONNECTED-WORKSPACES-LAB-V116-ACCEPTANCE-2026-11-10.md) reconstructed seven modules and a test suite manually from separate canonical Project code parts. The code was retainable and real, but the *package* had no native identity or reusable download. V118 addresses that practical gap without a new Activity/Attempt system or duplicating source into another record.

## Native source package design

A Project may now optionally include up to **three** `composition.codePackages` definitions, each declaring up to **24** UTF-8 text files with:

- Exact `sectionId` and `partId` of canonical Project code parts.
- Explicit relative `path` (never derived from heading/title or model speculation).
- Source role `source`, `test` or `documentation`.
- Python runtime and an optional exact declared Python entrypoint.

The package definition is revisioned in the **existing Project record**. The source bytes remain where they already belong, in the original canonical parts; there is no second copy, activity ledger, progress state, or per-attempt result.

`get_project_composition` additionally returns an inventory of exact declared paths, status, UTF-8 byte counts, SHA-256 source hashes and Project revision/rendition. A missing/withdrawn/non-code or basic credential-pattern-blocked part is reported as unavailable. This status does **not** prevent normal Project revisions: the original ref remains, and no unrelated part is silently substituted.

An authenticated owner-scoped `GET /api/projects/code-package?projectId=...&packageId=...&revision=N` exports a deterministic store-only ZIP **from an explicitly requested saved Project revision**. It includes every exact referenced file and `MINAMO-SOURCE-MANIFEST.json` with file hashes, source section/part identities, Project revision/rendition and explicit non-execution statement. The server rejects unavailable, unsafe or oversized source rather than guessing a replacement. The URL requires current generation and owner identity, with private/no-store response headers. Earlier eligible saved editions remain downloadable after a later source revision or removal.

Limits and cautions: 150,000 total source bytes per package, ASCII-NFC safe relative paths, case-insensitive path uniqueness, blocked dot/parent/device paths, no install scripts, no automatic execution, basic credential-pattern exclusion (not a comprehensive secret scanner). No arbitrary build command is executed. JSON manifest does not establish that the source was ever run.

The Project UI gains a compact optional **source files** row showing declared paths, current source revision, unavailable status and an explicit **Download ZIP** action. It appears only on Projects with a package definition. No extra authoring template, mandatory file structure or explanatory dashboard was added.

## Source, checks and deployment

- Native isolated Lab source commit: `f1da52762174c078759289122c0d090d1432f9c9`.
- Saved Site version **V118**: `appgprj_6aeba0aa528c81918be19dd51427b2cb~appgver_0e56420e1648819198a4b19df8c47b0a`.
- Deployment: `appgdep_6af3710090b08191bd340563ffbf34d8`, **succeeded**, MCP retained, owner-private.
- URL: https://minamo-visual-lab.jscymru.chatgpt.site/
- Pushed exact source and attached packaged build archive through the Sites source workflow.
- Focused tests: **13/13 passed** (native package endpoint/integrity/source revision/owner isolation/invalid path/idempotency; Project changes; Work threads; working context).
- `pnpm typecheck` and `pnpm build` passed; `git diff --check` clean. Existing Piper browser-externalization/chunk-size warnings remain.
- Full historical regression suite deliberately **not run** under owner testing policy.

Local D1/Worker integration tests specifically covered: case-insensitive path collision and traversal rejection; exact source SHA-256; byte-identical ZIP retries; original r1 contents after r2 edits; r3 removed part reporting without blocking the Project edit; failed current ZIP and successful historical ZIP; another owner's 404; MCP tool list advertising the new composition field; replay-safe Project authoring. No outside playtests or execution outcomes were fabricated.

Authenticated **Cloud Browser smoke** after deployment confirmed Radio Island Project revision 35 loads with its six Sections and Questions. It currently has no source-package definition, so the new UI/download workflow **has not yet been acceptance-tested on a populated Project**.

## MCP reinstall boundary — stop here for real connector authoring

The `apply_project_update` / `preview_project_update` input schemas changed to include optional `composition.codePackages`. This changes the installed MCP tool catalogue. **Reinstall the Minamo Visual Lab connector after V118 deployment before attempting real MCP package authoring.**

Once the owner confirms reinstall:
1. Read the fresh installed tool schema, get layout capabilities and Radio Island's current exact revision/section/part identities.
2. Preview and save a coherent declared file map for the existing modules and tests with Project CAS and idempotent operation ID. Do not create a replacement Project or copy code to a separate Activity record.
3. Read back the package inventory/source hashes through the actual installed MCP.
4. Download the revision-pinned ZIP through the real authenticated UI, inspect its manifest, independently run the retained Python tests from the exported files and compare with the prior 59-test result.
5. Check Questions, Sections, code presentation, path list, historic revision download and failures. Iterate any problem found and update PR #99.
6. After that complete acceptance, consider a native multi-file source explorer/editor and optional integration with existing Python Canvas, with no unverified execution claims.

**Not yet claimed:** installed-MCP authoring of a V118 package, Radio Island package ZIP readback, browser ZIP download, independent execution *from an exported V118 ZIP*, or cross-device acceptance. The new API was tested with local fixture workers, not with an owner-populated production-like package record.

Checkpoint-free Project authoring remains unchanged. No legacy Activity/Attempt tools were expanded or repurposed, and production V149 was not touched.