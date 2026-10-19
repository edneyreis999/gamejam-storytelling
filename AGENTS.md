# Documentação e decisões

- Use `docs/docs_externas/` apenas como referência; não trate seu conteúdo como documentação aprovada do jogo.
- Mantenha a documentação do projeto em `docs/terminus/`, com status de `em desenvolvimento`.
- Leia `docs/terminus/visao-do-jogo.md` antes de definir ou alterar escopo, narrativa ou mecânicas.
- Antes de criar ou alterar personagens, cenas ou diálogos, consulte `docs/terminus/personagens/README.md` e siga as leituras indicadas para a tarefa.
- Confirme com o usuário as ambiguidades das instruções e da documentação antes de tomar decisões que dependam delas.
- Ao trabalhar no protótipo HTML, consulte `docs/terminus/prototipo/README.md` e aplique `.agents/skills/game-prototype-vn-html/SKILL.md`.

# Planejamento e entregas

- Siga `.gitmessage` ao preparar mensagens de commit.
- Siga `.github/pull_request_template.md` ao preparar pull requests.

<!-- BEGIN CORETO -->
O jogo está em <code>rpg-maker/Terminus</code>, relativo à raiz deste projeto.
Trate `coreto/` e `<jogo>/js/plugins/Coreto_*.js` como somente leitura: nunca edite, regenere ou recompile esses arquivos.
Implemente extensões em `<NomeDoJogo>_<tier+1>_<Recurso>.js`, um tier acima do plugin Coreto estendido, e carregue-as depois dele e de suas dependências em `js/plugins.js`; consulte [extensões](coreto/docs/extensoes.md).
Para descobrir e operar recursos, leia [Coreto](coreto/README.md) e use a ajuda e os catálogos da CLI antes de criar código próprio. Parâmetros, ativação, eventos e assets do jogo são editáveis; o código da engine permanece congelado.
Crie planos, testes, casos e evidências do jogo fora de `coreto/`. Ao testar, use o [guia de QA](coreto/docs/qa.md).
<!-- END CORETO -->
