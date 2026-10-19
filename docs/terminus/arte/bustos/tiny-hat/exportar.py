"""Exporta os originais image_gen registrados, sem alterar os bustos base."""
import hashlib
import json
from pathlib import Path
from PIL import Image, ImageCms, ImageDraw, ImageOps

BASE = Path(__file__).resolve().parent
ROOT = BASE.parents[4]
EXPRESSIONS = ['neutro', 'feliz', 'triste', 'raiva', 'confuso']
PROFILE = ImageCms.ImageCmsProfile(ImageCms.createProfile('sRGB')).tobytes()
records = []
for file in sorted((BASE / 'registros').glob('*.json')):
    record = json.loads(file.read_text(encoding='utf-8'))
    source = Image.open(record['original']).convert('RGBA')
    drawing = source.crop(source.getchannel('A').getbbox())
    drawing = ImageOps.contain(drawing.convert('RGBa'), (480, 648), Image.Resampling.LANCZOS).convert('RGBA')
    output = Image.new('RGBA', (504, 672))
    output.paste(drawing, ((504-drawing.width)//2, 660-drawing.height))
    target = ROOT / 'assets/terminus/bustos/expressoes' / record['id'] / 'tiny-hat' / (record['expression']+'.png')
    target.parent.mkdir(parents=True, exist_ok=True)
    output.save(target, icc_profile=PROFILE, optimize=True)
    record['file'] = target.relative_to(ROOT).as_posix()
    record['sha256'] = hashlib.sha256(target.read_bytes()).hexdigest()
    record['size'] = list(output.size)
    record['alpha'] = list(output.getchannel('A').getextrema())
    record['bbox'] = list(output.getchannel('A').getbbox())
    file.write_text(json.dumps(record, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    records.append(record)
for identity in sorted({r['id'] for r in records}):
    sheet = Image.new('RGB', (1512, 370), '#e8dcc6')
    labels = ImageDraw.Draw(sheet)
    for i, expression in enumerate(['original'] + EXPRESSIONS):
        folder = ROOT / 'assets/terminus/bustos/expressoes' / identity
        target = folder / 'neutro.png' if expression == 'original' else folder / 'tiny-hat' / (expression+'.png')
        if not target.exists():
            continue
        portrait = Image.open(target).resize((252,336), Image.Resampling.LANCZOS)
        sheet.paste(portrait, (i*252,25), portrait)
        labels.text((i*252+10,5), identity+' / '+expression, fill='#211a14')
    sheet.save(BASE / (identity+'.jpg'), quality=93)
print(f'{len(records)} bustos exportados.')
