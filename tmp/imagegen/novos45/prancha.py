from pathlib import Path
from PIL import Image,ImageDraw
import sys
root=Path(__file__).resolve().parents[3]
keys=sys.argv[1:]
out=Image.new('RGB',(504*len(keys),710),'#6c7278')
d=ImageDraw.Draw(out)
for i,key in enumerate(keys):
    ident,emotion=key.rsplit(':',1)
    im=Image.open(root/'assets/terminus/bustos/expressoes'/ident/(emotion+'.png'))
    out.paste(im,(i*504,38),im)
    d.text((i*504+12,12),key,fill='white')
p=root/'tmp/imagegen/novos45'/('prancha-'+keys[0].replace(':','-')+'.jpg')
out.save(p,quality=95)
print(p)
