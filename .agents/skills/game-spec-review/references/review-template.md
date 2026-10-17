# Review Template

Structure for `planos/tasks/<slug>/review-NN.md`, one file per round. Findings keep their `F-NNN` IDs across rounds; never renumber or reuse them.

```markdown
---
round: NN
verdict: READY            # READY | NEEDS_CHANGES | REWORK
spec_status: draft        # status of _spec.md when reviewed
lenses: [capability, shared-patterns, scope-acceptance, verification, lifecycle-authoring]
reviewer: subagent        # subagent | inline (not independent); model if the user named one
reviewed_on: YYYY-MM-DD
revision: <git revision, or "uncommitted">
---

# Spec Review — Round NN

## Summary

Two or three sentences: the verdict and the main themes.

## Blockers

None. — or one entry per blocker:

### F-001 — <title>

- Lenses: <originating lenses>
- Section: <spec file and section>
- Evidence: <what the cited files show>
- Consequence: <impact on player, designer, or delivery>
- Scenario: <the concrete situation that exposes it>
- Suggested correction: <the change, or the user choice to put back>

## Nits

None. — or entries in the same format.

## Previous Findings

Later rounds only: each earlier `F-NNN` with resolved | open and the reason.

## Lens Coverage

| Lens | Verdict | Read |
| ---- | ------- | ---- |
| <lens> | Clear / Findings / unchanged since round N | <main files read> |

## Rejected

None. — or one line per rejected finding: lens, title, reason.

## Inputs Read

Files read across lenses, and any limitation reported.

## Incorporation

Added after the user's decision: incorporated findings and where (direct edit or Amendment date), deferred findings with reason, files changed.
```
