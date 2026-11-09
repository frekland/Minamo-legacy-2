# Production C5 — contextual learner contribution reading (V129)

Date: 9 November 2026. This documents a completed native implementation and deployment, not a design-only proposal.

## Source and publication

- Existing production: https://minamo.jscymru.chatgpt.site/
- Previous deployed baseline: V128, native commit `10c02d0ddd6a54d9d2e3155238929362157d3867`.
- Deployed protected native source: **`1563b339ecf1d9ace4e41741606111c2745c5e40`**.
- Saved Sites version: **V129**, `appgprj_6ad8a4e85eb48191accd6e78976b47e3~appgver_88ac1e5bdcd08191a6fdedaf4f6a1fdb`.
- Production deployment: `appgdep_6af1c4ea34e481919652d9f185e38af1`, **succeeded**, MCP advertised.
- This public PR is documentation only. The protected source was committed, pushed, saved and deployed directly through Sites. Merging the public PR does **not** deploy the application.

## Native changes

Files: `app/project-contributions.tsx`, `app/project-contributions.css`, `tests/project-contributions-ui.test.mjs`.

1. Removed the per-block contribution separator and excess margins. A blank contextual target presents a small, quiet **Add example/response/code variation/observation** action rather than an empty card. Saved entries remain in a collapsed **Your examples/responses** group with its count.
2. Each saved contribution now labels its fields (e.g. **Japanese response**, **Translation / notes**) instead of displaying ambiguous adjacent text. Text stacks into one column on narrow screens; code remains monospaced, Japanese retains inline Play/Slow support.
3. Replaced prominent technical `You · rev N` with **You**. The exact revision and server update timestamp remain exposed as hover metadata. The edit form states clearly that learner additions are distinct from canonical Project content.
4. Made the provisional feedback control name identify accepted/suggestion/uncertain and open/closed state. Feedback explanation is concise with a note that it applies to the exact saved revision; server-side stale invalidation remains authoritative.
5. No new Activity/Attempt lifecycle, localStorage persistence, language engine, shell, Project creation UI, MCP tool, or database table. B1's exact Project/section/part identities, ownership, CAS, idempotency receipts, GPT review revision contract and canonical separation are unchanged.

## Focused checks

- `node --test tests/project-contributions.test.mjs`: **2/2 PASS**. Persistence, ownership, exact GPT review revision, stale feedback invalidation, receipt/CAS and no attempt-row dependency.
- `node --test tests/project-contributions-ui.test.mjs`: **1/1 PASS**. Labelled Japanese fields, discrete author metadata, exact expected learner revision on edit, updated response and hidden stale feedback.
- `node --test tests/project-reading-topics.test.mjs`: **2/2 PASS**. A5 generic stable topic identities and content splitting.
- `pnpm typecheck`: **PASS**.
- `pnpm build`: **PASS** (only existing non-fatal Vite/Piper dependency/chunk warnings).
- `git diff --check`: **PASS**. The legacy full suite was deliberately not run.

## Live Cloud Browser acceptance

Authenticated existing production Site, synthetic Project `test-language-japanese-pr85-20261105` → **Try the language / Asking the way**:

- Desktop retained the native left navigation, context-sensitive `Projects › Project name` breadcrumb, top-nav Japanese furigana, dialogue Play/Slow, and topic tabs.
- Expanded **Your responses 1** and saw the distinct `Japanese response` and `Translation / notes` field labels with compact author line.
- At a narrow CSS viewport (Chrome zoom/reflow), the response and translation stacked cleanly in one column without horizontal clipping. This was **not** physical-device Android testing.
- Edited the existing synthetic response's translation/notes and saved successfully through the browser; the edit form closed with the new text visible.
- After full reload, reopened the topic and group. The changed text remained. The installed production `read_project_contributions` MCP independently returned entry **revision 5**, updated text, and `review:null` (previous provisional review invalidated).
- Toggled global Japanese furigana off/on in the top toolbar; it changed between accessible Show/Hide states, then was restored.
- No destructive changes or edits to valuable learner Library content. No audio-device synthesis quality claim is made in C5; TTS was verified as a retained UI control, not audibly on the owner's handset.

## Remaining changes

- **Contribution UX**: optional later polish for very long lists and more direct low-friction GPT review affordance, without ever inventing an on-site grader. This release was presentation-focused; no new review transaction acceptance beyond the unchanged B1 domain tests and earlier MCP tests.
- **`read_project_changes`**: already present and reliable through fresh-chat MCP readback. Next small integration may use it to selectively surface changed canonical Project parts and learner contributions in GPT-led continuity. No need for another blanket fresh-chat campaign.
- **Activity/Attempt retirement**: separate targeted removal. Map UI consumers in `app/activity-studio.tsx`, `app/learning-activity.tsx`, `app/practice-panel.tsx` and `app/legacy-activity-viewer.tsx`; routes/contracts in `lib/activity/*`, `lib/learning-activity.ts`, `lib/practice*.ts`, `lib/domain-handler.ts`; and retained D1/record/recovery readers. Remove obsolete entry points and writes after checking that useful interactive artefacts do not require them. Do not bind B1 contributions to attempts.
- No B2 work-thread UI, A6 history rail, whole-app redesign, or large historical acceptance campaign in C5.
