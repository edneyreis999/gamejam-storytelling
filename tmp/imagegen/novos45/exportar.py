from pathlib import Path
import hashlib,json,sys
from PIL import Image,ImageOps,ImageCms
root=Path(__file__).resolve().parents[3]
docs=root/'docs/terminus/arte/bustos/expressoes'
for key in sys.argv[1:]:
    p=docs/'registros'/(key+'.json')
    r=json.loads(p.read_text(encoding='utf-8'))
    src=Path(r['original_gerado'])
    with Image.open(src) as im:
        assert im.mode=='RGBA' and im.getchannel('A').getextrema()==(0,255),key
        scaled=ImageOps.contain(im.convert('RGBa'),(480,640),Image.Resampling.LANCZOS).convert('RGBA')
        out=Image.new('RGBA',(504,672),(0,0,0,0))
        out.paste(scaled,((504-scaled.width)//2,672-scaled.height))
        target=root/r['arquivo'];target.parent.mkdir(parents=True,exist_ok=True)
        out.save(target,icc_profile=ImageCms.ImageCmsProfile(ImageCms.createProfile('sRGB')).tobytes(),optimize=True)
    r['verificacao_tecnica']={'dimensoes':[504,672],'modo':'RGBA','alfa':[0,255],'sRGB':True,'entrelacado':False,'sha256':hashlib.sha256(target.read_bytes()).hexdigest(),'original_sha256':hashlib.sha256(src.read_bytes()).hexdigest(),'exportacao':'Lanczos alfa pré-multiplicado, proporções preservadas, caixa480x640 em canvas504x672, centralizado e alinhado abaixo.'}
    p.write_text(json.dumps(r,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(key)
