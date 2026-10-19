"""Exporta os originais do image_gen sem alterar proporções ou o canal alfa."""
import hashlib
import json
from pathlib import Path
from PIL import Image, ImageCms, ImageOps

DOC = Path(__file__).resolve().parent
ROOT = DOC.parents[3]
OUT = ROOT / "assets/terminus/objetos"
OUT.mkdir(parents=True, exist_ok=True)
sources = json.loads((DOC / "fontes-geradas.json").read_text(encoding="utf-8-sig"))
matrix = json.loads((DOC / "matriz.json").read_text(encoding="utf-8"))
profile = ImageCms.ImageCmsProfile(ImageCms.createProfile("sRGB")).tobytes()
checks = []
for item in matrix["objects"]:
    if item["id"] not in sources:
        continue
    source = Path(sources[item["id"]])
    original = Image.open(source).convert("RGBA")
    bbox = original.getchannel("A").getbbox()
    if not bbox or original.getchannel("A").getextrema()[0] != 0:
        raise ValueError(f"Imagem sem transparência: {source}")
    drawing = original.crop(bbox)
    drawing = ImageOps.contain(drawing, (620, 440), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (720, 540), (0, 0, 0, 0))
    canvas.paste(drawing, ((720-drawing.width)//2, (540-drawing.height)//2))
    target = OUT / (item["id"] + ".png")
    canvas.save(target, icc_profile=profile, optimize=True)
    check = Image.open(target)
    alpha = check.getchannel("A")
    entry = {"id": item["id"], "size": list(check.size), "mode": check.mode,
             "alpha_extrema": list(alpha.getextrema()), "bbox": list(alpha.getbbox()),
             "srgb": bool(check.info.get("icc_profile")), "interlaced": bool(check.info.get("interlace")),
             "sha256": hashlib.sha256(target.read_bytes()).hexdigest()}
    checks.append(entry)
    item.update(status="produzido; em avaliação artística", original=str(source))
(DOC / "matriz.json").write_text(json.dumps(matrix, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")
(DOC / "verificacao-tecnica.json").write_text(json.dumps({"status":"em desenvolvimento", "count":len(checks), "objects":checks}, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")
print(f"{len(checks)}/35 objetos exportados em PNG RGBA 720 × 540.")
