(function (root) {
  "use strict";
  const A = root.TerminusArt;
  const L = root.TerminusLanguage;
  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, ['aria-label', 'title', 'alt'].includes(k) ? L.text(v) : v);
    for (const c of children.flat())
      if (c !== null && c !== undefined)
        node.append(typeof c === "string" ? document.createTextNode(L.text(c)) : c);
    return node;
  }
  function picture(asset, alt, className, onError) {
    const img = el("img", { src: asset.preview, alt, class: className });
    img.addEventListener("error", () => {
      const parent = img.parentElement;
      if (!parent) return;
      onError();
      const retry = el("button", {type: "button", class: "retry-image"}, "Carregar imagem novamente");
      retry.addEventListener("click", () => {
        parent.replaceChildren(picture(asset, alt, className, onError));
      });
      parent.append(retry);
    }, { once: true });
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
              ` · ${p.id} · ${p.era === "present" ? "Presente" : "Passado"}`,
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
                  ? "Um busto em cena. Consulte a ficha para verificar arquivo e situação artística."
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
        picture(bg, inspect ? `${bg.name} · ${bg.status}` : bg.name, "background-image", () =>
          backdrop.replaceChildren(
            el(
              "p",
              { class: "asset-error", role: "alert" },
              inspect ? `Não foi possível abrir ${bg.preview}. Fundo previsto: ${bg.name}.` : `Não foi possível abrir o cenário: ${bg.name}.`,
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
            "aria-label": bg.name,
          },
          inspect ? el("span", {}, "FUNDO A PRODUZIR") : null,
          el("strong", {}, bg.name),
          inspect ? el("small", {}, "1280 × 720 · imagem estática") : null,
        ),
      );
    stage.append(backdrop);
    if (p.bust) {
      const bust = A.assets[p.bust],
        left = bust.owner === "Ghork";
      const portrait = el("figure", {
        class: `bust-placeholder ${left ? "left" : "right"}`,
        "aria-label": inspect ? `${bust.name} · ${bust.status}` : bust.name,
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
            inspect ? el("small", {}, "Busto a produzir") : null,
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
          ...(inspect ? [el("span", {}, "OBJETO A PRODUZIR")] : []),
          el("strong", {}, obj.name),
          el(
            "small",
            {},
            p.recipient ? `Entrega a ${p.recipient}` : "",
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
