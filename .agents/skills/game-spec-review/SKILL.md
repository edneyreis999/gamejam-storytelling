---
name: game-spec-review
description: Review a saved game spec (draft or approved) on request through parallel independent lens reviewers, then incorporate only the findings the user selects. Not an approval gate; does not run automatically, loop rounds, review code, or implement.
---

# Game Spec Review

Run only when the user asks for a review of a saved spec package under `planos/tasks/<slug>/`. Each lens runs in its own fresh reviewer with no conversation history, so the review does not inherit the author's framing. Assessment, incorporation, approval, and implementation stay separate: the review writes one file per round, and only the findings the user selects change the spec.

| Lens | Asks | Brief |
| --- | --- | --- |
| Capability and custom code | Is every promised behavior delivered by verified capability, and is any new project-owned responsibility the user's informed choice? | [lens-capability](references/lens-capability.md) |
| Shared patterns | Does the spec change how similar components already do something, and did the user choose how to treat the difference? | [lens-shared-patterns](references/lens-shared-patterns.md) |
| Scope and acceptance | Does the spec deliver what the user decided, no more and no less, with acceptance that can be observed? | [lens-scope-acceptance](references/lens-scope-acceptance.md) |
| Verification | Is the verification proportional to the changed risk, and can every check actually run? | [lens-verification](references/lens-verification.md) |
| Lifecycle and authoring | Are the lifecycle outcomes the change touches decided, and can the designer really author the content where the spec says? | [lens-lifecycle-authoring](references/lens-lifecycle-authoring.md) |

## Procedure

1. **Resolve the input.** Use the path the user gave, or the most recently modified `planos/tasks/<slug>/_spec.md`. Note its `status`. The round number is one more than the highest existing `review-NN.md` in the package, starting at `01`.
2. **Select lenses.** Round 1 runs all five. A later round runs the lenses that had findings in the previous round plus those whose inputs the incorporation changed; the user may ask for all five.
3. **Dispatch.** Start one fresh reviewer per selected lens, all in parallel. Each prompt contains the full text of [the reviewer brief](references/reviewer-brief.md), the full text of the lens brief, and the inputs:
   - the spec package files and any earlier `review-NN.md`;
   - project instructions, the GDD, decision records, and the files listed in the spec's File References;
   - in a later round: that lens's previous findings, the previous round's Incorporation section, and the files it changed.

   Use the runtime's default model unless the user named one; never substitute another. Each reviewer returns its lens report. If the runtime cannot start subagents, run each lens yourself in sequence from the same prompts and record the reviewer as `inline (not independent)`.
4. **Consolidate.** Check every returned finding against the files it cites.
   - Merge duplicates into one finding that lists every originating lens.
   - Reject a finding whose evidence does not hold, that expresses only a preference, or that adds an obligation without naming the risk it covers. List each one under Rejected with its lens and a one-line reason; never drop a finding silently.
   - Order blockers before nits and number them `F-NNN`, continuing the sequence of earlier rounds.
   - Set the verdict: `READY` when no blocker remains; `NEEDS_CHANGES` when the blockers can be fixed by amending sections; `REWORK` when the premise fails (the Motivating Problem is not delivered end to end, several increments are packed together, or the scope broadly contradicts the user's decisions).

   Write `review-NN.md` from [the review template](references/review-template.md). Never overwrite an earlier round.
5. **Present.** Summarize the verdict, blocker and nit counts, main themes, and the file path. Do not edit the spec yet.
6. **Incorporate.** Ask which findings to incorporate: all blockers, selected findings, none, or manual edits first. Apply only the selection, through the `game-create-specs` update procedure: edit a draft directly; give an approved spec a dated Amendment citing `review-NN F-NNN`. When a correction is a user choice, such as keeping a supported behavior or exploring custom code, put that choice to the user before editing. Append the Incorporation section to `review-NN.md`: findings incorporated, findings deferred with their reason, and files changed.
7. **Offer another round.** Run it only if the user asks.

## User Decisions

Ask the incorporation and next-round questions with the runtime's interactive question tool. Without one, end the message with the question and stop; never answer it on the user's behalf.

## Rules

- Reviewers are read-only. The orchestrator writes only `review-NN.md` and the incorporations the user selected.
- The review never commits, pushes, implements, plans tasks, or changes `status`.
- A review is optional evidence for the user, not a prerequisite for approval, task planning, or delivery.
