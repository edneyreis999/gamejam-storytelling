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
  "# Levantamento de arte da V2",
  "",
  "Status: em desenvolvimento.",
  "",
  "Retrato gerado por `scripts/report-art.cjs`. As fichas completas e os usos estão no inventário HTML. Quantidades são propostas de produção, não imagens já entregues.",
  "",
  "| Categoria | Imagens/componentes com uso |",
  "| --- | ---: |",
  ...["background", "bust", "object", "interface"].map(
    (category, i) =>
      `| ${["Fundos", "Bustos", "Objetos", "Componentes CSS"][i]} | ${of(category).length} |`,
  ),
  "",
  `${new Set(busts.map((a) => a.base)).size} bases agrupam as ${busts.length} imagens de bustos; não são desenhos adicionais. ${owners.length} identidades visuais, com Savel e Neral separados. A criança não possui busto nesta proposta.`,
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
  "Propostas sem uso, excluídas das contagens:",
  "",
  ...records.filter((a) => !a.uses.length).map((a) => `- ${a.id}: ${a.name}.`),
  "",
);
process.stdout.write(rows.join("\n"));
