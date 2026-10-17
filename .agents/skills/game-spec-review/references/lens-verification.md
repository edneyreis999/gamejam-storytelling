# Lens: Verification

Is the verification proportional to the risk this increment changes, and can every planned check actually run?

Reviews tend to ask for more checks. Excessive verification is a defect too: it blocks delivery, consumes sessions, and hides the checks that matter. Weigh both directions.

## Check

- **Proportional.** Each changed behavior gets the cheapest check that can observe it; heavy environments are covered by representative journeys. Flag heavy runs disproportionate to the changed risk (every variant, every leaf, every combination; a costly dimension the change does not touch) and propose the lighter alternative with its residual risk.
- **Executable.** Every check can run with the hardware, tools, people, and environments the project has. A check that depends on something unavailable is a decision for the user (exclude it with its consequence, or obtain the dependency), not an execution prerequisite.
- **Environments.** Each environment players or authors use for this deliverable (for example the editor's test mode and the exported game) has at least one real check there, or an entry under Not Verified Here stating what stays unverified.
- **Real consumer.** When the change alters data an external consumer reads (the editor, an import tool), that consumer is the check. A check that asserts the spec's own chosen representation is no evidence the consumer accepts it. Ask: which real consumer can still fail when the data is valid and the checks pass?
- **Lifetime.** A check against imported or one-time content is acceptance evidence for this increment, not a permanent fixture, unless its expected value stays valid after future approved changes.
- **Functional versus experiential.** A passing functional check (`PT`, `V`) is never treated as evidence that an experience hypothesis (`PH`) holds.
- **User's proportionality decisions.** The plan honors the user's latest proportionality decision on a comparable change, and any project verification policy applies unambiguously; where it is ambiguous, the choice was put to the user.

## Not a finding

- A light plan whose residual risk is stated and accepted.
- The absence of checks for behavior the increment does not change.
- Check names or suites; the spec names observations, not how tests are coded.

## Correction shape

For excess, propose the reduction and its residual risk. For a gap, name the distinct risk and the cheapest check that observes it.
