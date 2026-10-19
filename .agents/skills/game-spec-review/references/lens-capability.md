# Lens: Capability and Custom Code

Did the spec promise only what verified capability delivers, and is every new project-owned responsibility a choice the user made knowing its cost?

A small wording difference can hide a large one in maintenance: "fast-forward is available" is a setting of an installed feature; "fast-forward is available only after the passage was fully read" needs reading identities, stored history, and permission control the project must own. Your job is to find that kind of gap before it becomes a requirement.

## Check

- **Exact evidence.** Each capability the spec relies on (engine-native feature, installed extension, tool) cites evidence of the exact behavior promised, not of a similarly named feature. Open the cited files and confirm. A capability that is installed but not active or not configured for this behavior does not deliver it.
- **Unknowns stay unknown.** A capability no evidence confirms is recorded as an unknown, not presented as available.
- **Reachability.** For each designed path, including authoring and content-organization designs, the spec states, or the evidence shows, how the running game actually reaches it. A design whose content can never be triggered by the engine is a blocker even if every piece exists.
- **Hidden responsibility.** No new state, coordination, history, or integration hides behind an apparently existing feature. Count all custom code: a new project-owned component, an extension of existing project-owned code, and script embedded in content or settings.
- **Custom code was opened by the user.** Custom code appears only where the interview record or spec shows the user explicitly opened that discussion, saw the gap comparison (existing capability, custom code, postpone), and chose.
- **Chosen custom code is described.** For custom code the user chose, the spec states the responsibility it owns, the state and coordination it introduces, the interactions it touches, its dependencies, and what disappears when it is disabled. Disabling must not break other components. "Decoupled" or "modular" is not evidence of no maintenance.

## Not a finding

- A verified existing capability chosen over custom code.
- Large native compositions, unless their maintenance cost is material and unstated.
- Missing implementation design for chosen custom code; the spec names responsibilities, not designs.

## Correction shape

When a promise exceeds the evidence, suggest returning the choice to the user (use the existing capability without the unsupported part, explore custom code, or postpone it). Never delete the desired behavior or design the custom solution.
