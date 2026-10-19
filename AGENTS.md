# Terminus

## Documentation and decisions

- Use `docs/docs_externas/` only as reference material; do not treat its contents as approved game documentation.
- Keep game documentation in `docs/terminus/`, with status `em desenvolvimento`. Loki workflow and decision records may use their skills' standard collections under `docs/`; create those collections only when the corresponding work needs them.
- Read `docs/terminus/visao-do-jogo.md` before defining or changing scope, narrative, or mechanics.
- Before creating or changing characters, scenes, or dialogue, consult `docs/terminus/personagens/README.md` and follow its task-specific reading instructions.
- Confirm ambiguities in instructions and documentation with the user before making decisions that depend on them.
- When working on the HTML prototype, consult `docs/terminus/prototipo/README.md` and apply `.agents/skills/game-prototype-vn-html/SKILL.md`.

## Planning and delivery

- Follow `.gitmessage` when preparing commit messages.
- Follow `.github/pull_request_template.md` when preparing pull requests.

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

<!-- BEGIN CORETO -->
O jogo está em <code>rpg-maker/Terminus</code>, relativo à raiz deste projeto.
Trate `coreto/` e `<jogo>/js/plugins/Coreto_*.js` como somente leitura: nunca edite, regenere ou recompile esses arquivos.
Implemente extensões em `<NomeDoJogo>_<tier+1>_<Recurso>.js`, um tier acima do plugin Coreto estendido, e carregue-as depois dele e de suas dependências em `js/plugins.js`; consulte [extensões](coreto/docs/extensoes.md).
Para descobrir e operar recursos, leia [Coreto](coreto/README.md) e use a ajuda e os catálogos da CLI antes de criar código próprio. Parâmetros, ativação, eventos e assets do jogo são editáveis; o código da engine permanece congelado.
Crie planos, testes, casos e evidências do jogo fora de `coreto/`. Ao testar, use o [guia de QA](coreto/docs/qa.md).
<!-- END CORETO -->
