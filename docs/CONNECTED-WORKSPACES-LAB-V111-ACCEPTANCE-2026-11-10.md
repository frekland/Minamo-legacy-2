# V111 — Project authoring preferences and GPT save restriction
**Date:** 10 November 2026  
**Scope:** Visual Lab only, PR #99 remains draft/unmerged. Production V149 untouched.

## Implementation
Private Lab source commit `fd2ced420beb350e118665a56fda1af569deaf41` builds on V110.

- Added durable `authoringDetail: concise | balanced | detailed` and `projectEditing: direct | preview-only` to the existing global / exact-Project collaboration preferences. Existing stored three-field global rows read through safe defaults; subsequent global writes require all five fields. Project override storage, owner isolation, optimistic revision checks, generation fencing and idempotent operation receipts are unchanged.
- `get_minamo_collaboration_preferences` now returns effective authoring guidance; `get_minamo_working_context` includes it in the bounded collaboration projection. `get_minamo_editorial_policy` now includes global guidance, optionally narrowed to an exact Project through a new `projectId` input.
- `preview-only` is enforced for GPT canonical Project mutations in `executeCommand`, `applyProjectUpdate` (including its Project+Note batch), and `applyAuthoringPackage` (also reached by manuscript publication). Read-only previews remain eligible. An existing exact Project can override its global default; a new Project inherits the global restriction. A previously committed identical operation can still replay its receipt after the setting changes. This setting does not prevent an owner's direct website edits, independent Note/Library authoring, or merely viewing/suggesting connections.
- Both UI settings surfaces expose writing detail and Project editing. No progress structures, mandatory labels, checkpoints, activity dashboards or GPT handoffs were added. Tool names remain stable; the collaboration preference input schema and editorial policy schema/descriptions did change.

## Verification
- `node --test tests/collaboration-preferences.test.mjs`: **6/6 passed**. Covers global and Project writes, owner isolation, stale revisions, MCP read projection, hidden related evidence, new Project save refusal, read-only preview, replay after a restriction, direct owner edit, exact Project override, global creation restriction, editorial guidance, and legacy three-field preference rows.
- `pnpm typecheck`: passed. `pnpm build`: passed. Historical full regression suite was not run.
- Saved Sites V111: `appgprj_6aeba0aa528c81918be19dd51427b2cb~appgver_40610ef66154819185f05e874a4cefac`.
- Deployment: `appgdep_6af33239be2881918510b4455cb8f9b1`, **succeeded**, `has_mcp: true`, URL `https://minamo-visual-lab.jscymru.chatgpt.site/`.
- Cloud Browser (after reload to V111): global Settings / GPT & context shows both new choices; synthetic DNS Project's "GPT Project saves" override was set to Previews only, saved, and was still selected after a full browser reload.
- **Actual installed Visual Lab MCP** read the exact synthetic DNS Project and returned effective `projectEditing:preview-only` plus authoring guidance. `apply_minamo_command` for its exact canonical Project record failed with `project_preview_only` (expected negative acceptance). `read_minamo_record` confirmed its Project stayed at rev 1 and original title.
- The synthetic Project preference was then restored to inherited defaults through the actual MCP tool, revision 7 with `overrides:{}`; a subsequent MCP read confirmed `projectEditing:direct` and the editorial policy read included current authoring guidance. Global preferences were not changed.
- Note: this live negative write test used the existing installed command schema; new preference input names require connector reinstallation before direct MCP writes of these values can be accepted as fully verified.

## Critical limitations
1. `authoringDetail` returns server-authored, persistent guidance; it cannot force a language model to produce a given length or quality. `initiative` remains advisory. They are different from the enforced `projectEditing` restriction.
2. Project editing restriction applies to GPT **canonical Project writes**, not Notes, Articles, sidecar observations, relationship confirmations or browser owner editing. The UI labels it accordingly. The preference check occurs before the mutation transaction, without a preference-revision condition inside the mutation's D1 claim; a simultaneous setting flip may require a later transactional fence if treated as a stronger authorisation boundary.
3. The installed connector still exposes the V110 input schemas until refresh. The V111 deployed server and browser are current; schema-change acceptance needs reinstall and fresh-chat verification.
4. The legacy learning-development MCP tools still have checkpoint-specific names, descriptions and intent schemas. New Project manuscript authoring does not require them, but the broader checkpoint-removal commission is **not fully accepted** while those legacy surfaces remain discoverable. Audit retirement/compatibility without destroying retained old content.
5. No broader multi-session real learner continuity case was authored in this slice. The synthetic DNS Project tests server preference behaviour; it does not establish actual learner execution or achievements.

## Next slice
1. Refresh/reinstall the Visual Lab connector; verify the updated collaboration values and optional Project editorial-policy input via actual MCP, ideally in a new conversation.
2. Audit and remove lingering checkpoint-specific **new-authoring** prompts/tools/validation while preserving read access to retained legacy records. Do not substitute another mandatory progress notion.
3. Strengthen automatically maintained Project / Note / Work / source relationships and run a genuine multi-session authoring case, preserving source editions, revisions and unresolved interpretations.
4. Consider a transactional preference-revision fence if preview-only becomes a security-sensitive authorisation control; currently it is an owner collaboration choice, not a source permission grant.
