# Lens: Scope and Acceptance

Does the spec deliver what the user decided, no more and no less, with acceptance anyone can observe by playing or authoring the game?

## Check

- **Fidelity to decisions.** Compare the spec with the user's recorded decisions: interview notes, approval words, Amendments, prior specs, and decision records. Nothing the user wanted is silently missing or narrowed; nothing the user did not ask for was added.
- **Assumptions as agreement.** No assistant assumption or default is presented as a user decision. Assumptions and defaults are listed as such.
- **One increment.** The spec covers one deliverable increment. Several distinct product problems packed together, where a sequence of specs was due, is a premise problem.
- **Motivating Problem delivered.** The first playable outcome solves the Motivating Problem end to end; narrowing it carries the user's recorded decision.
- **Decisions disguised as facts.** Exclusions, unavailable dependencies (hardware, people, environments), and material shipped only because another delivered component depends on it are presented as user decisions with their consequence, not as prerequisites or disclaimers.
- **Observable acceptance.** Every acceptance criterion names a starting state, an action, and a result that can be marked true or false. Every edge case states its condition and expected behavior.
- **Coverage.** Every `US-NNN.AC-N` and `US-NNN.EC-N` has an owner in the verification companions or a one-line reason none is needed; IDs referenced across files exist.
- **Silent authority.** Where the spec relies on a decision record or prior spec, check whether that authority actually covers the point; a gap it is silent on is not settled by citing it.
- **Open questions.** Unresolved decisions appear in Open Questions; none is answered implicitly elsewhere in the spec.

## Not a finding

- A scope choice the user recorded, even one you would make differently.
- Missing implementation detail.
- An empty optional section that does not apply.

## Correction shape

Point to the decision and the passage that disagree, and suggest the edit or the user choice that restores fidelity.
