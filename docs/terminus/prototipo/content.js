/* Terminus — texto experimental. Decisões aprovadas: ../visao-do-jogo.md. */
(function (root) {
  "use strict";
  const quests = {};
  const guilds = {
    A: {
      name: "Mãos do Amparo",
      mentor: "Virmura",
      place: "Guilda de Virmura",
    },
    B: { name: "Caminhos Abertos", mentor: "Borun", place: "Guilda de Borun" },
    C: {
      name: "Ofício da Ascensão",
      mentor: "Sevrak",
      place: "Guilda de Sevrak",
    },
  };
  const pairs = [
    {
      id: "R1",
      names: ["Brakka", "Nima"],
      title: "O turno do pátio",
      place: "Estalagem de Nyra",
      long: false,
    },
    {
      id: "R2",
      names: ["Sura", "Edrin"],
      title: "O nome no registro",
      place: "Guilda de Virmura",
      long: true,
    },
    {
      id: "R3",
      names: ["Korr", "Velka"],
      title: "A armação inteira",
      place: "Oficina de Durn",
      long: false,
    },
    {
      id: "R4",
      names: ["Tessa", "Mavren"],
      title: "O pagamento da cisterna",
      place: "Cisterna em obras",
      long: true,
    },
    {
      id: "R5",
      names: ["Odrik", "Lethra"],
      title: "Uma vaga de exibição",
      place: "Coliseu",
      long: false,
    },
  ];
  const matrix = {
    AX: ["O", "PA", "R", "PB", "O"],
    AY: ["O", "PA", "O", "R", "PB"],
    BX: ["PB", "O", "PA", "O", "R"],
    BY: ["PB", "O", "R", "PA", "O"],
    CX: ["O", "PB", "O", "R", "PA"],
    CY: ["O", "PB", "PB", "O", "R"],
  };
  const n = (text, meta = {}) => ({
    type: "description",
    speaker: "Rheed",
    era: "past",
    text,
    ...meta,
  });
  const d = (speaker, text, expression = "atento", meta = {}) => ({
    type: "dialogue",
    speaker,
    expression,
    era: ["Rheed", "Criança"].includes(speaker) ? "present" : "past",
    text,
    ...meta,
  });
  const t = (speaker, text, expression = "reflexivo", meta = {}) => ({
    type: "thought",
    speaker,
    expression,
    era: ["Rheed", "Criança"].includes(speaker) ? "present" : "past",
    text,
    ...meta,
  });
  const p = (body, choices = []) => ({ body, choices });
  const c = (label, response, flags = {}, cost = 0) => ({
    label,
    response,
    flags,
    cost,
  });
  const q = (id, title, place, pages, kind = "event", meta = {}) => {
    quests[id] = { id, title, place, pages, kind, ...meta };
  };
  q(
    "side1",
    "Uma mesa para quem chega",
    "Estalagem de Nyra",
    [
      p(
        [
          n(
            "Nyra precisa preparar uma mesa para quem chegará depois do serviço. Puxa uma cadeira para Ghork.",
          ),
          d(
            "Nyra",
            "Sente aqui e confira as porções. Se sobrar alguém na lista, me avise antes de eu fechar a panela.",
            "atento",
          ),
          n(
            `Um nome aparece duas vezes. Ele pergunta antes de riscar. São duas pessoas diferentes que deixaram o mesmo apelido. Nyra ri e pede que acrescente uma informação com a qual ambas concordem.`,
          ),
          t(
            "Ghork",
            "Ninguém perguntou pela Prova de Fogo. Só querem saber se o prato está separado.",
            "reflexivo",
          ),
        ],
        [
          c("Separar as porções e deixar os recados claros.", [
            n(
              `Nyra confere o trabalho e oferece companhia à mesa quando ele terminar. Ghork aceita sem transformar a refeição numa dívida que precise pagar com uma façanha.`,
            ),
            n(
              "No Coreto, três Ludos caem na sua mão. Rheed espera que você os guarde antes de continuar.",
              { era: "present", background: "bg-coreto" },
            ),
          ]),
          c("Pedir que os recém-chegados ajudem a conferir.", [
            n(
              `A conferência vira conversa. Um trabalhador corrige o horário e outro oferece trazer a tigela que falta. Nyra agradece a tarefa concluída; não ganhou empregados para sempre.`,
            ),
            n(
              "No Coreto, três Ludos caem na sua mão. Rheed espera que você os guarde antes de continuar.",
              { era: "present", background: "bg-coreto" },
            ),
          ]),
        ],
      ),
    ],
    "side",
    { arc: 1 },
  );
  q(
    "side2",
    "A peça devolvida",
    "Oficina de Durn",
    [
      p(
        [
          n(
            `Durn recebeu de volta uma peça de uma bancada articulada. Pede a Ghork que descreva o movimento olhando para ele, não para a bancada. O relato inicial culpa o metal; a demonstração mostra que a carga foi aplicada num ponto diferente do previsto.`,
          ),
          d(
            "Durn",
            "A carga veio aqui. O pino foi feito para receber deste lado.",
            "investigativo",
          ),
          d("Ghork", "Isso estava explicado quando entregou?", "investigativo"),
          d(
            "Durn",
            "Não estava claro. Vamos mostrar antes de devolver.",
            "firme",
          ),
        ],
        [
          c("Mostrar primeiro o uso correto e depois o limite.", [
            n(
              `A pessoa que trouxe a peça consegue repetir a explicação. Durn anota a alteração na entrega. Ghork reconhece o valor de uma correção que não precisa humilhar ninguém para ser lembrada.`,
            ),
            n(
              "No Coreto, três Ludos caem na sua mão. Rheed espera que você os guarde antes de continuar.",
              { era: "present", background: "bg-coreto" },
            ),
          ]),
          c("Pedir ao usuário que explique onde se confundiu.", [
            n(
              `A dúvida estava numa instrução que parecia clara apenas para quem fabricou a peça. Durn reescreve o aviso e agradece a explicação. Ghork deixa a oficina com uma história pequena que sabe contar até o fim.`,
            ),
            n(
              "No Coreto, três Ludos caem na sua mão. Rheed espera que você os guarde antes de continuar.",
              { era: "present", background: "bg-coreto" },
            ),
          ]),
        ],
      ),
    ],
    "side",
    { arc: 2 },
  );
  q(
    "side3",
    "Uma passagem para o público",
    "Coliseu",
    [
      p(
        [
          n(
            `Antes das eliminatórias, Seldan confere o acesso do público. Uma pilha de materiais está dentro da área de circulação. Tem autorização de entrega, mas não de permanência. Jorvi espera alguém decidir quem a moverá.`,
          ),
          d(
            "Jorvi",
            "Confiro os volumes. Se você conferir o destino, conseguimos tirar tudo antes da abertura.",
            "atento",
          ),
          d(
            "Seldan",
            "Deixei para o próximo turno. Vou assinar a remoção agora.",
            "preocupado",
          ),
        ],
        [
          c(
            "Acompanhar a retirada até liberar a passagem.",
            [
              n(
                "Jorvi confere os volumes. Seldan percorre o acesso desocupado e guarda a ordem de remoção.",
              ),
              n(
                "No Coreto, três Ludos caem na sua mão. Rheed espera que você os guarde antes de continuar.",
                { era: "present", background: "bg-coreto" },
              ),
            ],
            { passage: true },
          ),
          c(
            "Dividir a conferência com Jorvi e cobrar o registro.",
            [
              n(
                `Ghork confere o destino; Jorvi, a quantidade. Seldan registra quem autorizou a retirada. A tarefa termina sem depender de um favor escondido.`,
              ),
              n(
                "No Coreto, três Ludos caem na sua mão. Rheed espera que você os guarde antes de continuar.",
                { era: "present", background: "bg-coreto" },
              ),
            ],
            { passage: true },
          ),
        ],
      ),
    ],
    "side",
    { arc: 3 },
  );

  root.TerminusContent = { quests, guilds, pairs, matrix };
  if (typeof module !== "undefined") module.exports = root.TerminusContent;
})(globalThis);
