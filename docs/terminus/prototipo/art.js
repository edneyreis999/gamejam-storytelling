/* Inventário único: o roteiro instancia apenas as variações que utiliza. */
(function (root) {
  "use strict";
  const source =
    typeof module !== "undefined"
      ? require("./art-authority.js")
      : root.TerminusArtAuthority;
  const files =
    typeof module !== "undefined"
      ? require("./asset-files.js")
      : root.TerminusAssetFiles;
  const assets = {};
  const slug = (text) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const expressions = {
    atento: [
      "Atenção",
      "Sobrancelhas em repouso, olhos dirigidos ao interlocutor e boca relaxada, pronta para falar.",
      "Tronco ereto sem rigidez; ombros abertos.",
    ],
    investigativo: [
      "Investigação",
      "Sobrancelhas levemente aproximadas, olhar concentrado num detalhe e boca entreaberta ao formular uma hipótese.",
      "Cabeça ligeiramente inclinada; preservar a posição dos ombros da base.",
    ],
    firme: [
      "Firmeza",
      "Olhar direto, sobrancelhas baixas sem careta e boca articulando uma resposta curta.",
      "Queixo estável, ombros firmes; evitar gesto de ameaça.",
    ],
    preocupado: [
      "Preocupação",
      "Centro das sobrancelhas elevado, olhos atentos ao risco e lábios tensos.",
      "Ombros discretamente recolhidos, sem perder a silhueta da base.",
    ],
    vulneravel: [
      "Vulnerabilidade",
      "Olhar ligeiramente desviado, sobrancelhas relaxadas e boca hesitante; sem lágrimas obrigatórias.",
      "Queixo um pouco baixo; preservar a escala e os ombros da base.",
    ],
    alegre: [
      "Alegria",
      "Sorriso visível, olhos vivos e sobrancelhas abertas; entusiasmo sem caricatura.",
      "Cabeça erguida e postura aberta, mantendo o corte da base.",
    ],
    ironico: [
      "Ironia",
      "Um canto da boca levemente elevado e uma sobrancelha mais alta; olhar dirigido ao interlocutor.",
      "Inclinação sutil da cabeça, sem criar outra pose de corpo.",
    ],
    exausto: [
      "Exaustão",
      "Pálpebras pesadas, olhar ainda responsivo e boca entreaberta para recuperar o fôlego.",
      "Ombros baixos e queixo levemente caído. Não acrescentar ferimentos novos.",
    ],
    hostil: [
      "Hostilidade",
      "Sobrancelhas cerradas, olhar fixo e mandíbula tensa; boca pronta para interromper.",
      "Tronco firme, cabeça projetada sutilmente à frente.",
    ],
    reflexivo: [
      "Reflexão",
      "Olhar baixo ou lateral, sobrancelhas levemente unidas e boca fechada entre palavras.",
      "Cabeça pouco inclinada, postura de pausa e escuta.",
    ],
  };
  function register(asset) {
    if (!assets[asset.id])
      assets[asset.id] = {
        editorial: "Proposta de encenação",
        status: "A produzir",
        file: asset.preview || `assets/${asset.category}/${asset.id}.png`,
        ...asset,
      };
    return asset.id;
  }
  const backgrounds = [
    [
      "estalagem-salao",
      "Estalagem — salão",
      "estalagem-de-nyra",
      "Salão com mesas coletivas, balcão e passagem livre. Reservar centro e faixa inferior para a interface.",
    ],
    [
      "estalagem-patio",
      "Estalagem — pátio",
      "estalagem-de-nyra",
      "Pátio com bancos móveis e portão. O espaço compartilhado precisa ser legível, sem instalações simultâneas dos dois projetos.",
    ],
    [
      "mercado",
      "Mercado — corredor de cargas",
      "mercado-de-provisoes",
      "Bancas e carroças formam uma passagem lateral e uma saída reconhecível. Sem assaltantes pintados no fundo.",
    ],
    [
      "virmura-sede",
      "Guilda de Virmura — sede",
      "guilda-de-virmura",
      "Mesa de trabalho e cestos organizados; passagem para o atendimento. Registros importantes separados da arte.",
    ],
    [
      "virmura-enfermaria",
      "Guilda de Virmura — enfermaria",
      "guilda-de-virmura",
      "Leitos, mesa baixa e entrada visível; incluir espaço para Ghork sentado sem pintá-lo no fundo.",
    ],
    [
      "borun-sede",
      "Guilda de Borun — sede",
      "guilda-de-borun",
      "Sala prática de expedições, bancos e cargas organizadas. Mesa livre para conversa.",
    ],
    [
      "sevrak-sede",
      "Guilda de Sevrak — sede",
      "guilda-de-sevrak",
      "Sala de instrução com mesa de comparação e espaço de demonstração, sem texto obrigatório nas paredes.",
    ],
    [
      "quarta-sede",
      "Quarta guilda — sede",
      "quarta-guilda",
      "Sede de prestígio marcial; proposta do catálogo original, sem visita obrigatória na campanha atual.",
    ],
    [
      "coliseu-entrada",
      "Coliseu — entrada e inscrições",
      "coliseu",
      "Entrada, mesa de inscrições e quadro de avisos. Horários e listas são objetos separados.",
    ],
    [
      "coliseu-arena",
      "Coliseu — arena",
      "coliseu",
      "Arena vista da borda, arquibancadas sugeridas sem retratos individuais; acessos laterais visíveis. Reservar área para busto e objeto.",
    ],
    [
      "coliseu-servico",
      "Coliseu — área de serviço",
      "coliseu",
      "Corredor de serviço com cargas e acesso à arena. Preservar a mesma arquitetura na invasão e no atendimento posterior.",
    ],
    [
      "oficina",
      "Oficina de Durn",
      "oficina-de-durn",
      "Bancada, ferramentas e prateleiras. Armação disputada e peça devolvida não integram a pintura do fundo.",
    ],
    [
      "treino",
      "Espaço de treino de Guedra",
      "espaco-de-treino",
      "Pátio independente de treino com apoios de madeira e chão marcado; sem equipamento que suponha bônus de combate.",
    ],
    [
      "boticario",
      "Boticário",
      "boticario",
      "Balcão, frascos e armários, sem laboratório secreto ou símbolos que antecipem a revelação de Neral.",
    ],
    [
      "contratos",
      "Casa de contratos — interior",
      "casa-de-contratos-e-mapas",
      "Vista diagonal de mesa de consulta, mesa lateral e estantes. Os dois mapas da missão ficam fora da arte base.",
    ],
    [
      "minas-entrada",
      "Minas — entrada",
      "minas-e-galerias",
      "Boca da mina com área de preparação e apoios. Sem conexão visual com os Ignotos.",
    ],
    [
      "minas-subsolo",
      "Minas — galerias",
      "minas-e-galerias",
      "Bifurcação e passagem estreita, iluminação de trabalho. Sem revelar uma planta completa ou uma fraude.",
    ],
    [
      "cisterna",
      "Cisterna em obras",
      "cisterna-em-obras",
      "Obra quase concluída com ferramentas e acesso de serviço. Sem inscrições que resolvam a disputa pelo pagamento.",
    ],
    [
      "coreto",
      "Coreto — Noite da História",
      "coreto-da-noite-da-historia",
      "Tablado, banco e lanternas à noite. Presente narrativo em cores; Rheed separado do fundo. A referência sépia existente não é a arte final colorida.",
    ],
  ];
  for (const [id, name, location, brief] of backgrounds)
    register({
      id: `bg-${id}`,
      category: "background",
      name,
      owner: name.split(" — ")[0],
      base: null,
      variant: "Fundo-base",
      source: source.places[location].source,
      brief,
      reference: source.places[location].brief,
      format: `PNG opaco · arquivo 1672 × ${id === "virmura-sede" ? 940 : 941} · palco de referência 1280 × 720`,
      orientation:
        "Enquadramento fixo; faixa inferior de diálogo e centro de descrição livres de informação indispensável.",
      reason: "Situar as cenas deste enquadramento.",
      preview:
        "../../../assets/terminus/locais/" + files.backgrounds[id] + ".png",
      status: "Em avaliação artística",
    });
  function portrait(speaker, expression = "atento", pose = "base") {
    const expressionMap = {
      atento: "neutro",
      investigativo: "confuso",
      firme: "neutro",
      preocupado: "triste",
      vulneravel: "triste",
      alegre: "feliz",
      ironico: "feliz",
      exausto: "triste",
      hostil: "raiva",
      reflexivo: "neutro",
    };
    const selected = expressionMap[expression] || expression;
    const key =
      speaker === "Savel"
        ? "neral"
        : speaker === "Rheed"
          ? "rheed"
          : slug(speaker);
    const provisional = [
      "Assaltante",
      "Veterano",
      "Iniciante",
      "Ferido",
      "Testemunha",
      "Trabalhador",
      "Pirka e Jorvi",
      "Representantes dos trabalhadores",
      "Responsável pela cisterna",
    ];
    const person =
      source.characters[key] ||
      (provisional.includes(speaker)
        ? {
            source: "../storytelling/quests-da-campanha.md",
            appearance:
              "Figurante identificado pelo papel; aparência provisória.",
            notes: "Sem imagem correspondente.",
          }
        : null);
    if (!person) throw new Error(`Personagem sem ficha: ${speaker}`);
    const exp =
      expressions[
        {
          neutro: "atento",
          confuso: "investigativo",
          triste: "preocupado",
          feliz: "alegre",
          raiva: "hostil",
        }[selected]
      ];
    const visual =
      speaker === "Savel"
        ? "neral-disfarce"
        : speaker === "Neral"
          ? pose === "transformado"
            ? "neral-transformado"
            : "neral-revelado"
          : key;
    const available = files.portraits[visual];
    if (!exp) throw new Error(`Expressão sem direção de arte: ${expression}`);
    const persona = speaker === "Savel" ? "savel" : key;
    const base = `pose-${persona}-${pose}`;
    return register({
      id: `bust-${persona}-${pose}-${selected}`,
      preview: available ? available.files[selected] : null,
      concept: available ? available.concept : null,
      status: available ? "Em avaliação artística" : "Representação provisória",
      category: "bust",
      name: `${speaker} — ${selected}${pose === "base" ? "" : ` · ${pose}`}`,
      owner: speaker,
      base,
      variant: selected,
      source: person.source,
      brief: `${person.appearance}\n\nRosto: ${exp[1]}\nPostura: ${exp[2]}${pose === "transformado" ? "\nPose nova: corpo deformado pelo concentrado, silhueta ampliada e assimétrica. Manter sinais que permitam reconhecer Neral. Anatomia adicional é proposta, não poder novo." : ""}${speaker === "Savel" ? "\nDisfarce público de Neral como fornecedor: aparência comercial, sem revelar antecipadamente sinais da transformação." : ""}${speaker === "Lala" ? "\nContato à distância pelo colar. Mostrar busto recortado sem cenário de Daratrine; não implica presença física em Terminus." : ""}`,
      reference: person.notes,
      format: available
        ? "PNG transparente · 504 × 672 · cabeça e tronco; proporção e transparência preservadas"
        : "Representação provisória · cabeça e tronco, sem ilustração correspondente",
      orientation:
        "Ghork à esquerda; interlocutores à direita, três quartos voltados ao centro. Rheed frontal no presente. Não espelhar assimetrias sem revisão.",
      reason: "Sustentar a intenção das falas e pensamentos referenciados.",
      palette:
        speaker === "Rheed"
          ? "Presente: colorido"
          : "Passado: tinta, hachuras e tons pastel/bege",
    });
  }
  const objects = [
    [
      "frasco-rheed",
      "Frasco de Rheed",
      "Rheed",
      "Frasco pequeno de poção mnésica, vidro e tampa distinguíveis; líquido com névoa azulada. Sem rótulo legível obrigatório.",
      "rheed",
      "Preparar a passagem entre a Noite da História e a memória.",
    ],
    [
      "colar",
      "Colar de Telminite",
      "Ghork",
      "Colar recortado com pedra amarela de Telminite. Forma do suporte é proposta. A luminosidade será aplicada na apresentação; não criar rostos dentro da pedra.",
      "ghork",
      "Identificar o contato à distância com Lala.",
    ],
    [
      "mapa-entrada",
      "Mapa — entrada pelo pátio",
      "Casa de contratos",
      "Folha vista de frente, seta de entrada e dois marcos reconhecíveis: abertura estreita e bifurcação. Diagramas esquemáticos; legenda será textual na interface. Não revelar o trecho desconhecido.",
      "elune",
      "Permitir comparar a orientação dos dois relatos.",
    ],
    [
      "mapa-retirada",
      "Mapa — percurso de retirada",
      "Casa de contratos",
      "Segunda folha com os mesmos dois marcos, orientação de saída inversa e lacuna sem traçado. Distinguir a folha por forma da margem, além da cor. Sem prova de fraude.",
      "elune",
      "Mostrar que os mapas respondem a percursos diferentes.",
    ],
    [
      "registros",
      "Registros de retirada",
      "Virmura",
      "Folhas presas numa prancheta com colunas e marcas de uso. Campos sensíveis sem nomes legíveis. Texto explicativo na caixa, não desenhado em fonte minúscula.",
      "virmura",
      "Apresentar informações usadas na comparação e preservar sigilo.",
    ],
    [
      "contrato",
      "Contrato das galerias",
      "Meruna",
      "Folha com título esquemático e espaço de assinatura; sem inventar brasão oficial, valores ou cláusulas fora do roteiro.",
      "meruna",
      "Marcar a adesão à estratégia e a titularidade do trabalho.",
    ],
    [
      "horarios",
      "Quadro de horários cancelados",
      "Rask",
      "Placa ou folha isolada com linhas riscadas visíveis. Sem nomes fixos de guilda: identificação e horário são texto do jogo.",
      "rask",
      "Tornar visível a retaliação contra os horários de preparação.",
    ],
    [
      "maca",
      "Maca de retirada",
      "Darvek",
      "Maca de transporte desmontável, com apoios e tiras; mostrar escala funcional sem pessoas incorporadas.",
      "darvek",
      "Demonstração da retirada antes da investigação.",
    ],
    [
      "marcadores",
      "Marcadores de retorno",
      "Zagra",
      "Conjunto pequeno de marcas e cordão de trabalho, legível como um único objeto. Sem runas ou poder mágico adicional.",
      "zagra",
      "Apresentar o método de retorno da equipe.",
    ],
    [
      "armacao",
      "Armação coletiva",
      "Durn",
      "Estrutura articulada de madeira e metal com pinos acessíveis. Silhueta permite perceber que as mesmas peças servem a dois projetos. Estado montado; desmontagem é narrada.",
      "durn",
      "Sustentar a escolha entre desmontar e conservar em R3.",
    ],
    [
      "peca",
      "Peça devolvida",
      "Durn",
      "Peça mecânica pequena com apoio e encaixe visíveis, mesma orientação durante inspeção e entrega. Sem arma ou propriedade mágica nova.",
      "durn",
      "Mostrar a devolução e a explicação de uso ao destinatário.",
    ],
    [
      "recibo",
      "Recibo de remessa",
      "Pirka",
      "Papel dobrado com carimbo comercial genérico e marca de conferência. Sem valor monetário ou símbolo político inventado.",
      "pirka",
      "Identificar a contribuição enviada ao reparo de Dam.",
    ],
    [
      "dose",
      "Amostra de Savel",
      "Savel",
      "Frasco curto com marca distinta no gargalo, reutilizável na oferta e no reconhecimento posterior. Líquido visível sem crânio ou alerta que revele antecipadamente o plano.",
      "neral",
      "Reconhecer o mesmo produto no percurso do campeão.",
    ],
    [
      "concentrado",
      "Concentrado de Neral",
      "Neral",
      "Frasco de dose concentrada com a mesma família de gargalo, líquido mais denso; não confundir com o frasco de Rheed.",
      "neral",
      "Mostrar o consumo que precede a transformação.",
    ],
    [
      "correspondencia",
      "Correspondência do Conselho",
      "Daratrine",
      "Cartas e registros com referência ao Conselho, sem nomes de infiltrados ou mapa de próximos núcleos. O selo narrativo intacto não é o lacre dessas cartas.",
      "neral",
      "Apresentar a evidência encontrada após a batalha.",
    ],
  ];
  for (const [id, name, owner, brief, person, reason] of objects)
    register({
      id: `obj-${id}`,
      category: "object",
      name,
      owner,
      base: null,
      variant: "Objeto-base",
      source: source.characters[person].source,
      brief,
      reference:
        "Forma e acabamento são propostas de encenação; consultar a ficha antes de produzir.",
      format:
        "PNG transparente · tela até 720 × 540 · margens livres; objeto legível a 40% do palco",
      orientation:
        "Vista frontal ou três quartos leve; centro de massa centralizado para deslocamento.",
      reason,
    });
  for (const [id, name, brief] of [
    [
      "description",
      "Painel descritivo",
      "Moldura de papel com borda dupla e pequenos cantos trabalhados; centro liso, texto à esquerda. Sem nome, retrato, título ou botão de fechar.",
    ],
    [
      "dialogue",
      "Caixa de diálogo",
      "Caixa inferior de leitura com placa de nome e espaço de texto. Moldura simples, visualmente distinta do painel central.",
    ],
  ])
    register({
      id: `ui-${id}`,
      category: "interface",
      name,
      owner: "Interface",
      base: null,
      variant: "Componente reutilizável",
      source: "README.md",
      brief,
      reference:
        "Modelo funcional em CSS; nenhuma imagem raster é exigida para a V2.",
      format: "Componente escalável; moldura substituível na migração",
      orientation: "Descrição central; diálogo inferior.",
      reason: "Reutilizado por todas as passagens do tipo.",
      status: "Implementado em CSS",
      file: null,
    });
  const campaign =
    typeof module !== "undefined"
      ? require("./campaign.js")
      : root.TerminusContent;
  for (const [id, name] of Object.entries(campaign.items))
    register({
      id: `quest-${id}`,
      category: "object",
      name,
      owner: "Ghork",
      base: null,
      variant: "Objeto de missão",
      source: "../storytelling/quests-da-campanha.md",
      status: "Representação provisória",
      brief: `${name}, isolado sobre fundo transparente. Representa posse ou entrega; não compõe equipamento ou peso.`,
      reference:
        "Origem, destinatário e devolução definidos pelas etapas da quest.",
      format: "PNG transparente · objeto central",
      orientation: "Sem espelhamento automático.",
      reason: "Identificar a obtenção e a entrega no palco.",
    });
  const map = typeof module !== "undefined" ? require("./mapa/manifest.js") : root.TERMINUS_MAP;
  for (const [id, name, file, owner] of [
    ["terrain", "Terreno de Terminus", map.background, "Terminus"],
    ...map.destinations.map(place => [place.id, place.name, place.facade, place.name]),
  ]) register({
    id: `map-${id}`, category: "interface", name, owner,
    base: null, variant: "Mapa da cidade", source: "mapa/prompts.json",
    status: "Em avaliação artística", preview: map.artRoot + file,
    brief: id === "terrain" ? "Terreno em nanquim e sépia, composição de 1280 × 720 unidades." : "Recorte transparente do destino; posição e alvo definidos pelo manifesto do mapa.",
    reference: "mapa/README.md", format: "PNG · arte existente",
    orientation: "Sem recorte ou espelhamento; proporção original preservada.",
    reason: "Navegação da campanha após Q-A1.",
  });
  root.TerminusArt = { assets, portrait, slug, expressions };
  if (typeof module !== "undefined") module.exports = root.TerminusArt;
})(globalThis);
