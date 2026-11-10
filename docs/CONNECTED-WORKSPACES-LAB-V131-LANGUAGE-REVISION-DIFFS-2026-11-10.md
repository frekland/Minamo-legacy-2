# Visual Lab V131 — exact non-computing revision differences (10 November 2026)

## Scope and boundary

This was a cross-domain continuation of PR #99, following owner direction to retain Radio Island/Python work while testing the same continuity infrastructure with language, research and creative material. **Production V149 was not changed; PR #99 remains a draft and unmerged.** This slice used the existing synthetic, ten-revision Japanese Project, not a claimed history of ten learner sessions.

- Visual Lab: [Minamo Visual Lab](https://minamo-visual-lab.jscymru.chatgpt.site/)
- Lab source commit: `099b1a1360c2d244291e5f798a666a6812a9aa02`
- V131 deployment: `appgdep_6af3a1d10e8881919d69d5105faa811e` — **succeeded**
- Tested Project: `TEST-ONLY-a3-japanese-ten-sessions`, r10 → **r11**
- Exact Project r10: `r-71b0fdf038c8136dbd4c8c98a65489129d6f3ea028b13a9800e43f745fdc5c13`
- Exact Project r11: `r-4c346c11f3615e7d859b5be2597c91905f60721333a3a508caf633ea4684e48b`
- Related synthetic Library Article `Why the shop was already closed`, r2: `r-9055bf1d89d0cc58a954ab2aa6e47a4de1642197272a5441a7a472281fda9db5`

## Substantive continuation through installed Visual Lab MCP

The old dialogue turn replied `うん。着いたのが遅かったからね。` to `何も買えなかったの？` but translated the reply as `No. Because I arrived late.` The `うん` affirms the inability to buy anything, so the old English reply was confusing. A narrow `patchBlock` corrected the translation to **“That's right. I arrived too late.”** without changing the Japanese, the other turns, or historical r10.

A GPT-authored, expressly synthetic Note `minamo-lab-a3-sequence-and-response-20261110` explains (a) `Vてから` versus `Vたあとで` versus `Nのあとで`, (b) `閉まりました` event, `閉まっていました` observed state, and `閉めました` transitive action, (c) the literal translation correction. It is pinned to **exact r10** dialogue and grammar parts and cites the **exact r2** Library passage `s3/p7`. Project r11 now separately cites that Article edition. The Note names its GPT authorship, synthetic fixture status and limits; it does not attribute the change to learner experience, or assert independent Japanese speaker testing.

The installed connector's exact record reads confirmed: current Project r11 has the corrected translation and Article link; historical r10 retains the old translation; the Note retains both r10 pins. `get_minamo_working_context` shows the source link as `exact-edition`, the Note as an inbound saved r10 link, and the Note's authored text as bounded evidence. This was not a fabricated semantic supersession.

## Implemented V131 improvement

During Cloud Browser UX inspection, Saved editions called the r11 revision only **“Revised Interactive · Dialogue · 6 turns.”** It did not show *what* had changed. Opening the current part required navigating to a long conversation and revealing turns. A new conversation could infer that a dialogue changed, but would still need manual comparison to identify the actual correction.

V131 adds bounded, **source-literal before/after values** to the existing `read_project_changes` server contract and Saved editions UI. It does not introduce metadata records or an Activity system:

- Language dialogues: compare saved turn identities and show changed original text/translation, such as `Turn 4 · translation`.
- Language reveals and flashcards: compare exact textual fields by saved identity.
- Tables: compare changed cells, showing row and header, plus captions.
- Paragraphs, prose, code and other ordinary text parts: compare old/new canonical text.
- Maximum three changed fields per revised part, each bounded to a short literal preview; additions/removals remain distinct. If a field cannot be compared structurally, no imagined explanation is returned.
- Exact revisions, owner isolation, authorization, synthetic provenance and original Work-link matching remain unchanged.

The **actual installed MCP after deployment**, with no plugin reinstall, returned r11:
`Turn 4 · translation | before: No. Because I arrived late. | after: That's right. I arrived too late.`
It also returned a literal prose change for synthetic r10. Cloud Browser at deployed V131 displayed the same before/after text in a compact inset beneath revision 11, with the synthetic provenance notice.

## Verification

- Focused saved-edition route tests: **7/7 passed**; new test covers dialogue, prose, table cell, addition, false Work-link avoidance, and cross-owner denial.
- `npm run typecheck`: passed.
- `npm run build`: passed. Existing Vite/Piper externalization and chunk-size warnings persisted, but build completed.
- Deployed V131: status **succeeded**, owner-private custom audience verified as the owner only.
- Actual installed Lab MCP: saved authoring, exact current/historical readback, source relationship, inbound Note evidence, and exact before/after revision comparison verified.
- Cloud Browser: Saved editions, Project Connections, Note body and article r2 navigation verified. A1-style charcoal/cyan visual direction preserved.
- Full historical regression suite **not** run; no server MCP input schemas changed and no reinstall required.

## Findings and limitations

**Successful:** The same canonical revision, Note and Library mechanisms can preserve a substantive language-content correction without Python, executed code, manual Work-thread authoring or invented tutoring sessions. The current working-context read discovers the explicit r10 Note and r2 Article citation. Literal revision comparisons are materially more useful to both GPT and a human.

**Incomplete:** The ten “sessions” were generated synthetic editions saved within seconds; they do not demonstrate natural longitudinal language practice. The new Note is an authored analysis, not independent linguistic validation. No reading proves a learner performed a task. Deep comprehension still requires `read_minamo_record` and `read_project_changes` rather than relying only on the short working-context preview.

**UI issues found:** The exact linked Article opens correctly at r2, and its cited `s3/p7` exists, but Cloud Browser landed near the article introduction instead of reliably scrolling to the cited paragraph. Long Notes have a narrow text column and tall headings; a long language Project repeats many interactive reveals/dialogues and local contribution controls. Furigana spacing still deserves polish. The Browser return path worked. These are navigation/presentation issues rather than claims that retained references are missing.

**Next:** Fix reliable deep-link landing to exact cited Library/Project parts, then test whether it remains correct after asynchronous content load and across current/old editions. Continue with independent long-form scientific/creative material (images, diagrams and revised explanations); measure whether fresh-chat orientation retrieves the most relevant corrections without excessive metadata. Preserve the already deployed Python package functionality. Finally reconcile the public PR source with the separate private Site source before discussing production migration.

The public PR branch still documents architecture and reports; it is **not** a byte-for-byte source mirror of the privately deployed Lab Site.
