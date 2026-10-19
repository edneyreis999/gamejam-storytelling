(function (root) {
  "use strict";
  const C =
    typeof module !== "undefined"
      ? require("./campaign.js")
      : root.TerminusContent;
  const A =
    typeof module !== "undefined" ? require("./art.js") : root.TerminusArt;
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
      authored.push({
        ...passage,
        id: `${id}.p${page + 1}.${branch}.${index + 1}`,
      });
    });
    const answered = state.questions?.[`${id}.${page}`] || [];
    const completesStep = raw.choices.length
      ? choice !== null &&
        (!raw.question || answered.length === raw.choices.length)
      : choice === null;
    if (raw.stepEnd && completesStep) {
      const step = q.steps[raw.step];
      for (const { item, to } of step.deliver || [])
        authored.push({
          type: "action",
          speaker: "Rheed",
          era: "past",
          text: `Ghork entrega ${C.items[item]} a ${to}.`,
          object: `quest-${item}`,
          operation: "give",
          recipient: to,
          id: `${q.id}.${step.id}.deliver.${item}`,
        });
      for (const item of step.receive || [])
        authored.push({
          type: "action",
          speaker: "Rheed",
          era: "past",
          text: `Ghork recebe ${C.items[item]}.`,
          object: `quest-${item}`,
          operation: "show",
          id: `${q.id}.${step.id}.receive.${item}`,
        });
    }
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
  root.TerminusStaging = { sequence, resolve };
  if (typeof module !== "undefined") module.exports = root.TerminusStaging;
})(globalThis);
