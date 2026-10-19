// Recorte de autoria: o runtime não interpreta Markdown nem instruções editoriais.
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const source = path.join(__dirname, "../../storytelling/quests-da-campanha.md");
const text = fs.readFileSync(source, "utf8");
const lines = text.split(/\r?\n/);
const records = [];
const names =
  "Rheed|Criança|Ghork|Virmura|Borun|Sevrak|Meruna|Torvak|Savel|Neral|Elune|Durn|Pirka|Jorvi|Rask|Guedra|Lala|Nyra|Brakka|Nima|Sura|Edrin|Korr|Velka|Tessa|Mavren|Odrik|Lethra|Darvek|Zagra|Dorga|Seldan|Assaltante|Veterano|Iniciante|Ferido|Testemunha";
const speech = new RegExp(`\\*\\*(${names})([^*]*?):\\*\\*\\s*`, "g");
function dialogue(line) {
  line = line.replace(
    /\*\*(?:Depois da vitória|Vitória|Revés|Convite|Na passagem|No canto) — ([^*:]+):\*\*/g,
    "**$1:**",
  );
  const matches = [...line.matchAll(speech)];
  const body = matches.map((m, i) => ({
    speaker: m[1],
    condition: m[2].trim(),
    text: line
      .slice(m.index + m[0].length, matches[i + 1]?.index)
      .replace(/\[[^\]]*\]/g, "")
      .replace(/\*\*/g, "")
      .trim(),
  }));
  if (/\*\*(Mentor|Representante)/.test(line)) {
    for (const m of line.matchAll(
      /(Virmura|Borun|Sevrak|Darvek|Zagra): “([^”]+)”/g,
    ))
      body.push({
        speaker: m[1],
        condition: line.includes("Mentor rejeitado")
          ? "primeiro-rejeitado"
          : `papel:${m[1]}`,
        text: m[2],
      });
  }
  return body;
}
let choiceSpeaker = "Ghork";
for (let i = 0; i < 2252; i++) {
  const line = lines[i];
  if (line.startsWith("### ")) choiceSpeaker = "Ghork";
  if (/^\*\*(Criança|Ghork) —/.test(line))
    choiceSpeaker = line.startsWith("**Criança") ? "Criança" : "Ghork";
  const choice = line.match(/^(?:\d+\.|-) \*\*“(.+?)”\*\*(.*)$/);
  if (choice)
    records.push({
      line: i + 1,
      speaker: choiceSpeaker,
      choice: choice[1],
      response: dialogue(choice[2]),
      question: line.startsWith("-"),
    });
  else if (line.startsWith("**")) {
    const body = dialogue(line);
    if (body.length) records.push({ line: i + 1, body });
  }
}
const output = {
  source: "../storytelling/quests-da-campanha.md",
  sha256: crypto
    .createHash("sha256")
    .update(text.replace(/\r\n/g, "\n"))
    .digest("hex"),
  records,
};
fs.writeFileSync(
  path.join(__dirname, "../quest-script.js"),
  `/* Gerado por scripts/extract-quest-script.cjs; recorte para montagem explícita em campaign.js. */\n(function(root) {\n  const data = ${JSON.stringify(output, null, 2)};\n  root.TerminusQuestScript = data;\n  if (typeof module !== 'undefined') module.exports = data;\n})(globalThis);\n`,
);
