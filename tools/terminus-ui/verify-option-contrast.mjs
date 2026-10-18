import fs from 'node:fs';
import assert from 'node:assert/strict';
import {openRuntime} from './test-runtime.mjs';

const native=process.argv.includes('--native');
const runtime=await openRuntime({native,fixtureName:'option-contrast-native'});
const {page}=runtime;
const results=[];
function luminance(hex){
    const rgb=hex.match(/[0-9a-f]{2}/gi).map(v=>parseInt(v,16)/255).map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4);
    return rgb[0]*0.2126+rgb[1]*0.7152+rgb[2]*0.0722;
}
function contrast(a,b){const x=luminance(a),y=luminance(b);return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05);}
try{
    await page.evaluate(()=>SceneManager.push(Scene_Options));
    await page.waitForFunction(()=>SceneManager._scene?.constructor.name==='Scene_Options'&&SceneManager._scene.isStarted()&&ImageManager.isReady());
    for(const hoverSelect of [true,false]){
        await page.evaluate(value=>{ConfigManager.uiHoverSelect=value;SceneManager._scene._optionsWindow.select(1);},hoverSelect);
        for(const hovered of [1,2,-1]){
            const point=await page.evaluate(index=>{
                if(index<0)return {x:5,y:5};
                const w=SceneManager._scene._optionsWindow,r=w.itemRect(index);
                const p=w.worldTransform.apply(new Point(r.x+400+w.padding-w.origin.x,r.y+r.height/2+w.padding-w.origin.y));
                return {x:p.x,y:p.y};
            },hovered);
            await page.mouse.move(point.x,point.y);
            await page.waitForFunction(index=>SceneManager._scene._optionsWindow._coretoHoverIndex===index,hovered);
            const drawings=await page.evaluate(()=>{
                const rows=[];
                for(const w of [SceneManager._scene._optionsWindow,SceneManager._scene._categoryWindow]){
                    const b=w.contents,original=b.drawText;
                    b.drawText=function(text,x,y,width,height,...args){
                        if(String(text).trim()){
                            const sx=Math.floor(x+2),sy=Math.floor(y+2);
                            const background=b.getAlphaPixel(sx,sy)===255?b.getPixel(sx,sy):w.contentsBack.getPixel(sx,sy);
                            rows.push({window:w.constructor.name,index:w._coretoDrawingIndex,text,color:b.textColor,background,opacity:b.paintOpacity});
                        }
                        return original.call(this,text,x,y,width,height,...args);
                    };
                    try{for(const i of w===SceneManager._scene._optionsWindow?[1,2]:[0,1])w.redrawItem(i);}
                    finally{b.drawText=original;}
                }
                return rows;
            });
            for(const drawing of drawings){
                drawing.contrast=contrast(drawing.color,drawing.background);
                assert(drawing.contrast>=4.5,JSON.stringify({native,hoverSelect,hovered,...drawing}));
                assert.equal(drawing.opacity,255);
            }
            results.push({hoverSelect,hovered,drawings});
        }
    }
    const pixels=await page.evaluate(()=>{const b=Bitmap.snap(SceneManager._scene),data=b.canvas.toDataURL();b.destroy();return data;});
    const output='.local-tools/options-review/contrast-'+(native?'native':'browser');
    fs.writeFileSync(output+'.png',Buffer.from(pixels.split(',')[1],'base64'));
    assert.deepEqual(runtime.errors,[]);
    fs.writeFileSync(output+'.json',JSON.stringify({native,results,errors:runtime.errors},null,2));
    console.log(JSON.stringify({native,states:results.length,minimumContrast:Math.min(...results.flatMap(r=>r.drawings.map(d=>d.contrast))),errors:runtime.errors}));
}finally{await runtime.close();}
