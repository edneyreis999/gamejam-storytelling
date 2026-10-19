// Atualiza o recorte local das fichas; não gera ilustrações.
const fs = require("node:fs");
const path = require("node:path");
const prototype = path.resolve(__dirname, "..");
const terminus = path.dirname(prototype);
const characters = {},
  places = {};
for (const file of fs
  .readdirSync(path.join(terminus, "personagens"))
  .filter((f) => f.endsWith(".md") && f !== "README.md")
  .sort()) {
  const text = fs.readFileSync(
    path.join(terminus, "personagens", file),
    "utf8",
  );
  const appearance = text.match(
    /^- \*\*Raça, idade e aparência(?: no livro)?:\*\* (.*)/m,
  );
  characters[path.basename(file, ".md")] = {
    name: text.split(/\r?\n/)[0].replace(/^# /, ""),
    source: "../personagens/" + file,
    appearance: appearance
      ? appearance[1]
      : "Consultar ficha: aparência ainda precisa de confirmação.",
    notes: text.slice(text.indexOf("## 1."), text.indexOf("## 2.")),
  };
}
for (const file of fs
  .readdirSync(path.join(terminus, "locais"))
  .filter((f) => f.endsWith(".md") && f !== "README.md")
  .sort()) {
  const text = fs.readFileSync(path.join(terminus, "locais", file), "utf8");
  places[path.basename(file, ".md")] = {
    source: "../locais/" + file,
    brief: text.slice(text.indexOf("## 4."), text.indexOf("## 6.")).trim(),
  };
}
fs.writeFileSync(
  path.join(prototype, "art-authority.js"),
  "/* Gerado por scripts/refresh-art-authority.cjs a partir das fichas; edite as fontes. */\n(function(root) {\nconst data = " +
    JSON.stringify({ characters, places }, null, 2) +
    ';\nroot.TerminusArtAuthority=data;\nif(typeof module!=="undefined") module.exports=data;\n})(globalThis);\n',
);
console.log(
  `Atualizado art-authority.js: ${Object.keys(characters).length} personagens e ${Object.keys(places).length} locais.`,
);
