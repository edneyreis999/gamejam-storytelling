# Repository Guidelines

## Project Structure & Module Organization

This repository is the starting point for a Ctrl+AI+Jam Week 02 game with the theme **STORYTELLING**. It currently contains only `README.md` (jam context) and `LICENSE` (MIT). There are no source, test, or asset directories yet; the jam limitation is still listed as `???`.

When adding the first implementation, establish clear locations for game logic, narrative content, assets, and tests. Document the chosen engine, directory layout, and entry point in `README.md`. Keep generated exports and dependency caches out of version control.

## Build, Test, and Development Commands

No build system, dependency manifest, or runnable game is currently configured. There are no supported build, development, or test commands yet.

When introducing tooling, add exact installation, local launch, build, and test commands to `README.md`, including required engine or runtime versions. Verify those instructions from a fresh checkout. Do not assume commands such as `npm test` apply before the corresponding tooling exists.

## Coding Style & Naming Conventions

No language, indentation standard, formatter, or linter has been established. Follow the selected language or engine’s conventions when implementation begins, and commit shared formatting configuration alongside the code.

Use descriptive names for scenes, story branches, and assets. Keep naming and indentation consistent within each file. Keep Markdown instructions concise and use fenced code blocks for runnable examples.

## Testing Guidelines

There is no test framework or coverage requirement yet. For documentation changes, check links, paths, and command accuracy. For gameplay changes, provide reproducible manual verification steps and expected results, including affected story choices and transitions.

When automated tests are introduced, document their location, naming convention, and execution command. Add regression checks for fixed behavior where practical.

## Commit & Pull Request Guidelines

Existing commits use short descriptive subjects, primarily in Portuguese, such as `Adiciona README inicial da game jam`. Follow that direct, action-oriented style; no Conventional Commits format is established.

Keep commits focused. Pull requests should describe the change, its purpose, and verification performed. Link relevant issues when available, and include screenshots or short recordings for visible gameplay or UI changes. Update setup documentation whenever dependencies or commands change.
