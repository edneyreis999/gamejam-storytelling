(function (root) {
  "use strict";
  const A = root.TerminusArt;
  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
    for (const c of children.flat())
      if (c !== null && c !== undefined)
        node.append(typeof c === "string" ? document.createTextNode(c) : c);
    return node;
  }
  function picture(asset, alt, className, onError) {
    const img = el("img", { src: asset.preview, alt, class: className });
    img.addEventListener("error", () => onError(), { once: true });
    return img;
  }
  function render(p, { onAsset, inspect = false, reduced = false } = {}) {
    const wrap = el("section", {
      class: "scene-shell",
      "aria-label": "Cena da visual novel",
    });
    if (inspect) {
      const links = p.assets.map((id) => {
        const a = A.assets[id];
        const b = el("button", { type: "button", class: "asset-chip" }, a.name);
        b.addEventListener("click", () => onAsset(id));
        return b;
      });
      wrap.append(
        el(
          "aside",
          { class: "direction-strip", "aria-label": "Direção de arte" },
          el(
            "div",
            {},
            el(
              "strong",
              {},
              p.type === "description"
                ? "Painel descritivo"
                : p.type === "thought"
                  ? "Pensamento"
                  : p.type === "action"
                    ? "Ação de objeto"
                    : "Diálogo",
            ),
            el(
              "span",
              {},
              ` · ${p.id} · ${p.era === "present" ? "Presente / colorido" : "Passado / pastel"}`,
            ),
          ),
          el("div", { class: "asset-links" }, ...links),
          el(
            "small",
            {},
            p.type === "description"
              ? "Sem nome ou busto próprio. A composição anterior permanece atrás."
              : p.recipient
                ? `Entrega de objeto → ${p.recipient}`
                : p.bust
                  ? "Um busto em cena. A silhueta representa uma imagem a produzir."
                  : "Sem busto nesta passagem.",
          ),
        ),
      );
    }
    const stage = el("div", {
      class: `vn-stage ${p.type === "description" ? "describing" : ""} ${reduced ? "reduce-motion" : ""}`,
      "data-passage": p.id,
    });
    const backdrop = el("div", { class: "scene-backdrop" });
    const bg = A.assets[p.background];
    if (bg.preview)
      backdrop.append(
        picture(bg, `${bg.name} · ${bg.status}`, "background-image", () =>
          backdrop.replaceChildren(
            el(
              "p",
              { class: "asset-error", role: "alert" },
              `Não foi possível abrir ${bg.preview}. Fundo previsto: ${bg.name}.`,
            ),
          ),
        ),
      );
    else
      backdrop.append(
        el(
          "div",
          {
            class: "background-placeholder",
            "aria-label": `Fundo a produzir: ${bg.name}`,
          },
          el("span", {}, "FUNDO A PRODUZIR"),
          el("strong", {}, bg.name),
          el("small", {}, "1280 × 720 · imagem estática"),
        ),
      );
    stage.append(backdrop);
    if (p.bust) {
      const bust = A.assets[p.bust],
        left = bust.owner === "Ghork";
      const portrait = el("figure", {
        class: `bust-placeholder ${left ? "left" : "right"}`,
        "aria-label": `Busto a produzir: ${bust.name}`,
      });
      const silhouette = el(
        "div",
        { class: "silhouette", "aria-hidden": "true" },
        el("div", { class: "silhouette-head" }),
        el("div", { class: "silhouette-body" }),
      );
      if (bust.preview)
        portrait.append(
          picture(bust, bust.name, "bust-image", () =>
            portrait.replaceChildren(
              silhouette,
              el(
                "figcaption",
                { role: "alert" },
                `Imagem indisponível: ${bust.name}`,
              ),
            ),
          ),
        );
      else
        portrait.append(
          silhouette,
          el(
            "figcaption",
            {},
            el("strong", {}, bust.owner),
            el("span", {}, bust.name.split(" — ")[1]),
            el("small", {}, "Busto a produzir"),
          ),
        );
      stage.append(portrait);
    }
    if (p.object) {
      const obj = A.assets[p.object];
      const object = el("div", {
        class: `scene-object ${obj.preview ? "has-image" : ""} ${p.operation === "give" ? "handover" : ""}`,
        "aria-label": `${obj.name}${p.recipient ? `, entrega a ${p.recipient}` : ""}`,
      });
      if (obj.preview)
        object.append(
          picture(obj, obj.name, "object-image", () =>
            object.replaceChildren(
              el("p", { role: "alert" }, `Imagem indisponível: ${obj.name}`),
            ),
          ),
        );
      else
        object.append(
          el("span", {}, "OBJETO A PRODUZIR"),
          el("strong", {}, obj.name),
          el(
            "small",
            {},
            p.recipient ? `Entrega a ${p.recipient}` : "Destaque no centro",
          ),
        );
      stage.append(object);
    }
    const panel = el("article", {
      class: p.type === "description" ? "description-panel" : "dialogue-panel",
      tabindex: "-1",
      "aria-label":
        p.type === "description"
          ? "Descrição"
          : p.type === "thought"
            ? `${p.speaker}, pensamento`
            : p.type === "action"
              ? "Ação visual"
              : `Fala de ${p.speaker}`,
    });
    if (p.type === "dialogue" || p.type === "thought")
      panel.append(
        el(
          "div",
          { class: "speaker-plate" },
          p.speaker + (p.type === "thought" ? " · pensamento" : ""),
        ),
      );
    panel.append(el("p", {}, p.text));
    stage.append(panel);
    wrap.append(stage);
    return wrap;
  }
  root.TerminusStageView = { render };
})(globalThis);
