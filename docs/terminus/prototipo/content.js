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
            "Nyra está preparando a mesa para quem chega do trabalho. Ela puxa uma cadeira para Ghork.",
          ),
          d(
            "Nyra",
            "Sente aqui e confira as porções. Se faltar comida para alguém da lista, me avise antes de eu tampar a panela.",
            "atento",
          ),
          n(
            "Um apelido aparece duas vezes na lista. Antes de riscar, Ghork pergunta: são duas pessoas diferentes. Nyra ri e pede que ele acrescente um detalhe para distinguir os dois, com a aprovação deles.",
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
              "Nyra confere as porções e convida Ghork para comer com os outros quando terminar. Ele aceita e fica à mesa.",
            ),
            n(
              "No Coreto, três Ludos caem na sua mão. Rheed espera que você os guarde antes de continuar.",
              { era: "present", background: "bg-coreto" },
            ),
          ]),
          c("Pedir que os recém-chegados ajudem a conferir.", [
            n(
              "Enquanto conferem a lista, um trabalhador corrige o horário e outro se oferece para trazer a tigela que falta. Nyra agradece e os libera para comer.",
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
            "Devolveram uma peça de uma bancada articulada a Durn, dizendo que o metal não prestava. Ele pede que Ghork explique o problema olhando para ele. Ao demonstrarem o movimento, percebem que o peso foi colocado no ponto errado.",
          ),
          d(
            "Durn",
            "Puseram o peso aqui. Mas o pino foi feito para sustentar deste lado.",
            "investigativo",
          ),
          d("Ghork", "Isso estava explicado quando entregou?", "investigativo"),
          d(
            "Durn",
            "Não expliquei direito. Vamos mostrar antes de devolver.",
            "firme",
          ),
        ],
        [
          c("Mostrar primeiro o uso correto e depois o limite.", [
            n(
              "A pessoa que trouxe a peça demonstra que entendeu o uso. Durn anota a correção nas instruções de entrega. Ghork acompanha a conversa; ninguém precisa passar vergonha para aprender.",
            ),
            n(
              "No Coreto, três Ludos caem na sua mão. Rheed espera que você os guarde antes de continuar.",
              { era: "present", background: "bg-coreto" },
            ),
          ]),
          c("Pedir à pessoa que explique qual instrução não entendeu.", [
            n(
              "A instrução só parecia clara para quem havia feito a peça. Durn reescreve o aviso e agradece por apontarem a dúvida. Ghork sai da oficina sabendo explicar o conserto e o erro que o causou.",
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
            "Antes das eliminatórias, Seldan encontra materiais bloqueando a passagem do público. A entrega estava autorizada, mas ninguém podia deixá-los ali. Jorvi espera que decidam quem fará a retirada.",
          ),
          d(
            "Jorvi",
            "Eu confiro os volumes. Você confirma para onde vão? Assim tiramos tudo antes de abrir.",
            "atento",
          ),
          d(
            "Seldan",
            "Deixei isso para o próximo turno. Vou autorizar a retirada agora.",
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
                "Ghork confirma o destino, Jorvi confere a quantidade e Seldan registra quem autorizou a retirada. A passagem fica livre.",
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
