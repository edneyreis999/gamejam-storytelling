// Somente leitura: imprime um retrato do catálogo para documentação.
const { build } = require("../catalog.js");
const { records, uses, variants } = build();
const used = records.filter((a) => a.uses.length);
const of = (category) => used.filter((a) => a.category === category);
const busts = of("bust");
const owners = [...new Set(busts.map((a) => a.owner))].sort((a, b) =>
  a.localeCompare(b, "pt-BR"),
);
const rows = [
  "# Inventário de arte da V3",
  "",
  "Status: em desenvolvimento.",
  "",
  "Retrato gerado por `scripts/report-art.cjs`. As fichas completas e os usos estão no inventário HTML. O registro integra 19 fundos e 210 expressões produzidas para 42 visuais. A tabela conta apenas referências usadas nas passagens, incluindo representações provisórias; não é uma encomenda de novos desenhos.",
  "",
  "| Categoria | Imagens/componentes com uso |",
  "| --- | ---: |",
  ...["background", "bust", "object", "interface"].map(
    (category, i) =>
      `| ${["Fundos", "Bustos", "Objetos", "Componentes CSS"][i]} | ${of(category).length} |`,
  ),
  "",
  `${new Set(busts.map((a) => a.base)).size} bases agrupam as ${busts.length} imagens de bustos; não são desenhos adicionais. ${owners.length} identidades visuais, com Savel e Neral separados. A criança usa o visual produzido. Lala e figurantes sem arquivo permanecem provisórios.`,
  "",
  "## Bustos por personagem",
  "",
  "| Personagem | Imagens | Bases | Variantes |",
  "| --- | ---: | ---: | --- |",
  ...owners.map((owner) => {
    const list = busts.filter((a) => a.owner === owner);
    return `| ${owner} | ${list.length} | ${new Set(list.map((a) => a.base)).size} | ${list.map((a) => a.name.replace(`${owner} — `, "")).join("; ")} |`;
  }),
];
for (const [category, title] of [
  ["background", "Fundos"],
  ["object", "Objetos"],
]) {
  rows.push(
    "",
    `## ${title}`,
    "",
    "| ID | Desenho | Passagens com uso |",
    "| --- | --- | ---: |",
  );
  for (const a of of(category))
    rows.push(`| ${a.id} | ${a.name} | ${a.uses.length} |`);
}
rows.push(
  "",
  "## Cobertura",
  "",
  `${uses.length} relações entre imagem e passagem; ${variants.length} variantes de apresentação/texto indexadas. Repetições em contextos diferentes não multiplicam a quantidade de desenhos.`,
  "",
  "Referências sem passagem de roteiro indexada, excluídas das contagens (fundos de locais continuam acessíveis pelo mapa):",
  "",
  ...records.filter((a) => !a.uses.length).map((a) => `- ${a.id}: ${a.name}.`),
  "",
);
process.stdout.write(rows.join("\n"));
