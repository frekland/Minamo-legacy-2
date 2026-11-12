# PR #99 — V161–V165 acceptance and continuation record
_Date: 12 November 2026_

## State and owner decisions

- Owner-private Lab: **V165**, https://minamo-visual-lab.jscymru.chatgpt.site/
- Exact deployed private source: `f0c314a0004ff1c42101431134a8d2d19117870e`; remote main and local checkout agree; checkout clean.
- Successful deployment: `appgdep_6af56150fb908191aab2143478caf754`, with MCP.
- Production: **V149 unchanged**. No production operation was performed.
- PR #99 remains draft/open/unmerged.
- **Public/private source reconciliation remains owner-deferred**, until substantive Lab work and the owner's assessment. This report is documentation, not implementation reconciliation.
- **Tldraw is owner-deferred/non-blocking** because the working licence is production-only. Saved drawing data remains preserved; the Lab's licence failure is explicit.
- This session advanced substantial Lab functionality. **It does not claim full acceptance or completion of every original objective.**

## Independent starting evidence

Read the PR's V160 status, fresh-conversation MCP report and subsequent three visual review comments. Inspected actual private source c143716f631f3ae4d94d3c72810d5fd75103d9fb, current installed MCP and live browser; did not use prior chat as proof.

Independently reproduced the default ten-investigation ball Canvas error at JSON position 19986, the 0.78/0.8 range-value discrepancy, unrelated Radio/Cherwell evidence in a standalone framing Note's working context, and the packaged game's white frame. The prior fresh-conversation report remains evidence of a genuinely separate conversation's save/CAS/pagination exercise; it is not a new independent post-V165 pass.

## Deployment ledger

| Lab | Private source | Main changes |
| --- | --- | --- |
| V161 | a3397120b52a12b7f222daebe55ddf2d9b49017b | Structured bounded Canvas transport; Note/Question/Library excerpts; compact Home and Project presentation; relevant standalone selected context |
| V162 | 400e23db49a9aad4274f52b230c063b41573ad49 | Connections sheet; exact source receipts on demand; Question return/focus; last-opened section hint; global discovery order |
| V163 | a934bd98dbb9c5668ea16972703a98140bb76a6a | Japanese speech placement and card controls; practical Settings explanations; calm search title matches |
| V164 | 16285c6e82b22e318acc383d2367bac5e6f664d2 | Notes dock Read/Write; game startup diagnostics/deadline and preserved sandbox/integrity controls |
| V165 | f0c314a0004ff1c42101431134a8d2d19117870e | Verified upstream game loader fingerprint; readable collapsed Note title; truthful initial Your Work count |

Implementation notes are committed in the private source under docs/CONNECTED-WORKSPACES-LAB-{READING-CANVAS-CONTEXT,READING-CONTINUITY,LANGUAGE-SETTINGS,NOTES-GAME-STARTUP,GAME-INTEGRITY}-2026-11-12.md.

## Implemented behaviour and direct acceptance

**Relationships and fresh context.** Retained the shared rights/edition-aware relationship projection rather than introducing another store. A standalone selected framing Note now returns its four saved relationships and revision history without unrelated workspace-wide evidence. Blank reads still discover independent work; focused Project/Question reads keep their evidence. Incompatible global evidence cursors are rejected for standalone selection. Current Japanese r13 working context independently discovers its Note and accurately reports both citations as Project r10. No source edition was silently upgraded.

**Reading and navigation.** Rich Radio Island Notes use bounded collapsed prose; expanded reading still includes exact terminal output and provenance. Cherwell Questions use concise source excerpts and expand full tables/code/interactive material on demand. Open section followed by Return to question restored the same Question, source row position and button focus. Connections opens a bounded native sheet, retains exact edition/direction/location/reason receipts under disclosures, closes with Escape and returns focus to its trigger. Reopening Cherwell offered its actually last opened notebook section; Return selected it. These are navigation hints, scoped to owner/generation and exact rendition, not progress or understanding claims.

**Home, discovery and Library.** Reduced decorative masthead/cover space; all-Projects remains visible. Project list selection is clearer, descriptions remain in list mode, scope has a visible label, and unknown first counts no longer imply zero. Framing search put actual title-matching Notes/Question/Project before body-only computing matches and the separate Library section. Ranking is literal and only within loaded saved-work results; pagination is still bounded. Long Library preview introductions now contain source excerpts rather than only opening instructions; not every long-source/rights combination was live-tested.

**Notes dock.** Existing Notes have explicit Read/Write modes; new Notes start in Write. Reading uses the shared Markdown/table/image/terminal rendering. The writing editor and draft memory are retained. The framing decision Note's four-column table rendered in Read, switched to Write and returned to Read. MCP readback confirmed r2, body, links and rendition unchanged. The collapsed title was measured as flex-centred with its beginning clipped; V165 measured block/left-aligned and retained the complete accessible/tooltip title. A raw Markdown table remains possible in the writing/source interface; Read is the formatted view.

**Japanese.** Synthetic Project changed r11 → r12 → r13. All 46 parts remain, organised into current retelling/conversation/practice/mixed cards and adjacent earlier-comparison topics, retaining six main sections. Repetitive instructions now accurately describe visible Japanese and optional translations/explanations. The current mixed six-card set revealed an answer and moved to card 2; reverse/shuffle/reset were available under Card options. Source pronunciation controls are adjacent when space permits; measured Japanese source 17px and furigana 12.24px. Slow Japanese synthesis produced a ready 12.747755-second audio result without audio-element error. Audible quality was not assessed. The original independent Note is still r1, with both exact r10 pins readable. An intentionally stale r11 update was rejected with revision_conflict.

**Permissions/personalisation.** Independently read original durable preferences at revision 10. Through website Settings, temporarily enabled global MCP read-only; a cached saving call returned mcp_read_only. Restored authoring, enabled Project preview-only, read the exact effective settings, and a current-r13 save returned project_preview_only. Neither negative test saved a Project revision. Website restoration succeeded. All six original values were independently read back at global revision 14: balanced / saved / requested / balanced / direct / authoring. No reinstall was required; visible client catalogues may still be cached. Permission, owner, revoked-edition and uncertain-operation contracts also have focused automated evidence; this was not a live two-account audit.

**Python Canvas.** Moved drawing data out of truncated stdout to a separate 1 MiB-bounded payload. Ordinary console bounds, opaque/no-network runtime, time budget and 120-frame/600-command validation remain. Oversized/invalid drawing data fail closed. Real bundled Python tests retained drawing JSON larger than 39,000 characters despite truncated stdout. Live untouched ball model rendered at gravity 350 / bounce 0.78; accessible and displayed values agree. Off-grid authored defaults use continuous range input; aligned definitions retain their authored step.

**Images and packaged game.** The existing private image rendered. The game's uploaded bytes and SHA-256 remain unchanged in the artefact continuity Project r6. V164 surfaced the formerly silent loader rejection. Investigation verified upstream pygame-web/archives blob 16084cc83602fe61d31b5958892b3757a2a9712a and SHA-256 e11be94dd16c29ccbb0387735df5888e0050766b2c58eae636911259e915765f, differing from the old configured fingerprint. V165 pins the verified bytes; it does not remove SRI, broaden runtime origins or weaken the opaque sandbox. The game then rendered its cyan/yellow screen and Clicks: 0. **Subsequent iframe interaction and screenshot calls hit CDP deadlines; click response/restart/current Stop are unverified.** An earlier five-minute runtime budget did remove the frame. Closed the game tab and recovered Home in a fresh tab. The timeout's cause is not established: do not call it a proven game freeze, a browser-service fault or a fully accepted game. External runtime/transitive dependency availability remains a limitation.

## Focused validation

| Slice | Passing focused checks |
| --- | --- |
| V161 | 15/15: working-context-read, canvas-transport, record-display, project-work-threads-c4 |
| V162 | 17/17: project-connections, global-search-history, search-ranking, search-sheet, project-reading-topics, project-work-threads-c4 |
| V163 | 22/22: settings-help-redesign/navigation, practice-reader-language, japanese-furigana, collaboration-preferences |
| V164 | 43/43: notes-writing, note-rich-writing, multi-layout-notes, note-editor-load-retry, pygbag-diagnostics, pr83-interactive |
| V165 | 7/7 package/admission/diagnostics plus 1/1 streamed Your Work/Trash loading |

These batches overlap; no unique-test aggregate or full-suite pass is claimed. Typecheck and build passed for each deployed slice. Selectively repaired two relevant stale expectations: superseded navigation layout, and Attempts & runs now Runs & output. The separately documented eight old Home/Continue assertions were not run or repaired. No remaining failure in these final focused batches.

## Feature assessment against the original objectives

| Objective | Assessment | Practical limit |
| --- | --- | --- |
| Coherent saved relationships, exact editions, provenance | Completed and adequately verified for sampled core paths | Bounded pages; not every owner/revocation/fan-out shape live-audited |
| Independent Notes/Questions and cross-subject discovery | Completed and adequately verified for sampled paths | No inferred relation from co-selection/title similarity |
| Fresh GPT retrieval and protected authoring | Completed for implemented core contracts | Separate-conversation post-V165 contribution/readback still outstanding |
| Source authority and uncertain conclusions | Implemented and sampled | Saved actor/channel is not proof of human authorship or external observation |
| Durable MCP settings and cached-call enforcement | Completed and live-verified for two distinct restrictions | Per-Project overrides and all setting combinations mainly automated |
| Home/Projects/Questions/Your Work/Notes reading | Substantially improved and browser-verified | Further visual consistency, long-history labels and full keyboard audit remain |
| Japanese current path, furigana, cards, TTS | Implemented and sampled | Audible quality, all dialogues/cards and actual phone widths not accepted |
| Python Canvas | Implemented and positive/negative tests passed; live default passed | Not every authored definition exercised |
| Retained packaged games | Partially complete acceptance | First paint passed; interaction/control deadlines remain unresolved |
| Private images | Existing retained image rendered | New upload/revoke/restore cycle mainly prior/automated evidence |
| Mobile-width product experience | Implemented but insufficiently tested | This Cloud Browser exposed no supported viewport-resize control; no new actual mobile-width pass |
| Recovery, changed rights, uncertain saves | Implemented with focused/prior evidence | No destructive restore activation or live cross-owner session in this run |
| Tldraw | Owner-deferred, non-blocking | Working licence only in production |
| Work dashboards/checkpoints/handoff records | Superseded/not desirable | No new mandatory workflow introduced |
| Public/private reconciliation; production integration | Explicitly deferred integration gates | Not a next development task until owner authorises |

No new relationship persistence mechanism was added. Main complexity costs are the existing dual Project/Question read presentations, bounded projection/cursor contracts, and browser runtime diagnostics. They should continue to share exact source identities; avoid parallel link stores or speculative continuity narratives.

## Production/Lab parity and readiness

Production remains pinned to V149; none of V150–V165 was deployed there by this session. New private implementation has not been copied into public PR code. Tldraw's production-only licence is a deliberate asymmetry. A fresh feature-by-feature production audit was not performed, so version pins and this deployment boundary are the exact verified parity statement.

**The Lab is ready for broader owner hands-on assessment of the core continuity and reading experience, with the explicit limits above. It is not fully accepted, production-ready or ready to merge.** The main outstanding product acceptance risk is packaged-game interaction; actual mobile width, broader recovery/failure paths and a new independent-conversation post-V165 contribution remain unverified.

## Ordered continuation

1. Investigate the packaged game's post-first-paint CDP timeouts. Retained example: TEST-ONLY-b21-interactive-continuity-20261108 r6, assets/interactive-49e771a5-2208-4ad3-b5f2-99c6653ee5c4. Test input counter, Stop, restart and responsiveness without treating a canvas-exists message as execution proof. Preserve its original bytes and integrity/isolation.
2. Obtain a supported actual mobile-width surface; exercise Home, Project/topic switching, Connections, Notes dock, tables, Japanese and Settings. Desktop screenshots are not mobile evidence.
3. Broaden long-history labels/return paths, Library preview/citations, keyboard/focus/contrast, recovery and changed-rights/uncertain-save cases. Distinguish focused fixtures from live multi-account evidence.
4. Have a genuinely new conversation discover work by name, reconstruct exact changes, contribute under current permissions/CAS and retrieve it again. Prior independent V160 evidence remains useful but does not establish this for every new UI path.
5. Reassess readiness and update this PR. Keep draft/unmerged and production unchanged. **Do not reconcile private/public source or pursue tldraw licensing as the next task without a changed owner decision.**
