/* Prévia editorial: contextos de leitura, sem instanciar ou salvar uma partida. */
(function (root) {
  "use strict";
  const C =
    typeof module !== "undefined"
      ? require("./campaign.js")
      : root.TerminusContent;
  const P =
    typeof module !== "undefined"
      ? require("./staging.js")
      : root.TerminusStaging;
  const A =
    typeof module !== "undefined" ? require("./art.js") : root.TerminusArt;
  const profiles = [
    {
      id: "conhecidos",
      name: "Conhecidos · conflitos pendentes",
      flags: { dam: "help", uv: "U" },
      mode: "known",
      side: 0,
    },
    {
      id: "solo",
      name: "Solo · respostas respeitosas",
      flags: {
        guildSpeech: "respect",
        justification: "respect",
        lala2: "listen",
        dam: "help",
        sample: "refused",
        uv: "U",
        passage: true,
      },
      mode: "solo",
      side: 0,
    },
    {
      id: "aliados-a",
      name: "Cinco aliados A · respostas firmes",
      flags: {
        guildSpeech: "firm",
        justification: "firm",
        lala2: "promise",
        dam: "defer",
        sample: "taken",
        uv: "V",
        passage: false,
      },
      mode: "all",
      side: 0,
    },
    {
      id: "aliados-b",
      name: "Cinco aliados B · humor",
      flags: {
        guildSpeech: "respect",
        justification: "humor",
        lala2: "listen",
        dam: "help",
        sample: "questioned",
        uv: "U",
        passage: true,
      },
      mode: "all",
      side: 1,
    },
    {
      id: "resolvidos-a",
      name: "Conflitos resolvidos A · sem convites",
      flags: {
        guildSpeech: "firm",
        justification: "respect",
        lala2: "promise",
        dam: "defer",
        sample: "refused",
        uv: "V",
        passage: false,
      },
      mode: "resolved",
      side: 0,
    },
    {
      id: "resolvidos-b",
      name: "Conflitos resolvidos B · sem convites",
      flags: {
        guildSpeech: "respect",
        justification: "firm",
        lala2: "listen",
        dam: "help",
        sample: "taken",
        uv: "U",
        passage: true,
      },
      mode: "resolved",
      side: 1,
    },
  ];
  const moments = [
    {
      id: "arrival",
      name: "Antes das três apresentações",
      stage: 1,
      progress: { A: 0, B: 0, C: 0 },
      routeProgress: 0,
      completed: [],
    },
    {
      id: "guild",
      name: "Três mentores conhecidos",
      stage: 1,
      progress: { A: 4, B: 4, C: 4 },
      routeProgress: 0,
      completed: [],
    },
    {
      id: "mines",
      name: "Antes da investigação",
      stage: 2,
      routeProgress: 0,
      completed: [],
    },
    {
      id: "return",
      name: "Volta das minas",
      stage: 2,
      routeProgress: 2,
      completed: [],
    },
    {
      id: "tournament",
      name: "Campeonato",
      stage: 3,
      routeProgress: 2,
      completed: [],
    },
    {
      id: "champion",
      name: "Depois da final",
      stage: 3,
      routeProgress: 2,
      completed: ["after4"],
    },
    {
      id: "invasion",
      name: "Durante a crise",
      stage: 3,
      routeProgress: 2,
      completed: ["after4", "invasion"],
    },
  ];
  function applyMoment(state, id = "tournament") {
    const moment = moments.find((m) => m.id === id);
    if (!moment) throw new Error("Momento de revisão inexistente.");
    return { ...state, ...structuredClone(moment) };
  }
  function context(
    guild = "A",
    route = "X",
    profileId = "solo",
    opponentMask = 0,
  ) {
    const profile = profiles.find((p) => p.id === profileId);
    if (!profile) throw new Error("Contexto editorial inexistente.");
    return {
      guild,
      xy: route,
      stage: 3,
      routeProgress: 2,
      completed: [],
      progress: { A: 4, B: 4, C: 4 },
      flags: {
        ...profile.flags,
        routeChoice: route,
        ...Object.fromEntries(
          C.pairs.map((p) => [p.id, profile.side ? "B" : "A"]),
        ),
        a3: profile.side,
        c4: profile.side,
      },
      questSteps:
        profile.mode === "solo"
          ? {}
          : Object.fromEntries(C.pairs.map((p) => [p.id, 1])),
      metCandidates:
        profile.mode === "solo" ? [] : C.pairs.flatMap((p) => p.names),
      recruits: C.pairs.map((p, i) => ({
        outcome: ["solo", "known"].includes(profile.mode)
          ? null
          : profile.side
            ? "B"
            : "A",
        name: p.names[profile.side],
        invited: profile.mode === "all",
        paid: false,
      })),
      opponents: C.pairs.map(
        (p, i) =>
          p.names[
            profile.mode === "all" ? 1 - profile.side : (opponentMask >> i) & 1
          ],
      ),
    };
  }
  function applicable(q, guild, route) {
    if (q.kind === "commit") return q.guild === guild;
    if (q.kind === "guild") return q.guild === guild || q.step < 5;
    if (q.kind === "route") return q.route === route;
    return true;
  }
  function pageState(q, page, choice, state) {
    const s = structuredClone(state);
    if (q.kind === "guild" || q.kind === "opening" || q.id === "champion") {
      s.guild = null;
      s.recruits.forEach(recruit => { recruit.invited = false; });
    }
    if (q.kind === "commit") {
      s.guild = q.guild;
      s.recruits.forEach(recruit => { recruit.invited = false; });
    }
    if (q.kind === "recruit") s.recruits[q.index].invited = false;
    if (q.id === "coreto") s.stage = page || state.stage;
    if (q.id === "coreto" && s.stage === 1) s.guild = null;
    if (choice !== null)
      Object.assign(s.flags, q.pages[page].choices[choice].flags);
    if (choice !== null && q.pages[page].question)
      s.questions = {
        ...s.questions,
        [`${q.id}.${page}`]: q.pages[page].choices.map((_, index) => index),
      };
    return s;
  }
  function preview(id, page, choice, state) {
    const q = C.quests[id];
    if (!q) throw new Error("Cena de prévia inexistente.");
    let visual = {};
    // Páginas anteriores fornecem a continuidade de enquadramento; a prévia nunca aplica recompensas.
    for (let i = 0; i <= page; i++) {
      const body = P.sequence(
        id,
        i,
        null,
        pageState(q, i, null, state),
        visual,
      );
      if (i === page) {
        if (choice === null) return body;
        return P.sequence(
          id,
          i,
          choice,
          pageState(q, i, choice, state),
          body.at(-1).visual,
        );
      }
      visual = body.at(-1).visual;
    }
  }
  let cached;
  function build() {
    if (cached) return cached;
    const uses = new Map(),
      variants = new Map();
    function index(q, page, choice, state, label, ref) {
      const sequence = preview(q.id, page, choice, state);
      for (const passage of sequence) {
        const signature = JSON.stringify([
          passage.text,
          passage.background,
          passage.bust,
          passage.object,
          passage.operation,
        ]);
        const vk = `${passage.id}:${signature}`;
        if (!variants.has(vk))
          variants.set(vk, {
            passage,
            scene: q.id,
            page,
            choice,
            contexts: [],
            ...ref,
          });
        const variant = variants.get(vk);
        if (!variant.contexts.includes(label)) variant.contexts.push(label);
        for (const asset of passage.assets) {
          if (!A.assets[asset]) throw new Error(`Arte sem ficha: ${asset}`);
          const key = `${asset}:${passage.id}`;
          if (!uses.has(key))
            uses.set(key, {
              asset,
              scene: q.id,
              title: q.title,
              page,
              choice,
              passage: passage.id,
              contexts: [],
              ...ref,
            });
          const use = uses.get(key);
          if (!use.contexts.includes(label)) use.contexts.push(label);
        }
      }
    }
    for (const q of Object.values(C.quests))
      for (const guild of "ABC")
        for (const route of "XY") {
          if (!applicable(q, guild, route)) continue;
          for (const profile of profiles) {
            const masks =
              q.id === "fight3" && profile.mode !== "all"
                ? Array.from({ length: 32 }, (_, i) => i)
                : [0];
            for (const mask of masks) {
              const s = context(guild, route, profile.id, mask);
              const checkpoints = q.id === "coreto" ? moments : [moments[4]];
              for (const checkpoint of checkpoints) {
                const staged = applyMoment(s, checkpoint.id);
                const stage = staged.stage;
                const ref = {
                  guild,
                  route,
                  profile: profile.id,
                  mask,
                  stage,
                  moment: checkpoint.id,
                };
                const label = `${guild}${route} · ${profile.name}${q.id === "fight3" ? ` · formação ${mask + 1}` : ""}${q.id === "coreto" ? ` · ${checkpoint.name}` : ""}`;
                q.pages.forEach((p, page) => {
                  const step = q.steps[p.step];
                  if (step.when && !step.when(staged)) return;
                  index(q, page, null, staged, label, ref);
                  p.choices.forEach((_, choice) =>
                    index(q, page, choice, staged, label, ref),
                  );
                });
              }
            }
          }
        }
    for (const asset of Object.values(A.assets).filter(a => a.variant === "Mapa da cidade"))
      uses.set(asset.id, {asset: asset.id, scene: "city-map", title: "Mapa de Terminus", passage: asset.id,
        contexts: ["Exploração após Q-A1; prévia editorial independente da campanha."]});
    const allUses = [...uses.values()];
    const records = Object.values(A.assets).map((a) => ({
      ...a,
      uses: allUses.filter((u) => u.asset === a.id),
    }));
    cached = { records, uses: allUses, variants: [...variants.values()] };
    return cached;
  }
  const quote = (x) => `"${String(x ?? "").replaceAll('"', '""')}"`;
  function csv(kind = "assets") {
    const data = build();
    const rows =
      kind === "uses"
        ? [
            ["imagem", "cena", "titulo", "passagem", "condicoes"],
            ...data.uses.map((u) => [
              u.asset,
              u.scene,
              u.title,
              u.passage,
              u.contexts.join(" | "),
            ]),
          ]
        : [
            [
              "id",
              "categoria",
              "nome",
              "personagem_local",
              "base",
              "variacao",
              "estado",
              "arquivo",
              "usos",
              "descricao",
              "formato",
              "orientacao",
              "fonte",
            ],
            ...data.records.map((a) => [
              a.id,
              a.category,
              a.name,
              a.owner,
              a.base,
              a.variant,
              a.status,
              a.file,
              a.uses.length,
              a.brief,
              a.format,
              a.orientation,
              a.source,
            ]),
          ];
    return "\ufeff" + rows.map((r) => r.map(quote).join(",")).join("\r\n");
  }
  root.TerminusCatalog = {
    profiles,
    moments,
    applyMoment,
    context,
    preview,
    build,
    csv,
  };
  if (typeof module !== "undefined") module.exports = root.TerminusCatalog;
})(globalThis);
