# Connected Workspaces — Visual Lab V98 prototype and acceptance receipt

Date: 10 November 2026  
Status: **Lab-only prototype deployed; awaiting fresh MCP registration and owner UX feedback.**  
Related design: [Connected Workspaces architecture](CONNECTED-WORKSPACES-ARCHITECTURE-2026-11-10.md).

## Source and release provenance

- Consolidated production-source baseline: public `frekland/Minamo` `main` after PR #100, merge `cd3d47627108d054e0a1e1d1425eb156e310f266`, corresponding to production V149.
- Visual Lab reset baseline: V97 source `f8d2f650ac8f26a6ac9430e4ee0c15a37ee3ee2d`, hosted in its *separate owner-private* `minamo-visual-lab` Site repository.
- Prototype deployment: Visual Lab **V98**, source commit `ebcffc69ce1bfa0c904d98efe13e67c06f46ebc6`, saved version `appgver_b09fe9902588819193773d40add47b68`, deployed successfully 10 November 2026. URL: https://minamo-visual-lab.jscymru.chatgpt.site/.
- **Production Site V149 was not edited or redeployed.** The prototype source lives in the separate Lab repository, not in this PR branch yet. Do not confuse this report with approval to promote its implementation to production.

## First slice: durable collaboration preferences

Rather than mutable MCP tool discovery on every setting change, this slice tests a **stable MCP tool surface with owner-controlled server behavior**. It does not remove tools or grant new authority.

1. New owner-scoped server preferences: context detail `concise|balanced|detailed`; saved related material `none|saved`; suggestion initiative `requested|offer`. Default `balanced/saved/requested`.
2. Global choices live in the canonical owner's durable D1 storage and apply across device, conversation and workspace generations. Project overrides are stored separately within that Project's exact generation namespace; they inherit unspecified global options.
3. New API: `GET/POST /api/collaboration-preferences`. New MCP tools: `get_minamo_collaboration_preferences`, `set_minamo_collaboration_preferences`. The write requires explicit owner intent, exact revision/generation and retry-stable operation ID. Owner isolation, CAS conflict, idempotency and Project eligibility are enforced on the server.
4. `get_minamo_working_context` now reads the effective policy: evidence cap 5/12/20, selected-source preview cap 220/450/800 characters, and optional omission of *saved related links*. Selected sources remain visible. If saved links are hidden, response coverage explicitly says they were omitted—not that none exist. A policy revision change during the read causes a conflict and retry.
5. New **Settings → GPT & context** interface loads and persists global settings. It explicitly says a suggestion preference cannot authorise a record edit, inferred learning claim or automatic link.
6. New D1 migration `0017_material_smasher.sql`: `v2_collaboration_preferences` and `v2_collaboration_preference_operations`. No removal of retained content, Notes, Work or legacy data.

## Evidence gathered

- `pnpm typecheck`: pass.
- Local build using the Sites build helper: pass.
- Focused real-D1/Miniflare and Settings tests:
  `node --test tests/collaboration-preferences.test.mjs tests/working-context-read.test.mjs tests/settings-help-redesign.test.mjs` — **12/12 passed**.
- Live Visual Lab browser: Settings panel visible; Balanced default loaded; changed to Concise; server reported saved; full page refresh preserved Concise; restored Balanced and confirmed saved. Site rendering and Home/top navigation verified. No production mutations.
- Visual Lab V98 private deployment: **succeeded** with MCP present. However, the *currently installed connector* calls to older `get_minamo_workspace` and `get_minamo_working_context` returned `Unknown tool` after deployment. This is a connector registration issue to re-test after reinstalling/refeshing the Visual Lab plugin, not a verified server bug. New tool discovery and fresh-chat write/read are **not yet accepted**.

## Deliberate limitations and next tests

- We have not validated whether the ChatGPT connector can change its exposed tool list dynamically in response to preferences. Keep discovery stable for now; preferences safely affect data projection and instruction metadata.
- Project overrides currently have MCP/API support, not a project-local Settings UI.
- The `initiative` choice is policy metadata for GPT, not a guarantee of model obedience or permission to edit.
- The three options apply to `get_minamo_working_context`; not every legacy MCP read has been rewritten to reflect them. No claim of global tool-level enforcement.
- A fresh-chat MCP acceptance must: reinstall/refresh Lab plugin, discover new tools, read current preferences, write a deliberate non-default value with CAS, read it back in a new conversation, inspect context behavior, restore default; separately test a Project override and owner/permission boundaries.
- Then prototype the deeper continuity work from the architecture document: canonical Work ↔ Project ↔ Note links, meaningful handoff across sessions, surfaced provenance and correction/recovery UX. Avoid resurrecting Activity/Attempt or checkpoints.
- Assess mobile Settings layout and long-project UX before any production promotion. A full regression suite is not required merely for this lab release; use focused tests.

## Promotion boundary

Before production integration, reconcile this exact Lab commit against the consolidated V149 public source, document migrations, verify current auth/generation invariants, include a targeted rollback/recovery check, and obtain owner approval for promotion. This draft PR remains the design/acceptance tracking thread; production data preservation should not be mistaken for a ban on substantive owner-requested changes.
