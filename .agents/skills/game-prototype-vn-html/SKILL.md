---
name: game-prototype-vn-html
description: >-
  Visual novel HTML prototypes: use when creating or evolving a playable local
  narrative prototype, staging dialogue for later engine migration, or deriving
  an illustration inventory from branching scenes. Do not use for engine-only
  ports, standalone story drafts, or ordinary websites without narrative playback.
---
# Game prototype VN HTML

## 1. Establish the production contract

Read the repository instructions and game vision, then the character index and its required readings before drafting dialogue. Identify approved facts, experimental scenes, game rules and unresolved decisions. Inspect the existing prototype before selecting its replacement or a separate version.

Confirm consequential ambiguities with the author. Fix the presentation resources, target stage dimensions, save compatibility and whether artwork production is included. Read `references/presentation.md` in full when defining or changing presentation. Consult `ui-craft` for visible surfaces.

**Done when:** the contract identifies the campaign covered, visual resources, sources of authority and unresolved decisions without silently promoting proposals to canon.

## 2. Author explicit passages

Give scenes, passages and choices stable identifiers. Separate description, dialogue, thought, visual action and choice. Store speaker, expression/pose, temporal frame and asset references explicitly; resolve conditional content from game state. Keep instructions for the illustrator out of player dialogue.

Adapt prose to the available medium. Let characters discover and disagree through conversation, retain essential descriptions and private thoughts, and ensure the text communicates essential information without requiring an undrawn facial expression. Preserve the speaker's knowledge and voice.

**Done when:** every player-facing narrative passage has a type and author; every choice and conditional response has a traceable destination and effect.

## 3. Implement reading and game state

Use a local HTML entrypoint and simple scripts unless the repository requires another stack. Keep narrative content, presentation and validated game actions separate. Support mouse/touch and keyboard, immediate readable text, explicit choices, save/restore and useful storage/import errors. Treat visual advances as reading position, not repeated rewards. Document save-format compatibility.

Keep editorial previews separate from live state and storage. Support replacing a provisional image through its asset record rather than editing scene logic. Use identified representations for artwork not commissioned in this delivery.

**Done when:** all authorized campaign routes can be played; restore preserves decisions and reading position; previews cannot mutate a player's campaign.

## 4. Derive the production inventory

Read `references/art-inventory.md` in full before adding assets or an art browser. Use the same references for rendering and inventory. Enumerate written alternatives, including optional encounters, changing speakers and outcomes. Count unique drawings, base poses, variants and repeated uses separately.

**Done when:** every requested image has a brief and scene uses; every scene reference resolves; unused proposals are visibly separate from the required count.

## 5. Review voices and continuity

Apply `humanizer` to dialogue, thoughts and narrative descriptions, preserving character-specific rhythm, humor and formality. Read each participant's character sheet and scene context before editing. Read `references/editorial-review.md` in full when assigning or performing this review.

Use a second editorial agent when the user or applicable instructions authorize delegation; otherwise perform the same review directly. Give the reviewer isolated file ownership or a separate proposal artifact. Integrate accepted changes, then recheck affected scenes and their visual requirements. Record coverage of all scenes and variants, not just a sample. Resolve source contradictions with the author rather than inventing facts.

**Done when:** all narrative content is accounted for in the review, changes preserve consequences, and remaining ambiguities are explicit. Editorial quality is not proof of human authorship.

## 6. Validate and deliver

Protect progression, one-time effects, reading position, random outcomes and inventory completeness with behavioral tests. Inspect the actual browser presentation, narrow screens, keyboard focus, overlays and reduced motion. Do not substitute source inspection for a visual check. Use `deslop` before declaring coding complete.

Document launch instructions, art replacement, source authority, known limitations and factual verification evidence. Report unverified behavior honestly. Keep documentation in the project's authorized location and status.

**Done when:** required checks pass, the campaign and inventory are accessible, and the author can review the result without reconstructing the implementation history.
