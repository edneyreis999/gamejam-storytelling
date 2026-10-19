// Somente leitura: imprime um retrato do catálogo para documentação.
const { build } = require("../catalog.js");
const files = require("../asset-files.js");
const portraits = Object.values(files.portraits);
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
  `Retrato gerado por \`scripts/report-art.cjs\`. As fichas completas e os usos estão no inventário HTML. O registro integra ${Object.keys(files.backgrounds).length} fundos, ${portraits.reduce((sum, portrait) => sum + Object.keys(portrait.files).length, 0)} expressões produzidas para ${portraits.length} visuais e 15 artes do mapa. A tabela conta referências usadas nas passagens ou na navegação, incluindo representações provisórias; não é uma encomenda de novos desenhos.`,
  "",
  "| Categoria | Imagens/componentes com uso |",
  "| --- | ---: |",
  ...["background", "bust", "object", "interface"].map(
    (category, i) =>
      `| ${["Fundos", "Bustos", "Objetos", "Interface e mapa"][i]} | ${of(category).length} |`,
  ),
  "",
  `${new Set(busts.map((a) => a.base)).size} bases agrupam as ${busts.length} imagens de bustos; não são desenhos adicionais. ${owners.length} identidades visuais, com Savel e Neral separados. A criança, Lala e figurantes com arte produzida usam seus arquivos; vozes coletivas sem correspondência permanecem provisórias.`,
  "",
  `${of("object").filter((a) => a.preview).length} objetos usados possuem ilustração associada. As imagens permanecem em avaliação artística; consulte a [galeria dos objetos](../arte/objetos/galeria.md).`,
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
  ["interface", "Interface e mapa"],
]) {
  rows.push(
    "",
    `## ${title}`,
    "",
    "| ID | Desenho | Usos |",
    "| --- | --- | ---: |",
  );
  for (const a of of(category))
    rows.push(`| ${a.id} | ${a.name} | ${a.uses.length} |`);
}
rows.push(
  "",
  "## Cobertura",
  "",
  `${uses.length} relações entre arte e apresentação; ${variants.length} variantes de apresentação/texto indexadas. Repetições em contextos diferentes não multiplicam a quantidade de desenhos.`,
  "",
  "Referências sem passagem de roteiro indexada, excluídas das contagens (fundos de locais continuam acessíveis pelo mapa):",
  "",
  ...records.filter((a) => !a.uses.length).map((a) => `- ${a.id}: ${a.name}.`),
  "",
);
process.stdout.write(rows.join("\n"));
