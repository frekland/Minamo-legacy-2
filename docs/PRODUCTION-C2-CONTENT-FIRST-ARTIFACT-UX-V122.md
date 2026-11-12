# Minamo production C2 — content-first Projects and interactive artefacts (V122)

**Status:** implemented and deployed to the existing production Site on 9 November 2026. This is a **public, documentation-only handoff**. The deployable implementation remains in the protected native Sites source. A public GitHub merge does not publish the Site.

## Deployment

- Site: https://minamo.jscymru.chatgpt.site/
- Starting point: V120, native source `a65f85defeaef8bfefd9fbc890260813dc7cce29`.
- Initial C2: **V121**, native source `a98c13062ded1b9f61a33b8cfbc03e6ce4227151`, saved version `appgprj_6ad8a4e85eb48191accd6e78976b47e3~appgver_ab5532d8eae08191b6104ec54af855e4`. Browser execution and synthetic Project save found redundant JSON-provenance code actions.
- Accepted correction: **V122**, native source `cb2cc77b8d03ad52fa3cd5519b75720351878f51`, saved version `appgprj_6ad8a4e85eb48191accd6e78976b47e3~appgver_5fa7886e15108191991901db137978ef`, deployment `appgdep_6af1aaa0ada481919d971fd33dee31e4` **succeeded**, MCP enabled.
- Existing custom audience, Site identity and DB/media/MCP bindings unchanged. V120/V121 remain saved recovery points.

## Native change manifest

1. `app/project-sections.css` — reduce Project title/description scale and margins, slightly narrow the second navigation rail, compact section/topic controls and vertical spacing, while preserving the existing app left sidebar, Notes dock and responsive rules. Add content-first Canvas/Pygbag surfaces and collapsed metadata styles.
2. `app/project-canvas.tsx` — replace the unexecuted blank canvas with an explicit, compact **Ready to explore** surface. Show loading state before an actual result, retain error/Stop/Reset and manual Run. Keep the existing isolated Python engine (including its 20-second execution limit) and native parameter explorer. Explain what a saved observation is and how to keep it in the Project or an existing Note. Do not auto-execute authored Python before deliberate Run.
3. `app/project-pygbag.tsx` — game-first **Run game** surface and clearer Restart/Stop/Focus actions. Preserve package SHA-256 admission, isolated frame, existing five-minute runtime budget and no in-game state persistence. No new package runner.
4. `app/reader.tsx` and `app/project-reading.tsx` — a browser-reported Canvas observation inserts a visible callout; its exact technical JSON is now under **Captured inputs and provenance** instead of consuming an entire code panel and attracting a spurious B1 **Your code variations** action.
5. `lib/project-observation-display.ts` and `tests/project-observation-display.test.mjs` — narrowly recognize generated `observation-<32hex>-inputs` JSON parts without affecting user-authored code or ordinary saved Project material.

No Activity/Attempt workflow, new Project shell, mandatory checkpoints, B2 thread UI, new speech engine or backend schema was added. No MCP tool schema changed; plugin reinstall is not required.

## Focused verification

- `pnpm typecheck` — PASS.
- `node --test tests/project-observation-display.test.mjs tests/project-reading-topics.test.mjs tests/pr83-interactive.test.mjs tests/pr83-polish.test.mjs` — **11/11 PASS**.
- `pnpm build` — PASS (pre-existing Piper browser-polyfill and bundle-size warnings).
- Full historical `pnpm test` suite and exhaustive mobile campaign **not run**, as required by current fast-release instructions.

### Live Cloud Browser observations

- On V120, Japanese/Computing Projects devoted a tall opening band to the Project name, description, section label and topic strip. V121/V122 reduce that band by roughly 50–60 pixels in the checked desktop views; actual content begins visibly higher. Existing sidebar, section rail, Notes dock and rich language TTS controls remain.
- Japanese reading Project `test-language-japanese-pr85-20261105`: content, inline Play/Slow buttons and translation disclosure visible after reload. Audible synthesis on a user's own device was not remeasured in C2.
- Computing `test-simulation-playground-layouts-20261103`: rich paragraphs, callout, six-layout navigation and code remain readable after CSS changes.
- Technical Project `test-pr83-release-20261103`: idle Python Canvas now shows a useful prompt, not an oversized blank surface. Clicking Run loaded bundled Python and painted a **blue circle on a white canvas**; no simulated-success claim was made.
- Browser saved one explicitly synthetic observation to the technical Project; receipt appeared and the inserted callout survived reload. V121 revealed a large JSON code panel with unrelated **Add code variation**. V122 corrected both: metadata collapses and no code-variation action appears on the generated JSON. Source provenance remains inspectable on expansion.
- Native parameter explorer rendered its waveform with amplitude/frequency sliders after the upgrade.

## Remaining limits and next move

- The technical acceptance Project has only a packaged-game introduction, **not an admitted playable Pygbag asset**. The revised launcher is implemented and admission tests pass, but real game-start/restart/timeout behaviour was not browser-proven in this C2 run. Use an actual properly packaged fixture for the next focused acceptance.
- The long-standing tldraw persistence/fullscreen and device-specific Japanese audio are not claimed as newly verified.
- Browser checks were desktop-centred; a full small-screen interaction pass is still worthwhile, but this should not become a new historical acceptance programme.
- **Next small integration:** bring the Lab's `read_project_changes` MCP contract to native production independently, so GPT can retrieve bounded exact Project revision deltas. Follow it with selective removal of dormant Activity/Attempt source modules only after confirming retained source downloads still work.
- Longer-term: avoid crowding the content with new top-level dashboards or work-thread rails; keep learner-authored contributions separate from canonical Project material unless explicitly incorporated.
