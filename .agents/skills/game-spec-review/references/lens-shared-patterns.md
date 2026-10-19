# Lens: Shared Patterns

Does the spec add to or alter how similar components already do something, and did the user choose how to treat that difference before committing?

A locally useful capability can create a second way of doing the same thing. Giving one new component an option the earlier ones lack leaves the project with uneven behavior, different instructions, and later work to make it uniform. Your job is to make that visible; the decision stays with the user.

## Check

- **Find the nearest siblings yourself.** For each component, content, or workflow the spec adds or changes, inspect the closest existing members of its family in the project (how they are configured, authored, organized, named, tooled, and verified). Do not audit the whole project.
- **Unrecognized change.** The spec changes a shared convention, or creates the first member of a family later components will likely repeat, without its Shared Pattern Changes section saying so.
- **Recorded choice.** Every recognized change records the current convention and its evidence (or "first of its family"), the proposed difference, the components that would differ, required versus optional uniformity work, and the user's choice: preserve the pattern, a deliberate local exception, or a new shared pattern.
- **Uniformity follow-up.** When the user deferred uniformity work, Known Issues to Record lists one issue per coherent gap with its affected components.
- **Unjustified divergence.** A component diverges from its siblings with a reason that an existing mechanism already covers (for example, a special external dependency to protect something the packaging already excludes).
- **Disguised decisions.** A divergence is framed as an operational prerequisite, an internal detail, or an environment fact instead of a choice.
- **No silent expansion.** The spec does not extend work to sibling components unless the user chose "uniformity now".

## Not a finding

- A resource-specific difference that changes no shared expectation.
- A deliberate exception or follow-up the user recorded.
- Absence of a pattern section when nothing shared changes.

## Correction shape

Name the convention, the difference, and the affected siblings, and suggest returning the choice (preserve, exception, or new pattern; uniformity now or follow-up) to the user. Never choose it.
