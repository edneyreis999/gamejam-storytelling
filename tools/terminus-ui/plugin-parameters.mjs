import fs from 'node:fs';
import vm from 'node:vm';

export function readPlugins(file){const context={};vm.runInNewContext(fs.readFileSync(file,'utf8'),context);return structuredClone(context.$plugins);}
export function pluginDefaults(file,{expandStructs=[]}={}){
    const source=fs.readFileSync(file,'utf8'),header=source.match(/\/\*:[\s\S]*?\*\//)[0];
    function schema(block){
        const fields={};let field;
        for(const line of block.split(/\r?\n/)){
            const param=line.match(/^ \* @param (.+)$/);
            if(param)field=fields[param[1]]={value:'',type:''};
            const entry=line.match(/^ \* @(default|type)(?: (.*))?$/);
            if(entry&&field)field[entry[1]==='default'?'value':'type']=entry[2]||'';
        }
        return fields;
    }
    const structs=Object.fromEntries([...source.matchAll(/\/\*~struct~([^:\s]+):\s*\n([\s\S]*?)\*\//g)].map(match=>[match[1],schema(match[2])]));
    function materialize(fields,provided={}){
        const result={...Object.fromEntries(Object.entries(fields).map(([name,field])=>[name,field.value])),...provided};
        for(const [name,field] of Object.entries(fields)){
            const type=field.type.match(/^struct<([^>]+)>(\[\])?$/);
            if(!type||!expandStructs.includes(type[1])||!result[name])continue;
            const nested=structs[type[1]];
            if(!nested)throw Error('Missing struct '+type[1]+' in '+file);
            const value=JSON.parse(result[name]);
            result[name]=JSON.stringify(type[2]?value.map(item=>JSON.stringify(materialize(nested,JSON.parse(item)))):materialize(nested,value));
        }
        return result;
    }
    const parameters=materialize(schema(header));
    return {description:header.match(/@plugindesc (.*)/)[1],parameters};
}
export function decode(value){
    if(Array.isArray(value))return value.map(decode);
    if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,decode(v)]));
    if(typeof value!=='string')return value;
    try{const parsed=JSON.parse(value);if(Array.isArray(parsed))return parsed.map(decode);if(parsed&&typeof parsed==='object')return Object.fromEntries(Object.entries(parsed).map(([k,v])=>[k,decode(v)]));return parsed;}
    catch{return value;}
}
export function setParameter(parameters,fields,value){
    function update(node,index){
        if(index===fields.length)return typeof node==='string'?(node.startsWith('"')?JSON.stringify(value):String(value)):value;
        const encoded=typeof node==='string',record=encoded?JSON.parse(node):node;
        const key=fields[index];if(!(key in record))throw Error('Unknown plugin parameter '+fields.join('/'));
        record[key]=update(record[key],index+1);return encoded?JSON.stringify(record):record;
    }
    update(parameters,0);
}
export function leaves(value,prefix=[]){
    if(value&&typeof value==='object')return Object.entries(value).flatMap(([k,v])=>leaves(v,[...prefix,k]));
    return [{path:prefix,value}];
}
