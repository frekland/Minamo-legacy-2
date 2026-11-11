# Visual Lab V145 — Owner-controlled MCP tool access (11 November 2026)

## Scope and decision

This is the next coherent PR #99 Lab-first slice after V144. **Production V149 remains unchanged. PR #99 remains draft/unmerged; public-branch source reconciliation is intentionally deferred until the owner is satisfied with the completed Lab experience.**

The owner can now choose **Settings → GPT & context → MCP tool access**:

- **Read and save when asked** (default): existing owner-directed MCP read, preview and save tools remain advertised; their existing revision, permission, operation identity and explicit request gates continue to apply. This does *not* give GPT permission to make changes independently.
- **Read and preview only**: owner-specific MCP `tools/list` excludes all fifteen mutating tools (Project/Note/relationship/recovery, authoring packages, image upload, synthetic tools and preference write). The same policy is checked on *every mutating invocation*, so an already-connected client with cached tool definitions cannot write either. Read tools, exact edition/context reads, previews and operation-status receipt recovery remain available. The owner's direct website edits remain available. The owner can restore authoring in website Settings; installed ChatGPT connectors may need refresh/reinstallation to see the changed catalogue.

The tool-access preference is **global**, not overridable per Project. Project-level `projectEditing:preview-only` remains a separate narrower control for Project saves only. Existing persisted global rows from V144 with five settings (and older three-setting rows) are read with the safe default `mcpTools:'authoring'`; subsequent changes use all six values with CAS and retry-stable operation IDs. These settings govern MCP availability, *not* implicit consent, achievement claims or evidence authority.

The code also corrected an MCP schema discrepancy from V144: `learningScope.spaces:[]` now advertises the exact **Other** scope accepted by the underlying server, instead of incorrectly requiring at least one Computing/Language tag. Canonical records and synthetic provenance are unaffected.

## Private source and deployment

- Private source commit: `9c934f228c4298c779d1850eb61d586255d02c7c`.
- Owner-private Visual Lab: [minamo-visual-lab.jscymru.chatgpt.site](https://minamo-visual-lab.jscymru.chatgpt.site/).
- Saved Site version: **V145**.
- Deployment: `appgdep_6af490d9d8d4819182f4d39a16e29f8a`. **Succeeded**, MCP present, as confirmed by the native deployment status after the pending build.

## Acceptance

### Isolated owner-scoped D1/R2 integration

- `tests/collaboration-preferences.test.mjs`: **7/7 passed** after policy implementation. Covers default and existing preferences, exact Project overrides and rejection of per-Project MCP controls, new five-field legacy persistence migration, owner isolation, context reduction, Project preview-only enforcement, and a complete **authoring → read-only → restored** lifecycle.
- During read-only, `tools/list` omits mutators but retains exact reads, working context, previews and operation receipt recovery. A deliberately attempted cached `apply_minamo_command` and cached preference-write tool both return `mcp_read_only` with no mutation. A website `/api/commands` write can still update the Note. After a revisioned website preferences restoration, tools are advertised again and an explicitly requested MCP write succeeds. A second owner's catalogue remains unaffected.
- `pnpm typecheck`: passed. `pnpm build`: passed. `git diff --check`: passed.
- Adjacent selected test files: **2 passed, 2 failed**. The two failures call obsolete Activity/Attempt publishing tools retired from this Lab, and are **stale regression expectations**, not pass claims or justification to reinstate learner-activity infrastructure.

### Live owner-private Lab

- A fresh site reload displayed all six Settings options, including **MCP tool access** with **Read and save when asked** selected. Screenshot/accessible browser inspection confirmed the control appears after Project editing and that explanatory text distinguishes the broader MCP choice from Project-only previews. The Settings panel is scrollable (the bottom explanation extends below the initial viewport).
- The installed Visual Lab MCP returned the new `mcpTools:'authoring'` field and the revised notice; global preference revision **4**. This is direct read-back from the running Lab, not an inference from the source.
- **Limitation:** we did not change the owner's live global preference to read-only and back. The full state transition, cached-client denial and restoration were verified in isolated owner-scoped integration. Browser verification confirms the default live setting is displayed, but does not independently demonstrate a live toggle save/restore. A client tool-catalogue refresh after changing the value remains a real-user acceptance item.

## Architectural judgement and further scope

This removes one real gap in the original PR #99 dynamic MCP ambitions: the control is now functional at both tool discovery and server invocation, owner-scoped and recoverable from website Settings without relying on chat memory. It remains a *coarse* read-only vs authoring mode, not a per-tool permission manager or per-workspace capability profile. It deliberately avoids a large matrix of toggles until observed need demonstrates one. Settings still consume substantial vertical space; consider compact grouping/disclosure without hiding important defaults.

The broader PR #99 agenda remains unfinished: meaningfully compare new-chat continuity across four domains; clarify incomplete retrieval/reciprocal links and rights-revocation conditions on large histories; test browser mobile and older editions; deepen Home/Projects/Library/Your Work integration; quantify production feature parity; and complete accessible Project/Note/Library relationship authoring without administrative Work scaffolding.

**Next substantial Lab slice:** cross-domain read completeness, limited-history/pagination signals and rights/revocation acceptance, with calm discoverability in Home/Your Work. Continue authoring deep synthetic Lab histories where needed, without prominent test banners or false learner achievements. Public source reconciliation and production migration are *later owner-acceptance gates*, not the next work item.
