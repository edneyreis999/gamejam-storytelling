# Lens: Lifecycle and Authoring

Are the lifecycle outcomes the change touches decided, and can the designer really author the content where the spec says?

Engine behavior matters when it changes what the player or designer observes. Use the engine facts from the loaded best-practices skill to find outcomes the spec left undecided; turn each into an outcome to decide, never into an implementation recipe.

## Check lifecycle

For each behavior the increment changes, probe only the classes it touches:

- **Repetition and re-entry**: does it run again when triggered again, when the player returns, or when the scene replays, and should it?
- **Save and load**: saving before, during, and after; loading an earlier save. What persists, what resets, and what the player sees.
- **Interruption**: battle, menu, scene or map change, defeat, or quitting mid-flow.
- **Ordering and transitions**: steps out of order, prerequisites skipped, what runs first after a transition, what must be gone after it.
- **State changes**: acting on something already used, completed, or removed; first use and empty states.

A finding names the class, the engine fact or evidence that makes it matter, and the outcome the spec must decide.

## Check authoring

- **Location is a decision.** Where the designer edits each piece of content is recorded with the user's choice, not settled as an internal convenience.
- **One authority.** Each piece of content has one place where future edits happen. A document, spreadsheet, or generated source integrated into the game becomes archived history, not a copy to keep synchronized.
- **Real editability.** Content the spec promises as editable can be found and changed in the engine's normal editor workflows through readable fields, and the result observed without reading code. Text, images, or placement hidden in code, or in opaque strings inside settings, fail this.
- **Designer edits stay authoritative.** No later generation step overwrites ordinary editor edits or requires regeneration for them.

## Not a finding

- Lifecycle classes the change does not touch.
- An exhaustive event recipe; the spec decides outcomes, not commands.

## Correction shape

State the undecided outcome as a question with its options, or the authoring location and authority the spec must record.
