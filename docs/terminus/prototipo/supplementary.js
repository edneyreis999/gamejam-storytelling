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
  const setbacks = [
    "A equipe rival fecha a passagem. Ghork tenta mudar de direção, mas Rask já interrompeu a disputa. Haverá uma pausa antes da revanche.",
    "Ghork se adianta ao adversário e perde a base. Apoia uma mão no chão, respira e aceita a pausa indicada por Rask.",
    "A equipe preterida reconhece o avanço de Ghork e o força a recuar. Do outro lado, ninguém comemora antes do sinal de Rask.",
    "Os cinco adversários fecham o espaço juntos. Ghork procura uma abertura que já desapareceu. Rask encerra a tentativa.",
    "Torvak fecha a abertura. Ghork recua tarde e ouve o sinal de Rask. Ainda terá outra chance de disputar o título.",
    "A proteção de Neral resiste. Ghork recua até uma barreira na área de serviço enquanto a retirada dos espectadores continua. Precisa recuperar o fôlego antes de voltar.",
  ];
  const reactions = [
    "Fiquei sem saída. Preciso olhar antes de avançar.",
    "Fui mais depressa do que podia. Preciso firmar o apoio.",
    "Achei que sabia como viriam. Preciso observar de novo.",
    "Cinco ao mesmo tempo… Eu estava olhando só para quem vinha na frente.",
    "Ele viu a abertura antes de mim. Ainda quero essa luta.",
    "Ainda consigo chegar nele. Só preciso respirar.",
  ];
  setbacks.forEach((text, i) => {
    C.quests[`setback${i}`] = {
      id: `setback${i}`,
      title: "Recuperar o fôlego",
      place: "Coliseu",
      kind: "setback",
      index: i,
      pages: [
        {
          body: [
            n(text, i === 5 ? "bg-coliseu-servico" : "bg-coliseu-arena"),
            d("Ghork", reactions[i], "exausto"),
            ...(i === 5
              ? []
              : [
                  d(
                    "Guedra",
                    "Um movimento de cada vez. Me mostra o que tentou.",
                    "firme",
                  ),
                ]),
          ],
          choices: [],
        },
      ],
    };
  });
  root.TerminusSupplementary = C;
  if (typeof module !== "undefined") module.exports = C;
})(globalThis);
