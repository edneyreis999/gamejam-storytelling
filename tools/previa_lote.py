"""Gera uma prévia estática e GIF a partir das candidatas registradas de um lote."""
import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT=Path(__file__).resolve().parents[1]
ART=ROOT/'docs/terminus/arte/personagens'

def preview(lot):
    data=json.loads((ART/'controle.json').read_text(encoding='utf-8'))
    entries=[e for e in data['folhas'] if e['lote']==lot and e.get('arquivo_candidato')]
    font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',16)
    frames=[]
    for col in [0,1,2,1]:
        board=Image.new('RGB',(110+len(entries)*130,800),'#e5e3df');draw=ImageDraw.Draw(board)
        draw.text((18,16),f'Terminus · lote {lot} · aguardando aprovação',font=font,fill='#28251e')
        draw.text((18,45),'Prévia 3× · A / repouso / B / repouso · 180 ms',font=font,fill='#51493c')
        for i,e in enumerate(entries):
            x=100+i*130;draw.text((x+60,85),e['id'].title(),font=font,fill='#28251e',anchor='ma')
            sheet=Image.open(ROOT/e['arquivo_candidato'])
            for row,label in enumerate(['Frente','Esquerda','Direita','Costas']):
                y=125+row*166
                if i==0:draw.text((10,y+80),label,font=font,fill='#51493c')
                frame=sheet.crop((col*40,row*55,(col+1)*40,(row+1)*55)).resize((120,165),Image.Resampling.NEAREST)
                board.paste(frame,(x,y),frame)
        frames.append(board)
    target=ART/f'revisoes/lote-{lot}-previa.gif'
    frames[0].save(target,save_all=True,append_images=frames[1:],duration=180,loop=0,disposal=2)
    for index,name in ((0,'a'),(1,'repouso'),(2,'b')):
        frames[index].save(ART/f'revisoes/lote-{lot}-passo-{name}.png')
    return target

if __name__=='__main__':
    import sys
    print(preview(int(sys.argv[1])))
