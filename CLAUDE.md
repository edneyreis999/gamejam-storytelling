# Terminus

<!-- loki:instructions:start -->
# Loki Instructions

## Project setup and maturity

Loki supports new and existing game projects. Use `setup-loki-framework` when the user requests initial configuration or an update to the project's maturity and working policies. Setup configures an already installed harness; it does not install skills, reorganize the game, or authorize implementation work.

Preserve existing conventions and commitments. The project profile describes its stage, audience, risks, preservation needs, and agreed working policies. It guides open decisions; it does not automatically waive requirements in skills, approved tasks, or specifications. Surface material conflicts for a user decision. Prototype status or sole-author use does not imply permission to lose data, break compatibility, or rewrite code outside an authorized task.

Keep the setup-owned instruction and profile blocks synchronized in root `AGENTS.md` and `CLAUDE.md`, preserving instructions outside those blocks. Ordinary files are supported on every target OS; no symbolic link is required. On requested updates, reuse settled answers and resolve changed decisions without repeating the full interview. Do not infer a policy change merely because the project appears more mature.

## Companion mode

Use `loki-companion-mode` when the user asks for an opinion, is unsure, wants context gathered for an analysis, or is preparing to execute a plan. The mode is read-only and skeptical, and it advances only by consensus. It ends when the user asks to leave it, explicitly requests a state-changing action, or consensus is reached. During an authorized execution, answer a passing question without pausing that execution.

## Optional execution metrics

At authorized spec execution entry, check for `_execution-metrics.md` before preparation and baseline. When present, use `spec-execution-metrics`; nested procedures share the execution identity. Without the companion, retain the existing workflow. Its presence does not authorize execution.

Keep portable observations beside the spec and progress in the existing task records. Collection failure leaves an explicit gap while authorized delivery continues. Metrics do not select checks, change acceptance, or invoke QA, review or Git operations. Technical closure, collection closure, human playtest and user acceptance remain distinct.

## Test infrastructure ownership

Use `game-test-infrastructure` when an authorized task, verification, or direct request needs test infrastructure created, extended, or repaired. The implementation belongs to the consuming project and grows with its checks. Routine runs use the maintained project command. Planning and review-only requests do not authorize implementation.

The infrastructure skill owns the general creation and repair procedure; the discovered technology guidance owns engine-specific preparation. Tasks and verification retain ownership of their checks, coverage, journeys, and verdicts. The maintained runner handles each run's preparation and cleanup.

## QA planning ownership

Use `game-plan-qa` when performing a QA-plan task or a direct planning request. It owns persona missions, affected technical-check selection, preparation requirements, and the handoff in the existing task or verification record. Without an associated record, return the plan in the conversation; create a separate file only when requested. It does not maintain a cross-spec QA catalogue.

Planning alone does not authorize runtime execution or infrastructure implementation. An authorized QA-plan task also prepares its contracted starting states and human playtest handoff. Graph construction remains with `game-create-playtest-tasks`; technical execution and task status remain with the task executor. The session contract stays with `game-execute-qa`, which can prepare its own mission for standalone dogfooding without a separate planning invocation.

## Persona QA ownership and records

Use `game-execute-qa` for requested dogfooding of the game or its authoring tools, including a task's persona sessions. The QA plan supplies complete missions; a standalone request lets the skill prepare its own. `game-execute-task` retains technical checks and task completion, `game-test-infrastructure` owns missing execution capabilities, and discovered technology guidance owns engine details. A scripted test run does not establish a persona session or human acceptance.

Keep planned sessions, incremental outcomes, debriefs, and retests in the existing task or verification record. Standalone QA returns these results in the conversation with evidence paths. Do not create a session report, QA tree, or bug registry automatically; a separate report requires a request. Reproduced defects stay with their evidence or an existing defect record, not the known-issue deferral collection. Persona sessions do not record human playtest results or trigger final verification.

## Slow-test execution configuration

`loki.config.json` at the project root owns persistent slow-test defaults. Resolve each field independently: an explicit value in the user's current request, then the file, then `10`. The supported fields are `slowTests.maxWorkers` and `slowTests.maxBrowsers`; each must be a positive safe integer. Missing file, section or field uses its default. Reject malformed JSON, a non-object root/section or an invalid configured limit before launching jobs, even when the request overrides it. Preserve unrelated configuration fields when creating or updating the file. A one-run override does not rewrite project defaults.

`maxWorkers` bounds active jobs, including nested runner concurrency. `maxBrowsers` separately bounds live browser instances across those jobs, not tabs, contexts or browser helper processes. Both are ceilings for one executor invocation, not targets or a machine-wide quota. Use fewer jobs when dependencies, exclusive resources or demonstrated contention require it, and record why. Separate invocations need separate writable resources and an explicitly coordinated capacity budget if run together.

Keep one reusable test execution command in the project, outside spec directories. Its first consumer establishes independently selectable checks and resource ownership; later specs add cases and reuse it. Prefer native scheduling when adequate. Persistent test runners and disposable fixture builders are maintained test infrastructure; the single-use rule for scripts editing authored game data does not require deleting them. Disposable fixtures must never overwrite the authored game.

Record effective limits and their sources, actual concurrency, selected coverage and cleanup outcomes. Defaults do not authorize dropping tests, changing their assertions/timeouts or treating an incomplete run as passed. The relevant technology skill supplies runtime-specific preparation; the verification procedure owns the claim. Elapsed-time targets, when requested, are separate from concurrency limits.

## Decision Record Taxonomy: GDDR vs ADR

Loki maintains two separate decision-record types, each owned by its own skill:

- **GDDR** — Game Design Decision Records, owned by `game-create-gddr`.
- **ADR** — Architecture Decision Records, owned by `game-create-adr`.

They are complementary, not redundant. Use this boundary to decide which record a given decision belongs in. This taxonomy only **classifies** a supplied decision; it does not decide **whether, when, or why** to create a record — that remains out of scope for both skills.

### Primary criterion — the subject of the decision

- **GDDR** captures decisions about the **game as a playable experience**: game systems, mechanics, progression, economy and balance, narrative, content, modes, and player experience.
- **ADR** captures **technical, architectural, and operational** decisions: plugin architecture, organization of native data and assets, tooling and CLI, build and distribution, testing strategy, and project or harness process.

### Tie-breaker

- If the decision changes **how the game plays or feels to the player**, it is a **GDDR**.
- If the decision changes **how the project, code, or assets are built, structured, tooled, tested, or distributed** without itself changing play, it is an **ADR**.
- **ADR is the default record for any decision that is not game design.** GDDR is the specific carve-out for design.

### Hybrid decisions

When a decision has both a design facet and a technical facet, **split it**: the design intent goes in a GDDR, the implementation means goes in an ADR, and the two records **cross-link** each other. Never duplicate the same decision across both — each record owns its own facet.

Example: *turn-based combat* (the what and why of play) is a GDDR; *the architecture of the plugin that implements turn-based combat* is an ADR that links back to the GDDR.
<!-- loki:instructions:end -->

<!-- loki:project-profile:start -->
## Project profile

Terminus is an in-development game for Ctrl+AI+Jam Week 02, focused on storytelling. The documented jam scope is a visual novel campaign through the guild championship and a mandatory boss confrontation afterward. The RPG Maker MZ project is `rpg-maker/Terminus`; the HTML prototype lives in `docs/terminus/prototipo/`. Consult the current game vision before defining scope, narrative, or mechanics; this profile does not approve proposed content or set a new delivery objective.

### Project documentation and decisions

Keep game documentation under `docs/terminus/` with status `em desenvolvimento`. Read `docs/terminus/visao-do-jogo.md` for confirmed decisions and open questions. Before writing characters, scenes, or dialogue, follow `docs/terminus/personagens/README.md`; for locations, follow `docs/terminus/locais/README.md`. Treat `docs/docs_externas/` as reference material under the source precedence established by the game vision, not as automatically approved game documentation. Resolve material ambiguities with the user before acting on them. Loki workflow and decision records may use their standard collections under `docs/` when the corresponding task needs them.

### Preservation and task boundaries

Preserve authored content, assets, saves, established project conventions, and the distinction between proposals and approved decisions. Keep `coreto/` and `rpg-maker/Terminus/js/plugins/Coreto_*.js` read-only, following the Coreto block below and `coreto/docs/extensoes.md` for game-owned extensions. Use the installed Coreto CLI and its catalogs before introducing custom functionality. Setup and harness updates do not authorize game implementation, content migration, or new gameplay decisions.

### Prototype and verification

For HTML prototype work, follow `docs/terminus/prototipo/README.md` and the installed `game-prototype-vn-html` skill. Its maintained unit-test command, run from the project root, is `node --test --test-reporter=spec docs/terminus/prototipo/tests/*.test.cjs`; consult that guide for the applicable browser and visual checks. For Coreto tooling and game QA, follow `coreto/docs/qa.md`. These commands are task-specific evidence, not a universal test suite for unrelated changes.

### Devlogs

Use `game-write-devlog` with these project overrides: keep devlogs in `docs/terminus/devlogs/`, indexed by its `README.md`, with each post in `NNN-subject/text.md` and images in its sibling `assets/` directory. Preserve existing paths and the Portuguese frontmatter convention: `status: em desenvolvimento`, `publicacao: rascunho` or `publicado`, `commit`, `idioma`, and, when applicable, `url` and `titulo_publicado`. These conventions override the skill's generic collection and metadata defaults. Preserve published posts as historical records; updating the harness does not migrate or rewrite them.

### Public CLI documentation

The installed Coreto CLI entrypoint is `node coreto/tools/coreto/cli.mjs`; discover its public interfaces through its help and catalogs, following `coreto/docs/autoria.md`. Changes to MZ plugin CLI documentation, help, or public descriptors require the applicable technology guidance's author-review checklist and verification receipt. No maintained project command integrating that documentation-review verifier has been established here. The first future authorized task changing those descriptions owns a reusable integration in project tooling outside `coreto/`, including discovery of the task's public descriptor scope and invocation of the installed verifier. This responsibility does not authorize changing the frozen Coreto distribution or implementing the integration during setup.

### Delivery conventions

Follow `.gitmessage` for commit messages and `.github/pull_request_template.md` for pull requests. Keep the configured slow-test ceilings at 10 workers and 10 browsers unless the user chooses new persistent values. Existing task authorization governs execution; installing these skills does not authorize commits, publication, or acceptance of game content.
<!-- loki:project-profile:end -->

<!-- BEGIN CORETO -->
O jogo está em <code>rpg-maker/Terminus</code>, relativo à raiz deste projeto.
Trate `coreto/` e `<jogo>/js/plugins/Coreto_*.js` como somente leitura: nunca edite, regenere ou recompile esses arquivos.
Implemente extensões em `<NomeDoJogo>_<tier+1>_<Recurso>.js`, um tier acima do plugin Coreto estendido, e carregue-as depois dele e de suas dependências em `js/plugins.js`; consulte [extensões](coreto/docs/extensoes.md).
Para descobrir e operar recursos, leia [Coreto](coreto/README.md) e use a ajuda e os catálogos da CLI antes de criar código próprio. Parâmetros, ativação, eventos e assets do jogo são editáveis; o código da engine permanece congelado.
Crie planos, testes, casos e evidências do jogo fora de `coreto/`. Ao testar, use o [guia de QA](coreto/docs/qa.md).
<!-- END CORETO -->
