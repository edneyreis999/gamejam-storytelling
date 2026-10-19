# Chapéu Minúsculo — Tiny Hat

Status: em desenvolvimento.

Alteração solicitada pelo autor em 19/10/2026: a guilda C mantém Sevrak como líder e passa a chamar-se **Chapéu Minúsculo**, **Tiny Hat** em inglês. A produção cobre cinco expressões para Sevrak, Ghork e os dez recrutáveis: Brakka, Nima, Sura, Edrin, Korr, Velka, Tessa, Mavren, Odrik e Lethra.

O chapéu é pontudo e minúsculo, com copa e aba em marrom quase preto, faixa simples e borda clara. O contraste foi reforçado após observação do autor de que a primeira proposta se misturava ao cabelo. Não há insígnia, poder ou mudança de personalidade associado ao acessório.

Sevrak usa o chapéu em todas as aparições. Ghork o usa após a adesão a C; os demais, somente quando convidados para sua equipe nessa trajetória. Resolver a missão de alguém não basta. Candidatos, adversários e equipes A/B mantêm suas imagens originais. O traje deriva do estado existente, sem campos novos no save.

## Produção

- Ferramenta integrada `image_gen`, uma imagem por chamada, edição do busto correspondente. O Sevrak neutro corrigido serve apenas como referência do chapéu.
- Fontes: fichas completas em `../../../personagens/`, bustos originais e guia Coreto `C:/projetos/projectX/docs/GDD/5-arte/documento-de-artstyle-v2.md`.
- Os registros em `registros/` guardam prompts exatos, referências, original gerado, arquivo final, hash e revisão. A tentativa de chapéu sem contraste permanece fora da entrega, identificada no registro de Sevrak neutro.
- Os originais existentes são preservados; `originais-sha256.json` permite conferir sua integridade.
- Saída: `assets/terminus/bustos/expressoes/<id>/tiny-hat/<expressao>.png`, 504 × 672 px, PNG RGBA, sRGB, sem entrelaçamento. `exportar.py` faz apenas redução proporcional com alfa pré-multiplicado, margens e folhas de contato.

[Galeria comparativa](galeria.md). A revisão interna não representa aprovação artística do autor.

## Fontes do jogo

O nome vigente está nas definições, glossário e unidades atuais de localização. `original`, `previousPt`, `previousEn`, inventários editoriais e propostas `round2` preservam a redação histórica; essas cópias não devem ser reaplicadas sobre o nome atual. O runtime da edição para jogadores é regenerado a partir das fontes do protótipo.
