const fs = require('fs'), path = require('path'), crypto = require('crypto'), assert = require('assert');
const scratch = process.env.DRAGON_CLIFF_ANALYSIS_DIR || path.dirname(__filename);
const syntax = JSON.parse(fs.readFileSync(path.join(scratch, 'syntax.json'), 'utf8'));
const install = process.argv[2] || 'C:/Program Files (x86)/Steam/steamapps/common/Dragon Cliff';
const locPath = path.join(install, 'game_Data/StreamingAssets/Localization-en.json');
const loc = JSON.parse(fs.readFileSync(locPath, 'utf8'));
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
assert.equal(hash(locPath),'e0b9f2d76b71a22f24f788175d10a02a7336594daa9d97bee3b74ffebf7e8a62','Localization differs from studied build; update the analysis before exporting.');
assert.equal(hash(path.join(install,'game_Data/Managed/Assembly-CSharp.dll')),'bab10f7f5357b989588218845c3fcb397beceb7d6cc3ed9cb582b94c8dd2ae7b','Assembly differs from studied build; update the analysis before exporting.');
const out = path.join(process.cwd(), 'docs/docs_externas/dragon-cliff/dados');
fs.mkdirSync(out, {recursive: true});
const types = new Map(syntax.classes.map(c => [c.name, c]));
const enums = {};
for (const e of syntax.enums) {
  let last = -1; const previous = enums[e.name]; enums[e.name] = {};
  for (const m of e.members) {
    if (m.value === null) last++;
    else if (typeof m.value === 'number') last = m.value;
    else throw Error('Unresolved enum: '+e.name+'.'+m.name);
    enums[e.name][m.name] = last;
  }
  if (previous) assert.deepStrictEqual(enums[e.name], previous, 'Conflicting enum name: '+e.name);
}
function ancestry(c, seen = new Set()) {
  if (!c || seen.has(c.name)) return []; seen.add(c.name);
  return [c, ...c.bases.flatMap(b => ancestry(types.get(b), seen))];
}
const derives = (c,b) => ancestry(c).some(x=>x.name===b || x.bases.includes(b));
function member(c, name) {
  for (const t of ancestry(c)) for (const kind of ['properties','fields','methods']) {
    const m=t[kind].find(m=>m.name===name); if(m) return {owner:t.name,kind,...m};
  }
  return null;
}
function simple(c, name, seen=new Set()) {
  const m=member(c,name); if(!m || seen.has(m.owner+'.'+name))return null;
  seen.add(m.owner+'.'+name);
  if(m.value!==null && typeof m.value!=='object') return m.value;
  const returnMatches=[...(m.csharp||'').matchAll(/return\s+([^;]+);/g)];
  const expr=m.value?.csharp || (returnMatches.length===1 && !/\b(if|switch|for|foreach)\s*\(/.test(m.csharp) ? returnMatches[0][1] : null);
  if(!expr) return null;
  if(/^-?\d+(\.\d+)?[fdL]?$/.test(expr)) return Number(expr.replace(/[fdL]$/,''));
  if(/^\w+\.\w+$/.test(expr))return expr;
  if(/^\w+$/.test(expr))return simple(c,expr,seen);
  return null;
}
function enumRef(expr) {
  if(typeof expr!=='string')return null;
  const [type,name]=expr.split('.'); return enums[type] && name in enums[type] ? {id:enums[type][name],codigo:name} : null;
}
const refs=(text,type)=>[...new Set([...text.matchAll(new RegExp('\\b'+type+'\\.(\\w+)','g'))].map(m=>m[1]))].map(n=>({id:enums[type]?.[n]??null,codigo:n}));
const local=(section,key,id)=>loc[section].find(x=>x[key]===id) || null;
const source=c=>({assembly:'Assembly-CSharp.dll',tipo:c.name,linha_descompilada:c.line});
const refMember=(c,n)=>{const m=member(c,n);return m?m.owner+'.'+n:null;};
const baseMeta={schema_version:1,build_steam:'6212414',idioma_textos:'en',natureza:'Referencia externa; extracao estatica da instalacao local. Nao e documentacao aprovada do projeto.'};
const counts={};
function write(file,data){fs.writeFileSync(path.join(out,file),JSON.stringify({...baseMeta,...data},null,2)+'\n');counts[file]=fs.statSync(path.join(out,file)).size;}
function rulesFor(list,extra=[]){return [...new Map([...list.flatMap(c=>ancestry(c)),...extra.map(n=>types.get(n)).filter(Boolean)].map(c=>[c.name,c])).values()].sort((a,b)=>a.name.localeCompare(b.name)).map(c=>({tipo:c.name,bases:c.bases,fonte:source(c),campos:c.fields.map(f=>({nome:f.name,tipo:f.type,valor:f.value})),propriedades:c.properties.map(p=>({nome:p.name,tipo:p.type,valor_constante:simple(c,p.name),regra_csharp:p.csharp})),metodos:c.methods.map(m=>({nome:m.name,parametros:m.signature,regra_csharp:m.csharp})),construtores:c.constructors}));}
function category(id){if(id===enums.ResourceType.NoneGem)return 'SkillBooks';return [[10000,'Timber'],[20000,'Ore'],[30000,'Hides'],[100000,'None'],[110000,'Sword'],[120000,'Staff'],[130000,'Knife'],[140000,'Axe'],[150000,'Spear'],[200000,'None'],[210000,'Robe'],[220000,'Leather'],[230000,'Plate'],[300000,'None'],[400000,'Accessory'],[500000,'Gem'],[600000,'SkillBooks'],[700000,'CoreResource'],[800000,'ProductionRecipe'],[900000,'AdventurerInvitation'],[1000000,'BuildingPermit'],[1100000,'Consumable'],[1200000,'GameItem'],[1300000,'Usable'],[1400000,'Scrolls'],[1500000,'Amulet'],[1600000,'Device']].find(([max])=>id<=max)?.[1]||'None';}
const itemClasses=syntax.classes.filter(c=>derives(c,'ItemTemplateBase')&&!c.modifiers.includes('abstract'));
const equipmentCats=new Set(['Sword','Staff','Knife','Axe','Spear','Robe','Leather','Plate','Accessory','Scrolls','Amulet','Device']);
const equipment=loc.ItemDescriptions.filter(x=>equipmentCats.has(category(x.ItemType))).map(x=>{
  const matches=itemClasses.filter(c=>enumRef(simple(c,'ItemType'))?.id===x.ItemType);
  const code=Object.entries(enums.ResourceType).find(([,v])=>v===x.ItemType)?.[0]??null;
  return {id:x.ItemType,codigo:code,nome:x.Title,descricao:x.Description,categoria:category(x.ItemType),configuracoes:matches.map(c=>({tipo:c.name,tier_base:simple(c,'ItemTierNumber'),heranca:ancestry(c).map(c=>c.name),propriedades_garantidas: ['AdditionalGuarranteedPrimaryGradedAttributes','ExtraGuarranteedSecondaryGradedAttributes'].map(n=>({metodo:refMember(c,n),atributos_mencionados:refs(member(c,n)?.csharp||'','AttributeType')})),regras:'regras-equipamentos.json#'+c.name})),resolucao:matches.length?'template_extraido':'catalogo_localizado; geracao compartilhada ou configuracao nao individualizada'};
});
write('equipamentos.json',{observacoes:['Nao sao instancias sorteadas de um save. Atributos finais dependem do tier, qualidade, categoria, efeitos e aleatoriedade.','atributos_mencionados nao prova concessao incondicional; consultar o metodo com suas condicoes.','Categoria calculada pelas faixas numericas do runtime. Cinco entradas nao existem no enum ResourceType atual: Cloth Gown e quatro Dust; categoria nesses residuos nao confirma funcao jogavel.'],equipamentos:equipment});
const roots=syntax.classes.filter(c=>c.bases.includes('ItemCategoryRootDefault'));
const levels=types.get('ItemExtensions').fields.find(f=>f.name==='RootValues').value.init;
write('propriedades-equipamentos.json',{
 atributos:loc.AttributeLocalizations,qualidades:loc.ItemGradeLocalizations,
 propriedades_adicionais_por_qualidade:{Normal:0,Rare:0,Epic:1,Legendary:2,Ancient:4},
 ressalva_propriedades:'Quantidade base adicional; Crystal Stone, eventos, efeitos Star e garantias do template modificam o resultado.',
 valores_raiz_por_tier:levels.map((v,i)=>({tier:i+1,valor_raiz:v,carga_trabalho:i>=35?1800+(i-35)*20:(i+1)*60,preco_base:50+(i+1)*5})),
 categorias:roots.map(c=>({categoria:simple(c,'Category'),descritores:[...c.csharp.matchAll(/new AttributePotentialDescriptor\(AttributeType\.(\w+), AttributePowerLevel\.(\w+), AttributeStyle\.(\w+)\)/g)].map(m=>({atributo:m[1],id:enums.AttributeType[m[1]],potencia:m[2],estilo:m[3]})),garantias_padrao:refs(member(c,'GetDefaultGurranteedAttributes')?.csharp||'','AttributeType'),primarios_padrao:refs(member(c,'GetDefaultPrimaryAttributes')?.csharp||'','AttributeType'),fonte:source(c)})),
 regras:'regras-equipamentos.json',formula_potencia:{ExtremeHigh:1,High:0.8,Medium:0.6,Low:0.4,ExtremeLow:0.2}
});
write('regras-equipamentos.json',{observacoes:['Expressoes C# descompiladas, nao executadas. Preserve chamadas, heranca e condicoes ao interpretar.','Templates e regras compartilhadas sao registros de referencia, nao configuracao diretamente importavel em outro motor.'],tipos:rulesFor([...itemClasses,...roots,...syntax.classes.filter(c=>derives(c,'GemGeneratorBase')||derives(c,'TeamSetBase'))],['ItemTemplateBase','ItemRoot','AttributePotentialDescriptor','ItemExtensions','ItemCategoryRootDefault','Recipe','ProductionBuildingProfile','BuildingExtensions','School','Item'])});
const skillClasses=syntax.classes.filter(c=>derives(c,'SkillLogicBase')&&!c.modifiers.includes('abstract'));
write('habilidades.json',{habilidades:loc.SkillDescriptions.map(x=>({...x,codigo:Object.entries(enums.SkillType).find(([,v])=>v===x.SkillType)?.[0]??null,implementacoes:skillClasses.filter(c=>enumRef(simple(c,'SkillType'))?.id===x.SkillType).map(c=>({tipo:c.name,comando:simple(c,'SkillCommandType'),categoria:simple(c,'SkillCategory'),elemento:simple(c,'SkillOutputType'),alvos:simple(c,'TargetingType'),talentos:[...new Set([...(member(c,'CreateSkillTalents')?.csharp||'').matchAll(/new (\w+Talent)\(/g)].map(m=>m[1]))],regra:'regras-combate.json#'+c.name}))})),observacao:'Placeholders como {maindamagerate} sao preservados; seus valores sao calculados pelas implementacoes.'});
write('status-e-efeitos.json',{atributos:loc.AttributeLocalizations,efeitos_de_batalha:loc.EffectDescriptions,efeitos_especiais:loc.SpecialEffectLocalizations,elementos:loc.OutputLocalizations,estilos_de_unidade:loc.UnitStyleLocalizations,categorias_de_unidade:loc.UnitCategoryLocalizations,condicoes_de_crescimento:loc.GrowthConditionLocalizations});
const heroes=syntax.classes.filter(c=>c.bases.includes('AdventurerUnitConfigurationBase')&&!c.modifiers.includes('abstract'));
const talentClasses=syntax.classes.filter(c=>derives(c,'IAdventurerTalent')&&!c.modifiers.includes('abstract'));
const talentId=c=>enumRef(simple(c,'GetCorrespondingType'));
const styleTalents={
 Killer:['DodgeEnhancementTalent','EnhancedEffectMasteryTalent','EnhancedResistancesTalent','CritDamageBoostTalent','EfficiencyTalent','StunEnhancementTalent','ShadowOfGhostTalent'],
 Warrior:['VitalityEnhancementTalent','TauntEnhancementTalent','EnhancedEffectMasteryTalent','EnhancedResistancesTalent','EfficiencyTalent','StunEnhancementTalent','RestrictionOfTimeTalent'],
 Defender:['VitalityEnhancementTalent','TauntEnhancementTalent','FurySpeedTalent','EnhancedEffectMasteryTalent','EnhancedResistancesTalent','RecoveryEnhancementTalent','ProtectorTalent'],
 Supporter:['DodgeEnhancementTalent','FurySpeedTalent','EnhancedEffectMasteryTalent','EnhancedResistancesTalent','EfficiencyTalent','RecoveryEnhancementTalent','BlackBloodTalent'],
 Healer:['DodgeEnhancementTalent','FurySpeedTalent','EnhancedEffectMasteryTalent','EnhancedResistancesTalent','EfficiencyTalent','RecoveryEnhancementTalent','DivineHeartTalent']
};
const elementTalent={Fire:'FireShieldTalent',Poison:'PoisonEnhancementTalent',Physical:'PhysicalEnhancementTalent',Shadow:'ShadowEffectEnhancementTalent',Ice:'IceEnhancementTalent',Divine:'DivineEnhancementTalent',Lightening:'LightningShieldTalent'};
const heroData=heroes.map(c=>{
 const unit=enumRef(simple(c,'CorrespondingUnitClass'));assert(unit,c.name);
 const element=simple(c,'OutputType'),style=simple(c,'CorrespondingClassStyle');
 const growth=member(c,'AdventurerGrowthProfile').csharp;
 const potentials={CritDamage:{valor:2,garantido:true}};
 for(const m of growth.matchAll(/\.SetValue\(AttributeType\.(\w+),\s*([\d.]+)(?:,\s*(true|false))?\)/g))potentials[m[1]]={valor:Number(m[2]),garantido:m[3]==='true'};
 const pmap={FocusPotential:'CritRate',StrengthPotential:'Strength',IntelligiencePotential:'Intelligience',AgilityPotential:'Agility',VitalityPotential:'Vitality'};
 for(const m of growth.matchAll(/\.(\w+Potential)\s*=\s*([\d.]+)f?;/g)){assert(pmap[m[1]],m[1]);potentials[pmap[m[1]]]={valor:Math.fround(Number(m[2])),garantido:false};}
 const skills=[...new Map(['DefaultPrimarySkill','DefaultSecondarySkills','DefaultActiveSkills'].flatMap(n=>refs(member(c,n)?.csharp||'','SkillType')).filter(s=>s.codigo!=='None').map(s=>[s.id,s])).values()];
 let t=['HitRateEnhancementTalent','NegativeEffectEnhancementTalent','ElementDamageEnhancementTalent',elementTalent[element?.split('.')[1]]];
 const sk=style?.replace('UnitClassStyle.','').replace(/^Physical|^Spell/,'');
 t.push(...(styleTalents[sk==='Protector'?'Defender':sk]||[]));
 for(const sk of skills)for(const impl of skillClasses.filter(s=>enumRef(simple(s,'SkillType'))?.id===sk.id))t.push(...[...(member(impl,'CreateSkillTalents')?.csharp||'').matchAll(/new (\w+Talent)\(/g)].map(m=>m[1]));
 t=[...new Set(t.filter(Boolean))];t.forEach(n=>assert(types.has(n),n));
 return {...unit,nome:local('UnitDescriptions','UnitClass',unit.id)?.Title,configuracao:c.name,estado:skills.length?'configuracao_com_habilidades; disponibilidade depende de convites':'configuracao_sem_habilidades_padrao; acesso jogavel nao confirmado',elemento:element,funcao:style,convite:enumRef(simple(c,'CorrespondingInvitationType')),preco_base_recrutamento:simple(c,'RecruitmentPriceRaw'),potenciais:potentials,habilidades:skills,talentos:t.map(n=>({tipo:n,...talentId(types.get(n))})),fonte:source(c)};
});
write('herois.json',{observacao:'Potenciais sao parametros de crescimento, nao atributos finais; ver progressao-herois.json. CritRate e CritDamage nao crescem automaticamente como STR/INT/AGI/VIT.',herois:heroData});
let amount=150,inc=100,late=10000,last=-1;const xp=[];
for(let i=0;i<=91;i++){xp.push({nivel:i+1,experiencia_minima:last+1,experiencia_maxima:last+amount,custo_ate_proximo_nivel:amount,pontos_talento_acumulados:Math.min(Math.floor((i+1)/5),17),jogavel:i+1<=90});last+=amount;if(i<59)amount+=inc;else{amount+=late;late+=Math.trunc(late/4);}}
write('progressao-herois.json',{nivel_maximo:90,tabela_experiencia:xp,observacoes:['A origem gera 92 faixas; 91 e 92 sao registros auxiliares, nao niveis jogaveis.','No nivel 90 nao existe compra de proximo nivel; custo_ate_proximo_nivel descreve a faixa gerada, nao permissao de compra.','Intervalos sao experiencia acumulada. O custo para subir depende da experiencia atual.'],regras:{atributos_upgrade:['Strength','Intelligience','PhysicalResistance','FireResistanceResistance','ShadowResistance','IceResistance','LightningResistance','PoisonResistance','DivineResistance','Agility','Vitality'],inicial:'0.5 * potencial * (1 + QualityCoefficient) para atributos evolutiveis nao garantidos; demais seguem UnitGrowthProfile.GetInitializedAttributes.',ganho_por_nivel:'RoundAwayFromZero(RandomFloat(float(potencial)*0.8f, float(potencial)*1f), 4) * (1 + QualityCoefficient) * 1.2',talentos:'1 ponto nos niveis 5,10,...,85; maximo acumulado 17.',reset_talentos_practice_points:10000,efeito_elemental_primario_nivel:15,demais_efeitos_elementais_nivel:30,aposentadoria_retorno_experiencia:0.7},qualidade:{Normal:[0.001,0.2],Rare:[0.2,0.4],Epic:[0.4,0.7],Legendary:[0.7,1.2],Ancient_sem_star:{ramos:[{probabilidade:0.85,intervalo:[1.2,1.8]},{probabilidade:0.15,intervalo:[1.8,2]}]},Ancient_star:{probabilidade:'starchance fornecida pelo contexto de recrutamento',ramos:[{probabilidade_condicional:0.7,intervalo:[2.5,5]},{probabilidade_condicional:0.3,intervalo:[5,7]}]}},fontes:['UnitExtensions.SetupLevelConfigurations','UnitExtensions.CreateAdventurer','UnitExtensions.GenerateGradeQualitySettingValueForAdventurer','UnitGrowthProfile.GetLevelUpChange','AdventurerProfile.LevelUpLogic'],regras_detalhadas:'regras-progressao.json'});
write('talentos.json',{custo_pontos_por_upgrade:1,talentos:talentClasses.map(c=>{const id=talentId(c);return {tipo:c.name,...id,texto:id?local('TalentLocalizations','Type',id.id):null,tier:simple(c,'GetTier'),nivel_maximo:simple(c,'GetMaxLevel'),parametros:Object.fromEntries(c.fields.filter(f=>typeof f.value==='number'||typeof f.value==='boolean').map(f=>[f.name,f.value])),herois:heroData.filter(h=>h.talentos.some(t=>t.tipo===c.name)).map(h=>h.codigo),regra:'regras-talentos.json#'+c.name};}),textos_originais:loc.TalentLocalizations});
write('regras-talentos.json',{tipos:rulesFor(talentClasses,['TalentExtensions','AdventurerUnitConfigurationBase'])});
write('regras-progressao.json',{tipos:rulesFor([...heroes,...syntax.classes.filter(c=>c.bases.includes('UnitStyleConfigurationBase'))],['UnitGrowthProfile','UnitExtensions','AdventurerProfile','DifficultyLevelMeasurement','AttributeModifier','AttributeExtensions'])});
const monsters=syntax.classes.filter(c=>derives(c,'MonsterUnitConfigurationBase')&&!c.modifiers.includes('abstract'));
const monsterData=monsters.map(c=>{const unit=enumRef(simple(c,'CorrespondingUnitClass'));return {id:unit?.id??null,codigo:unit?.codigo??null,nome:unit?local('UnitDescriptions','UnitClass',unit.id)?.Title??null:null,configuracao:c.name,heranca:ancestry(c).map(x=>x.name),funcao:simple(c,'CorrespondingClassStyle'),elemento_constante:simple(c,'GetOutputType'),regras_atributos:refMember(c,'GetMonsterGrowthProfile'),regras_habilidades:refMember(c,'MonsterSkills'),habilidades_mencionadas_na_configuracao:refs(c.csharp,'SkillType'),efeitos_mencionados_na_configuracao:refs(c.csharp,'SpecialEffectType'),regras:'regras-inimigos.json#'+c.name,fonte:source(c)};});
write('inimigos.json',{observacoes:['Uma linha por configuracao concreta de inimigo, incluindo variantes e geradores dinamicos.','HP/dano finais nao sao constantes: dependem de nivel, dificuldade, funcao, efeitos e contexto. Regras herdadas ficam no arquivo associado.','habilidades_mencionadas_na_configuracao nao e uma lista final por encontro; base, dificuldade e overrides podem altera-la.'],inimigos:monsterData});
write('regras-inimigos.json',{tipos:rulesFor(monsters,['UnitGrowthProfile','DifficultyLevelMeasurement','UnitExtensions',...syntax.classes.filter(c=>c.bases.includes('UnitStyleConfigurationBase')).map(c=>c.name)])});
const effectClasses=syntax.classes.filter(c=>derives(c,'BattleEffectBase')||derives(c,'SpecialEffectProcessBase'));
write('regras-combate.json',{tipos:rulesFor([...skillClasses,...effectClasses],['SkillExtensions','BattleUnitExtensions','Adventure','AdventurerBattleUnit'])});
const dungeons=syntax.classes.filter(c=>derives(c,'LevelConfigurationBase'));
const encounterClasses=syntax.classes.filter(c=>c.name.includes('QuestHandler')||/MainChapter\w+[Hh]andler/.test(c.name)||/AdventureResolver/.test(c.name)||/DungeonResolver/.test(c.name));
write('encontros-e-missoes.json',{mapas:loc.AdventureDescriptions,configuracoes_mapas:dungeons.filter(c=>!c.modifiers.includes('abstract')).map(c=>({tipo:c.name,inimigos_mencionados:refs(c.csharp,'UnitClass'),regras:c.name})),missoes:loc.QuestDescriptions,cadeias:loc.QuestChainLocalizations,requisitos:loc.QuestRequirementDescriptions,observacao:'A composicao e os niveis dos encontros estao nas regras, incluindo encontros criados por missoes; nomes localizados isolados nao confirmam conteudo acessivel.',tipos:rulesFor([...dungeons,...encounterClasses],['QuestConfigurations','AdventureLevelConfiguration','LevelConfigurationExtension'])});
write('cidade-e-economia.json',{edificios:loc.BuildingDescriptions,titulos:loc.TownTitleLocalizations,moradores:loc.ResidentLocalizations,contribuicoes:loc.ResidentEffectLocalizations,eventos:loc.TownEventLocalizaitons,efeitos:loc.TownEffectLocalizations,barcos:loc.VehicleLocalizations,viagens:{competencias:loc.JourneyContributionLocalizations,atributos:loc.VehicleAttributeLocalizations,encontros:loc.TripEncounterLocalizations,resultados:loc.TripOutcomeLocalizations,destinos:loc.DestinationLocalizations},tipos:rulesFor(syntax.classes.filter(c=>derives(c,'TownEventProcessorBase')||derives(c,'VehicleGeneratorBase')),['TownTitleRequirement','PlayerProfile','RecruitmentFacility','Shop','ResidentsExtensions','Resident','School','ForgingFacility'])});
write('catalogo-itens.json',{itens:loc.ItemDescriptions.map(x=>({...x,codigo:Object.entries(enums.ResourceType).find(([,v])=>v===x.ItemType)?.[0]??null,categoria:category(x.ItemType)})),categorias:loc.ResourceCategoryDescriptions,encaixes:loc.SocketTypeLocalizations,qualidades:loc.ItemGradeLocalizations});
write('identificadores.json',{observacao:'145 declaracoes de enum consolidadas em 142 nomes. Repeticoes de EndAction e FpsCounterAnchorPositions possuem membros identicos; divergencias fazem a extracao falhar.',enums});
// Verify semantic joins and extraction invariants, not just JSON syntax.
assert(heroData.length>=25);assert(heroData.every(h=>(h.habilidades.length>=2||(h.codigo==='RedMage'&&h.habilidades.length===0))&&h.potenciais.Agility&&h.potenciais.Vitality));
assert(new Set(heroData.map(h=>h.id)).size===heroData.length);
assert(equipment.some(e=>e.codigo==='WoodenSword'));assert(roots.length===8);assert(monsters.length>150);
assert(xp[0].experiencia_minima===0&&xp[1].experiencia_minima===150&&xp[89].pontos_talento_acumulados===17);
for(let i=1;i<xp.length;i++)assert(xp[i].experiencia_minima===xp[i-1].experiencia_maxima+1);
for(const h of heroData){for(const s of h.habilidades)assert(local('SkillDescriptions','SkillType',s.id),h.codigo+' skill '+s.codigo);for(const t of h.talentos)assert(t.id!==undefined && talentClasses.some(c=>c.name===t.tipo),h.codigo+' talent '+t.tipo);}
const files=Object.keys(counts).sort().map(f=>{JSON.parse(fs.readFileSync(path.join(out,f),'utf8'));return {arquivo:f,bytes:counts[f],sha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(out,f))).digest('hex')};});
write('manifesto.json',{data_analise:'2026-10-17',fontes:[{arquivo:'game_Data/StreamingAssets/Localization-en.json',sha256:crypto.createHash('sha256').update(fs.readFileSync(locPath)).digest('hex')},{arquivo:'game_Data/Managed/Assembly-CSharp.dll',sha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(install,'game_Data/Managed/Assembly-CSharp.dll'))).digest('hex')}],metodo:{descompilador:'ILSpy 9.1.0.7988',parser:'Roslyn C# do SDK .NET 8.0.301',execucao_do_jogo:false,avaliacao_dinamica_de_formulas:false,normalizacao:'Enums resolvidos, heranca preservada, literais extraidos, catalogos ligados por ID; tabela de XP reproduz a recorrencia inteira do codigo.'},contagens:{equipamentos:equipment.length,templates_itens:itemClasses.length,herois:heroData.length,inimigos:monsterData.length,habilidades_localizadas:loc.SkillDescriptions.length,talentos_implementados:talentClasses.length,efeitos_batalha:loc.EffectDescriptions.length,efeitos_especiais:loc.SpecialEffectLocalizations.length,atributos:loc.AttributeLocalizations.length,itens:loc.ItemDescriptions.length,tiers_raiz:levels.length},arquivos:files,validacao:{jsons_parseados:files.length,joins_herois_habilidades_talentos:true,faixas_experiencia_contiguas:true},limites:['Presenca em catalogo ou codigo nao prova acesso em gameplay.','Regras C# sao evidencia estatica, nao um simulador portavel.','Descricao localizada pode estar antiga; prevalece a regra de runtime identificada.','Variantes dinamicas de inimigos nao foram enumeradas como instancias finais.']});
console.log(JSON.stringify({contagens:JSON.parse(fs.readFileSync(path.join(out,'manifesto.json'))).contagens,arquivos:Object.keys(counts).length,bytes:Object.values(counts).reduce((a,b)=>a+b,0)},null,2));
