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
              "Você volta a sentir o banco sob as mãos. Rheed espera sem fechar o frasco.",
              "bg-coreto",
            ),
            era: "present",
          },
          d(
            "Rheed",
            s.stage === 1
              ? Object.values(s.progress).every((n) => n >= 1)
                ? "Os três ajudaram Ghork. E agora ele precisa escolher. Está vendo por que demorou tanto para responder?"
                : "Ele mal chegou e já quer saber onde vai parar. Primeiro precisa conseguir andar até lá."
              : s.stage === 2
                ? s.routeProgress === 2
                  ? "Eles voltaram com o levantamento. Ghork agora tem uma conta e algumas coisas para contar a Lala."
                  : "A bandeira já está escolhida. Agora quero ver como eles vão trabalhar juntos lá embaixo."
                : s.completed.includes("invasion")
                  ? "Vamos dar um instante a Ghork. Ele precisa recuperar o fôlego antes de voltar àquela passagem."
                  : s.completed.includes("after4")
                    ? "Ouviu a arquibancada? Não precisamos correr para fora dessa vitória."
                    : "Reconheceu quem está do outro lado? Pois é. Ghork também.",
            "reflexivo",
            "present",
          ),
          d(
            "Rheed",
            "Se quiser guardar outra tentativa para uma rolagem ruim, custa um Ludo. Se preferir guardar a moeda, Ghork pode descansar e pedir revanche. Não vou encerrar a história por causa de um tropeço.",
            "ironico",
            "present",
          ),
        ],
        choices: [],
      },
    ],
  };
  if (typeof module !== "undefined") module.exports = C;
})(globalThis);
