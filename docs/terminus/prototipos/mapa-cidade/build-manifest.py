"""Rebuild hit geometry from PNG alpha; never modifies the source artwork."""
import json
import math
from pathlib import Path
from PIL import Image

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
ART = ROOT / 'assets/terminus/mapa'
GRID = 128

# Layout is interface composition, not approved campaign geography.
PLACES = [
    ('estalagem', 'Estalagem de Nyra', 230, 85, 180, 'estalagem-v1', [('Salão', 'estalagem-nyra-salao-v1'), ('Pátio', 'estalagem-nyra-patio-v2')]),
    ('mercado', 'Mercado de provisões', 45, 289, 200, 'mercado-v2', [('Banca de Jorvi', 'mercado-provisoes-v2')]),
    ('boticario', 'Boticário', 285, 282, 160, 'boticario-v2', [('Loja', 'boticario-v1')]),
    ('contratos', 'Casa de contratos e mapas', 435, 88, 170, 'contratos-v1', [('Sala de consulta', 'casa-contratos-mapas-v1')]),
    ('virmura', 'Guilda de Virmura', 640, 120, 200, 'virmura-v1', [('Recepção', 'guilda-virmura-recepcao-v1'), ('Enfermaria', 'guilda-virmura-enfermaria-v1')]),
    ('borun', 'Guilda de Borun', 490, 287, 190, 'borun-v1', [('Salão de preparação', 'guilda-borun-v1')]),
    ('sevrak', 'Guilda de Sevrak', 735, 293, 160, 'sevrak-v1', [('Sala de estudos', 'guilda-sevrak-v1')]),
    ('treino', 'Espaço de treino', 470, 470, 190, 'treino-v1', [('Pátio de treino', 'espaco-treino-v1')]),
    ('quarta-guilda', 'Quarta guilda veterana', 865, 90, 170, 'quarta-guilda-v1', [('Recepção', 'quarta-guilda-v1')]),
    ('coliseu', 'Coliseu', 1055, 155, 200, 'coliseu-v1', [('Entrada', 'coliseu-entrada-v2'), ('Arena', 'coliseu-arena-v1'), ('Serviço', 'coliseu-servico-v2')]),
    ('oficina', 'Oficina de Durn', 715, 482, 190, 'oficina-v1', [('Oficina', 'oficina-durn-v1')]),
    ('cisterna', 'Cisterna em obras', 945, 478, 175, 'cisterna-v1', [('Obras', 'cisterna-obras-v1')]),
    ('minas', 'Entrada das minas', 1045, 340, 190, 'minas-v1', [('Entrada', 'minas-entrada-v1'), ('Galeria', 'minas-galeria-v1')]),
    ('portal', 'Portal para a Noite da História', 16, 16, 192, 'portal-v3', [('Coreto', 'coreto-noite-historia-v1')]),
]

destinations = []
checks = []
for ident, name, x, y, width, facade, views in PLACES:
    image = Image.open(ART / (facade + '.png'))
    assert image.mode == 'RGBA', facade
    alpha = image.getchannel('A')
    minimum, maximum = alpha.getextrema()
    assert minimum == 0 and maximum >= 254, facade
    rows = []
    # Conservative cells exclude even partly transparent edges and internal holes.
    for row in range(GRID):
        runs = []
        start = None
        for col in range(GRID + 1):
            solid = False
            if col < GRID:
                box = (math.floor(col * image.width / GRID), math.floor(row * image.height / GRID),
                       math.ceil((col + 1) * image.width / GRID), math.ceil((row + 1) * image.height / GRID))
                solid = alpha.crop(box).getextrema()[0] >= 200
            if solid and start is None:
                start = col
            elif not solid and start is not None:
                runs.append([start, col])
                start = None
        rows.append(runs)
    destinations.append(dict(id=ident, name=name, x=x, y=y, width=width,
                             height=160 if ident == 'portal' else round(width * image.height / image.width, 3),
                             fixed=ident == 'portal', facade=facade + '.png', hitRows=rows,
                             views=[dict(name=label, file=file + '.png') for label, file in views]))
    checks.append(dict(id=ident, file=facade + '.png', size=list(image.size),
                       transparentPixels=alpha.histogram()[0], hitCells=sum(b-a for r in rows for a,b in r)))

manifest = dict(status='em desenvolvimento', width=1280, height=720,
                hitGrid=GRID, background='cidade-v2.png', artRoot='../../../../assets/terminus/mapa/',
                viewRoot='../../../../assets/terminus/locais/', destinations=destinations)
(HERE / 'manifest.js').write_text('window.TERMINUS_MAP = ' + json.dumps(manifest, ensure_ascii=False, separators=(',', ':')) + ';\n', encoding='utf-8')
(HERE / 'verificacao').mkdir(exist_ok=True)
(HERE / 'verificacao/alpha.json').write_text(json.dumps(dict(status='em desenvolvimento', grid=GRID, threshold=200, items=checks), ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'{len(destinations)} destinations; {sum(len(d["views"]) for d in destinations)} backgrounds; alpha verified.')
