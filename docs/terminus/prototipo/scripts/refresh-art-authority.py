"""Atualiza o recorte local das fichas; não gera ilustrações."""

import json
from pathlib import Path
import re

prototype = Path(__file__).resolve().parents[1]
terminus = prototype.parent
profiles = {}
for path in sorted((terminus / "personagens").glob("*.md")):
    if path.name == "README.md":
        continue
    text = path.read_text()
    appearance = re.search(
        r"^- \*\*Raça, idade e aparência(?: no livro)?:\*\* (.*)", text, re.M
    )
    profiles[path.stem] = {
        "name": text.splitlines()[0].removeprefix("# "),
        "source": f"../personagens/{path.name}",
        "appearance": appearance.group(1)
        if appearance
        else "Consultar ficha: aparência ainda precisa de confirmação.",
        "notes": text[text.index("## 1.") : text.index("## 2.")],
    }

places = {}
for path in sorted((terminus / "locais").glob("*.md")):
    if path.name == "README.md":
        continue
    text = path.read_text()
    places[path.stem] = {
        "source": f"../locais/{path.name}",
        "brief": text[text.index("## 4.") : text.index("## 6.")].strip(),
    }

data = json.dumps({"characters": profiles, "places": places}, ensure_ascii=False, indent=2)
target = prototype / "art-authority.js"
target.write_text(
    "/* Gerado por scripts/refresh-art-authority.py a partir das fichas; edite as fontes. */\n"
    "(function (root) {\n"
    f"const data = {data};\n"
    "root.TerminusArtAuthority = data;\n"
    'if (typeof module !== "undefined") module.exports = data;\n'
    "})(globalThis);\n"
)
print(f"Atualizado {target.name}: {len(profiles)} personagens e {len(places)} locais.")
