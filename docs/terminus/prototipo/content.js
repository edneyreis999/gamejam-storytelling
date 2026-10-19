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
    "Um lugar à mesa",
    "Estalagem de Nyra",
    [
      p(
        [
          n(
            "Nyra arruma a mesa para os trabalhadores que estão saindo do turno. Puxa uma cadeira para Ghork.",
          ),
          d(
            "Nyra",
            "Sente aqui um instante? Veja se tem uma porção para cada pessoa da lista. Se faltar, me avise antes de eu tampar a panela.",
            "feliz",
          ),
          n(
            "Ghork encontra o mesmo apelido duas vezes e para antes de riscar um deles. São duas pessoas, afinal. Nyra ri. Vão precisar de um detalhe para distinguir os dois, e cada trabalhador pode opinar no seu.",
          ),
          t(
            "Ghork",
            "Ninguém perguntou pela Prova de Fogo. Só se guardei um prato para eles.",
            "feliz",
          ),
        ],
        [
          c("Separar as porções e deixar os recados claros.", [
            n(
              "Nyra confere as porções. Quando o serviço termina, há um lugar para Ghork à mesa. Ele aceita e fica para comer com os outros.",
            ),
            n(
              "No Coreto, três Ludos caem na sua palma. Rheed espera você guardá-los antes de retomar a história.",
              { era: "present", background: "bg-coreto" },
            ),
          ]),
          c("Pedir a quem acabou de chegar que ajude a conferir a lista.", [
            n(
              "Eles conferem a lista juntos. Um trabalhador corrige um horário; outro se oferece para buscar a tigela que falta. Nyra agradece e manda os dois comerem.",
            ),
            n(
              "No Coreto, três Ludos caem na sua palma. Rheed espera você guardá-los antes de retomar a história.",
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
            "Uma peça da bancada articulada de Durn volta à oficina. Dizem que o metal não presta. Durn pede que Ghork olhe para ele ao explicar o problema. Mas, quando testam o movimento juntos, descobrem que o peso ficou apoiado no lugar errado.",
          ),
          d(
            "Durn",
            "Está vendo onde puseram o peso? Aqui. O pino sustenta a carga deste outro lado.",
            "neutro",
          ),
          d("Ghork", "Você explicou isso quando entregou?", "confuso"),
          d(
            "Durn",
            "Pelo visto, não expliquei direito. Vamos mostrar antes de devolver.",
            "neutro",
          ),
        ],
        [
          c("Mostrar como usar a peça e quanto ela aguenta.", [
            n(
              "A pessoa que devolveu a peça tenta de novo, desta vez com o peso no lugar certo. Durn corrige as instruções enquanto Ghork acompanha. A bancada se move como deveria.",
            ),
            n(
              "No Coreto, três Ludos caem na sua palma. Rheed espera você guardá-los antes de retomar a história.",
              { era: "present", background: "bg-coreto" },
            ),
          ]),
          c("Perguntar qual instrução ficou confusa.", [
            n(
              "Durn relê as instruções. Faziam sentido para quem tinha construído a peça; para os outros, nem tanto. Ele reescreve o aviso e agradece pela pergunta. Ghork sai sabendo explicar o conserto e o que causou o problema.",
            ),
            n(
              "No Coreto, três Ludos caem na sua palma. Rheed espera você guardá-los antes de retomar a história.",
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
    "Uma entrada livre",
    "Coliseu",
    [
      p(
        [
          n(
            "Antes das eliminatórias, Seldan encontra materiais empilhados na entrada do público. A entrega foi autorizada, mas ninguém podia bloquear a passagem. Jorvi ainda espera que decidam quem vai tirar tudo dali.",
          ),
          d(
            "Jorvi",
            "Eu confiro os volumes. Veja para onde eles devem ir, pode ser? Precisamos liberar isso antes de abrir os portões.",
            "neutro",
          ),
          d(
            "Seldan",
            "Deixei para o próximo turno. Foi erro meu. Vou autorizar a retirada agora.",
            "neutro",
          ),
        ],
        [
          c(
            "Acompanhar a retirada dos materiais até liberar a passagem.",
            [
              n(
                "Jorvi confere os volumes um a um. Com a entrada livre, Seldan percorre a passagem e guarda a ordem de retirada.",
              ),
              n(
                "No Coreto, três Ludos caem na sua palma. Rheed espera você guardá-los antes de retomar a história.",
                { era: "present", background: "bg-coreto" },
              ),
            ],
            { passage: true },
          ),
          c(
            "Dividir a conferência com Jorvi e garantir o registro da retirada.",
            [
              n(
                "Ghork confirma para onde vão os materiais, Jorvi confere a quantidade e Seldan registra a autorização. Enfim, há espaço para o público passar.",
              ),
              n(
                "No Coreto, três Ludos caem na sua palma. Rheed espera você guardá-los antes de retomar a história.",
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
