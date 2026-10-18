(function (root) {
  "use strict";
  const C =
    typeof module !== "undefined"
      ? require("./supplementary.js")
      : root.TerminusContent;
  const A =
    typeof module !== "undefined" ? require("./art.js") : root.TerminusArt;
  // Cada destaque é uma decisão editorial, nunca uma busca por palavras na prosa.
  const cues = {
    "intro.0.body": [
      {
        after: 0,
        object: "obj-frasco-rheed",
        text: "O frasco de Rheed repousa ao alcance da mão.",
      },
    ],
    "gA1.1.body": [
      {
        after: 0,
        object: "obj-colar",
        text: "A luz do colar se firma. O contato com Lala pode começar.",
      },
    ],
    "gA2.0.body": [
      {
        after: 0,
        object: "obj-registros",
        text: "Ghork confere os registros de retirada.",
      },
    ],
    "gA3.0.body": [
      {
        after: 0,
        object: "obj-mapa-entrada",
        text: "O primeiro mapa descreve a entrada pelo pátio.",
      },
      {
        after: 0,
        object: "obj-mapa-retirada",
        text: "O segundo acompanha o percurso da retirada.",
      },
    ],
    "gB3.0.body": [
      {
        after: 0,
        object: "obj-mapa-entrada",
        text: "O ponto de partida está marcado na margem.",
      },
    ],
    "gC2.0.body": [
      {
        after: 0,
        object: "obj-mapa-retirada",
        text: "O relato de saída usa outra referência de orientação.",
      },
    ],
    "retaliation.0.body": [
      {
        after: 6,
        object: "obj-horarios",
        text: "Os horários de preparação foram riscados.",
      },
    ],
    "X1.0.body": [
      {
        after: 0,
        object: "obj-maca",
        text: "A equipe prepara a retirada com a maca antes de avançar.",
      },
    ],
    "Y1.0.body": [
      {
        after: 0,
        object: "obj-marcadores",
        text: "As marcas permitem reconhecer o caminho de volta.",
      },
    ],
    "R3.0.body": [
      {
        after: 0,
        object: "obj-armacao",
        text: "Os dois projetos dependem das mesmas articulações.",
      },
    ],
    "side2.0.body": [
      {
        after: 0,
        object: "obj-peca",
        text: "Durn deixa a peça na bancada para Ghork conferir a posição de uso.",
      },
    ],
    "side2.0.choice0": [
      {
        after: 0,
        object: "obj-peca",
        operation: "give",
        recipient: "Durn",
        text: "Ghork devolve a peça a Durn após a demonstração.",
      },
    ],
    "side2.0.choice1": [
      {
        after: 0,
        object: "obj-peca",
        operation: "give",
        recipient: "Durn",
        text: "Ghork devolve a peça a Durn após a demonstração.",
      },
    ],
    "potionVisit.0.body": [
      {
        after: 0,
        object: "obj-dose",
        text: "A marca no gargalo distingue a amostra oferecida por Savel.",
      },
    ],
    "after5.0.body": [
      {
        after: 1,
        object: "obj-correspondencia",
        text: "As cartas e os registros apontam uma ligação com o Conselho.",
      },
    ],
    "classify.1.choice0": [
      {
        after: 0,
        object: "obj-recibo",
        text: "O recibo registra a contribuição enviada para o reparo de Dam.",
      },
    ],
    "ending.1.body": [
      {
        after: 0,
        object: "obj-colar",
        text: "Ghork volta a falar com Lala pelo colar.",
      },
    ],
  };
  for (const g of "ABC")
    cues[`g${g}5.0.body`] = [
      {
        after: 0,
        object: "obj-contrato",
        text: "O contrato das galerias será assumido por uma das guildas.",
      },
    ];
  function resolve(value, state) {
    return typeof value === "function" ? value(state) : value;
  }
  function sequence(id, page, choice, state, previous = {}) {
    const q = C.quests[id],
      raw = q.pages[page];
    const branch = choice === null ? "body" : `choice${choice}`;
    const value = choice === null ? raw.body : raw.choices[choice].response;
    const list = resolve(value, state);
    if (!Array.isArray(list))
      throw new Error(`Passagens não estruturadas em ${id}.${page}.${branch}`);
    const authored = [];
    list.forEach((passage, index) => {
      if (!passage.type || typeof passage.text !== "string")
        throw new Error(
          `Passagem inválida em ${id}.${page}.${branch}.${index}`,
        );
      if (id === "fight5" && branch === "body" && index === 4)
        authored.push({
          type: "action",
          speaker: "Rheed",
          era: "past",
          text: "Neral leva o concentrado à boca.",
          object: "obj-concentrado",
          operation: "show",
          id: `${id}.p${page + 1}.${branch}.art-concentrado`,
        });
      authored.push({
        ...passage,
        id: `${id}.p${page + 1}.${branch}.${index + 1}`,
      });
      for (const cue of cues[`${id}.${page}.${branch}`] || []) {
        if (cue.after === index)
          authored.push({
            type: "action",
            speaker: "Rheed",
            era: passage.era,
            background: passage.background,
            text: cue.text,
            object: cue.object,
            operation: cue.operation || "show",
            recipient: cue.recipient,
            id: `${id}.p${page + 1}.${branch}.art-${cue.object}`,
          });
      }
    });
    const defaultBg = resolve(raw.body, state)[0].background;
    if (!defaultBg)
      throw new Error(`Primeira passagem sem fundo: ${id}.${page}`);
    const memories = { ...(previous.memories || {}) };
    let visual = {
      background: defaultBg,
      bust: null,
      era: defaultBg === "bg-coreto" ? "present" : "past",
      ...previous,
    };
    return authored.map((p, index) => {
      const era = p.era || visual.era;
      if (visual.era)
        memories[visual.era] = {
          background: visual.background,
          bust: visual.bust,
        };
      const explicit = p.background;
      const remembered = memories[era];
      const bg =
        explicit ||
        (era === "present"
          ? "bg-coreto"
          : index === 0 && choice === null
            ? defaultBg
            : era === visual.era
              ? visual.background
              : remembered?.background || defaultBg);
      if (!A.assets[bg]) throw new Error(`Fundo sem ficha: ${bg} (${p.id})`);
      if (era !== visual.era)
        visual = {
          background: bg,
          bust: remembered?.background === bg ? remembered.bust : null,
          era,
        };
      else if (bg !== visual.background)
        visual = { background: bg, bust: null, era };
      if (p.type === "dialogue" || p.type === "thought")
        visual.bust = A.portrait(p.speaker, p.expression, p.pose);
      if (p.type === "action" && p.recipient)
        visual.bust = A.portrait(p.recipient, "atento");
      const assets = [bg];
      if (visual.bust) assets.push(visual.bust);
      if (p.object) assets.push(p.object);
      assets.push(p.type === "description" ? "ui-description" : "ui-dialogue");
      return {
        ...p,
        background: bg,
        era,
        bust: visual.bust,
        assets,
        visual: { ...visual, memories: structuredClone(memories) },
      };
    });
  }
  root.TerminusStaging = { sequence, resolve, cues };
  if (typeof module !== "undefined") module.exports = root.TerminusStaging;
})(globalThis);
