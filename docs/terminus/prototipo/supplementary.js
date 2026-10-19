/* Passagens de intervalo e revés também participam do roteiro e do inventário. */
(function (root) {
  "use strict";
  const C =
    typeof module !== "undefined"
      ? require("./content.js")
      : root.TerminusContent;
  const n = (text, background) => ({
    type: "description",
    speaker: "Rheed",
    text,
    era: "past",
    background,
  });
  const d = (speaker, text, expression = "atento", era = "past") => ({
    type: "dialogue",
    speaker,
    text,
    expression,
    era,
  });
  C.quests.coreto = {
    id: "coreto",
    title: "Um intervalo com Rheed",
    place: "Coreto da Noite da História",
    kind: "interlude",
    pages: [
      {
        body: (s) => [
          {
            ...n(
              "Você volta a sentir o banco sob as mãos. Rheed espera, ainda com o frasco aberto.",
              "bg-coreto",
            ),
            era: "present",
          },
          d(
            "Rheed",
            s.stage === 1
              ? Object.values(s.progress).every((n) => n >= 1)
                ? "Os três ajudaram. Agora ele precisa escolher um. Não parece tão simples depois de conhecer cada um, não é?"
                : "Mal passou pelo portão e já está planejando um futuro grandioso. Vamos primeiro pôr esse rapaz de pé?"
              : s.stage === 2
                ? s.routeProgress === 2
                  ? "Enfim, de volta das minas. Tem levantamento para entregar, contas para acertar... e Lala esperando para saber como foi."
                  : "Pois bem, Ghork já tem sua guilda. Vamos ver como eles se entendem com uma mina para explorar."
                : s.completed.includes("invasion")
                  ? "Um instante. Deixe Ghork recuperar o fôlego antes de mandá-lo de volta àquela passagem."
                  : s.completed.includes("after4")
                    ? "Ouça essa torcida! Vamos deixar que ele aproveite mais um pouco. Essa parte ele conquistou."
                    : "Conhece alguns daqueles rostos do outro lado da arena, não conhece? Ghork também.",
            (s.stage === 1 ? (Object.values(s.progress).every((n) => n >= 1) ? "neutro" : "feliz") : (s.stage === 2 ? (s.routeProgress === 2 ? "neutro" : "feliz") : (s.completed.includes("invasion") ? "neutro" : "feliz"))),
            "present",
          ),
          d(
            "Rheed",
            "Um Ludo dá direito a outra rolagem. Mas pode guardar a moeda. Se Ghork perder, ele descansa e pede revanche. Achou que eu ia deixar um tropeço acabar com a história?",
            "feliz",
            "present",
          ),
        ],
        choices: [],
      },
    ],
  };
  if (typeof module !== "undefined") module.exports = C;
})(globalThis);
