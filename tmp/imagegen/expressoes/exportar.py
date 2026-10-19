from pathlib import Path
import hashlib
import json
import sys
from PIL import Image, ImageCms, ImageOps

ROOT = Path(__file__).resolve().parents[3]
DOCS = ROOT / 'docs/terminus/arte/bustos/expressoes'

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

for key in sys.argv[1:]:
    record_path = DOCS / 'registros' / (key + '.json')
    record = json.loads(record_path.read_text(encoding='utf-8'))
    source = Path(record['original_gerado'])
    target = ROOT / record['arquivo']
    with Image.open(source) as image:
        assert image.mode == 'RGBA', (key, image.mode)
        assert image.getchannel('A').getextrema()[0] == 0, key
        resized = ImageOps.contain(image.convert('RGBa'), (504, 672), Image.Resampling.LANCZOS).convert('RGBA')
        result = Image.new('RGBA', (504, 672), (0, 0, 0, 0))
        result.paste(resized, ((504 - resized.width) // 2, 672 - resized.height))
        profile = ImageCms.ImageCmsProfile(ImageCms.createProfile('sRGB')).tobytes()
        target.parent.mkdir(parents=True, exist_ok=True)
        result.save(target, icc_profile=profile, optimize=True)
        record['verificacao_tecnica'] = {'dimensoes': list(result.size), 'modo': result.mode, 'alfa': list(result.getchannel('A').getextrema()), 'sha256': digest(target), 'original_sha256': digest(source), 'exportacao': 'Lanczos com alfa pré-multiplicado, escala proporcional, canvas transparente 504x672, alinhamento inferior, sRGB, PNG não entrelaçado.'}
    with Image.open(target) as check:
        check.verify()
    record_path.write_text(json.dumps(record, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(key + ': 504x672 RGBA')
