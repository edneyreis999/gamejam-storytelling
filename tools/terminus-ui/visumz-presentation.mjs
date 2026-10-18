import {decode,leaves,setParameter} from './plugin-parameters.mjs';
import {paths} from './icon-paths.mjs';

const icons=Object.fromEntries(Object.keys(paths).map((name,i)=>[name,336+i]));
Object.assign(icons,{Settings:320,Audio:321,Menu:323,Save:324,Clock:325,Conversation:326});
const words={
    'Switch Category':'Trocar categoria',
    'General':'Geral','Parameters':'Atributos','Properties':'Características','Elements':'Elementos','Access':'Proficiências','Finish':'Voltar',
    'Biography':'Biografia','Absorbs %1%':'Absorve %1%','Elemental Resistance':'Resistência elemental','Bonus Damage':'Dano adicional','Skill Types':'Tipos de habilidade','Weapon Types':'Tipos de arma','Armor Types':'Tipos de armadura',
    'Element':'Elemento','Sub-Element':'Elemento secundário','Gender':'Gênero','Race':'Espécie','Nature':'Temperamento','Alignment':'Alinhamento','Blessing':'Bênção','Curse':'Maldição','Zodiac':'Zodíaco','Variant':'Variação',
    'Press %1 or %2 to stop Auto Battle':'Pressione %1 ou %2 para encerrar o combate automático','OK':'Confirmar','Cancel':'Cancelar','Auto Battle Start':'Iniciar combate automático','Auto Battle Style':'Estilo do combate automático','Attack':'Ataques','Skills':'Habilidades','Turn %1':'Turno %1','Auto':'Automático',
    'Options Menu queued after action is complete.':'As opções abrirão ao terminar a ação.','Select actions to fight.':'Escolha as ações de combate.','Sets party to Auto Battle mode.':'Ativa o combate automático para o grupo.','Opens up the Options Menu.':'Abre o menu de opções.','Attempt to escape the battle.':'Tenta fugir do combate.',
    'Opens up a list of skills under the \\C[16]%1\\C[0] category.':'Mostra as habilidades de \\C[16]%1\\C[0].','Opens up a list of items that you can use.':'Mostra os itens disponíveis para uso.','Automatically choose an action suitable for combat.':'Escolhe automaticamente uma ação de combate.','View battle member status.':'Mostra os atributos dos participantes.',
    'Increases %1 to %3%2\\C[0]. %4':'Aumenta %1 para %3%2\\C[0]. %4','Decreases %1 to %3%2\\C[0]. %4':'Reduz %1 para %3%2\\C[0]. %4','Status is currently normal.':'Nenhuma condição ativa.','\\C[6](Actions %2%1\\C[6])\\C[0]':'\\C[6](Ações %2%1\\C[6])\\C[0]','\\C[5](Turns %2%1\\C[5])\\C[0]':'\\C[5](Turnos %2%1\\C[5])\\C[0]','\\C[4](Passive)\\C[0]':'\\C[4](Passivo)\\C[0]',
    'All Allies':'Todos os aliados','All Enemies':'Todos os inimigos','\\C[6]%1\\} \\C[4]Hit Combo\\C[0]\\{':'\\C[6]%1\\} \\C[4]acertos\\C[0]\\{','\\C[6]%1\\} \\C[4]Heal Combo\\C[0]\\{':'\\C[6]%1\\} \\C[4]curas\\C[0]\\{','\\}\\C[21]Total Damage: \\{\\C[0]%1':'\\}\\C[21]Dano total: \\{\\C[0]%1','\\}\\C[21]Total Healing: \\{\\C[24]+%1\\C[0]':'\\}\\C[21]Cura total: \\{\\C[24]+%1\\C[0]','Show HP Gauge':'Mostrar barra de vida',
    'Special Items':'Itens especiais','Unique Items':'Itens únicos','Consumable':'Consumível','Nonconsumable':'Reutilizável','Usable':'Utilizável','Battle':'Combate','Field':'Exploração','Materials':'Materiais','NEW!':'NOVO','%1 is cursed by %3%2!':'%1 está sob a maldição de %3%2!',
    'Pick and choose equipment to change.':'Escolha o equipamento que deseja trocar.','Equip the strongest available equipment.':'Equipa os melhores itens disponíveis.','Remove all available equipment.':'Remove os equipamentos que podem ser retirados.','Remove':'Remover','Unequip':'Desequipar','Exit':'Sair',
    'Anytime Use':'Uso livre','Battle-Only':'Em combate','Field-Only':'Na exploração','No Target':'Sem alvo','1 Foe':'1 inimigo','All Foes':'Todos os inimigos','Random Foe':'Inimigo aleatório','2 Random Foes':'2 inimigos aleatórios','3 Random Foes':'3 inimigos aleatórios','4 Random Foes':'4 inimigos aleatórios','1 Ally':'1 aliado','Alive Allies':'Aliados vivos','Dead Ally':'Aliado caído','Dead Allies':'Aliados caídos','User':'Usuário','Any Ally':'Qualquer aliado','Everybody':'Todos',
    '%1 Random Units':'%1 alvos aleatórios','%1 Random Foes':'%1 inimigos aleatórios','%1 Random Allies':'%1 aliados aleatórios','Other Allies':'Outros aliados','Ally/Enemy':'Aliado/inimigo','Enemy/Ally':'Inimigo/aliado','Speed':'Velocidade','Fastest':'Máxima','Faster':'Muito rápida','Fast':'Rápida','Slow':'Lenta','Slower':'Muito lenta','Slowest':'Mínima','Accuracy':'Precisão','Hits':'Acertos','Type':'Tipo','Neutral':'Neutro','Physical':'Físico','Magical':'Mágico',
    '\\I[97]Weapon':`\\I[${icons.Sword}]Arma`,'\\I[160]No Element':`\\I[${icons.Elements}]Sem elemento`,'%1 Damage Multiplier':'Multiplicador de dano de %1','%1 Recovery Multiplier':'Multiplicador de cura de %1','%1 Drain Multiplier':'Multiplicador de absorção de %1','%1 Damage Power':'Potência de dano de %1','%1 Recovery Power':'Potência de cura de %1','%1 Drain Power':'Potência de absorção de %1','%1 Recovery':'Recuperação de %1','User %1':'%1 do usuário','%1 Damage':'Dano de %1','Applies':'Aplica','Removes':'Remove','Weapon Type':'Tipo de arma','Armor Type':'Tipo de armadura',
    'Datalog':'Registros','Common Event 1':'Evento comum 1','Common Event 2':'Evento comum 2','Time':'Tempo'
};
const traits={Fire:'Fogo',Ice:'Gelo',Thunder:'Raio',Water:'Água',Earth:'Terra',Wind:'Vento',Light:'Luz',Darkness:'Trevas',Flame:'Chama',Frost:'Geada',Electric:'Elétrico',Aqua:'Água',Stone:'Pedra',Air:'Ar',Bright:'Luz',Shadow:'Sombra',Unknown:'Desconhecido',Male:'Masculino',Female:'Feminino',Both:'Ambos',Uncategorized:'Sem categoria',Human:'Humano','High Elf':'Alto elfo','Wood Elf':'Elfo silvestre','Dark Elf':'Elfo sombrio','High Elven':'Alto elfo','Wood Elven':'Elfo silvestre','Dark Elven':'Elfo sombrio',Dwarf:'Anão',Dwarvin:'Anão',Gnome:'Gnomo',Gnomish:'Gnomo',Halfling:'Pequenino',Hafling:'Pequenino',Wolfkin:'Lupino',Felyne:'Felino',Lizardman:'Reptiliano',Chill:'Tranquilo',Hardy:'Resistente',Lonely:'Solitário',Adamant:'Determinado',Naughty:'Travesso',Brave:'Corajoso',Bold:'Ousado',Docile:'Dócil',Impish:'Irrequieto',Lax:'Displicente',Relaxed:'Relaxado',Modest:'Modesto',Mild:'Afável',Bashful:'Tímido',Rash:'Impulsivo',Quiet:'Reservado',Calm:'Calmo',Gentle:'Gentil',Careful:'Cuidadoso',Quirky:'Excêntrico',Sassy:'Atrevido',Timid:'Tímido',Hasty:'Apressado',Jolly:'Alegre',Naive:'Ingênuo',Serious:'Sério','Lawful Good':'Leal e bom','Neutral Good':'Neutro e bom','Chaotic Good':'Caótico e bom','Lawful Neutral':'Leal e neutro','Chaotic Neutral':'Caótico e neutro','Lawful Evil':'Leal e mau','Neutral Evil':'Neutro e mau','Chaotic Evil':'Caótico e mau',Good:'Bom',Evil:'Mau','No Blessing':'Sem bênção','No Curse':'Sem maldição',Dextrous:'Destro',Elusive:'Evasivo',Impact:'Impacto',Impactful:'Impactante',Healthy:'Saudável',Focused:'Concentrado',Energetic:'Enérgico',Clumsy:'Desajeitado',Dazed:'Atordoado',Fitful:'Instável',Drained:'Exaurido',Inefficient:'Ineficiente',Unmotivated:'Desmotivado',Aries:'Áries',Taurus:'Touro',Gemini:'Gêmeos',Cancer:'Câncer',Leo:'Leão',Virgo:'Virgem',Libra:'Libra',Scorpio:'Escorpião',Sagittarius:'Sagitário',Capricorn:'Capricórnio',Aquarius:'Aquário',Pisces:'Peixes',Ophiuchus:'Ofiúco',Mighty:'Poderoso',Major:'Maior',Greater:'Elevado',Lesser:'Reduzido',Minor:'Menor',Puny:'Frágil',Neutral:'Neutro'};

export function configurePresentation(name,parameters){
    const changes=[];
    function set(field,value){const path=field.split('/');setParameter(parameters,path,value);changes.push({path:field,value});}
    const data=decode(parameters);
    for(const leaf of leaves(data)){
        const key=leaf.path.at(-1),field=leaf.path.join('/');
        if(typeof leaf.value!=='string'||!key.match(/:str$|:json$/))continue;
        if(/^(Name|Symbol|Type|Subcategory|DefaultDamageStyle|DefaultStyle|LayoutStyle|Style|ReapplyRules|RegionOkTarget):/.test(key))continue;
        if(words[leaf.value])set(field,words[leaf.value]);
        if(name==='ElementStatus'&&/^(Display|FmtText):/.test(key)){
            const text=leaf.value.replace(/\\[iI]\[\d+\]/g,'');
            if(traits[text])set(field,leaf.value.replace(text,traits[text]));
        }
        if(name==='ElementStatus'&&key==='Description:json'&&leaf.value)set(field,translateTraitDescription(leaf.value));
    }
    if(name==='ElementStatus'){
        set('StatusMenu:struct/CmdStyle:str','iconText');set('StatusMenu:struct/BackRectColor:str','#f0dfc0');
        ['Status','Performance','Settings','Elements','Key','Back'].forEach((icon,i)=>set(`StatusMenuList:arraystruct/${i}/Icon:num`,icons[icon]));
    }
    if(name==='Battle'){
        set('BattleLayout:struct/StatusWindowSkinFilename:str','CoretoWindow');
        set('BattleLayout:struct/CommandWidth:num',280);set('BattleLog:struct/BackColor:str','#f9eacf');
        set('ComboWindow:struct/CustomFontFace:str','CoretoOutfitMedium');set('HpGauge:struct/Name:str','Mostrar barra de vida');
        for(const [group,fields] of Object.entries({PartyCmd:{CmdIconFight:'Battle',CmdIconAutoBattle:'AutoBattle',CmdIconOptions:'Settings',CmdIconEscape:'Run'},ActorCmd:{CmdIconItem:'Backpack',IconStypeNorm:'Skill',IconStypeMagic:'Sparkles'},InBattleStatus:{CmdIconStatus:'Status',normalIcon:'Heart'}}))for(const [key,icon] of Object.entries(fields))set(`${group}:struct/${key}:num`,icons[icon]);
    }
    if(name==='EventsMove'){set('Label:struct/FontSize:num',22);set('Label:struct/LineHeight:num',28);set('Label:struct/IconSize:num',24);}
    if(name==='ItemsEquips'){
        set('New:struct/FontFace:str','CoretoOutfitMedium');set('New:struct/FontColor:str','#552070');
        set('New:struct/OffsetX:num',36);set('New:struct/OffsetY:num',8);
        set('Categories:struct/Style:str','icon');
        ['Compass','Battle','Chest','Sword','Shield','Helmet','Armor','Ring','Key'].forEach((icon,i)=>set(`Categories:struct/List:arraystruct/${i}/Icon:num`,icons[icon]));
        for(const group of ['EquipScene','StatusWindow'])set(`${group}:struct/BackRectColor:str`,'#f0dfc0');
        for(const [group,fields] of Object.entries({EquipScene:{CmdIconEquip:'Armor',CmdIconOptimize:'Experience',CmdIconClear:'Back',RemoveEquipIcon:'Back'},ShopScene:{CmdIconBuy:'Backpack',CmdIconSell:'Coin',CmdIconCancel:'Back'}}))for(const [key,icon] of Object.entries(fields))set(`${group}:struct/${key}:num`,icons[icon]);
    }
    if(name==='MainMenu'){
        set('CustomCmdWin:struct/Style:str','iconText');set('Playtime:struct/Time:str','Tempo');set('Playtime:struct/Icon:num',icons.Clock);set('Playtime:struct/FontSize:num',18);
        const commands={item:['Itens','Backpack'],skill:['Habilidades','Skill'],equip:['Equipamento','Armor'],status:['Status','Status'],formation:['Formação','Formation'],options:['Opções','Settings'],save:['Salvar','Save'],load:['Carregar','History'],gameEnd:['Sair','Back']};
        data['CommandList:arraystruct'].forEach((row,i)=>{const entry=commands[row['Symbol:str']];if(entry){set(`CommandList:arraystruct/${i}/TextStr:str`,entry[0]);set(`CommandList:arraystruct/${i}/Icon:num`,icons[entry[1]]);}});
    }
    if(name==='SkillsStates'){
        set('Skills:struct/IconStypeNorm:num',icons.Skill);set('Skills:struct/IconStypeMagic:num',icons.Sparkles);
        ['#af2933','#552070','#704737','#704737','#360a0b','#360a0b'].forEach((color,i)=>set(`Costs:arraystruct/${i}/FontColor:str`,color));
        set('Costs:arraystruct/4/Icon:num',icons.Potion);
        set('Gauge:struct/LabelOutlineWidth:num',0);set('Gauge:struct/ValueOutlineWidth:num',0);
        set('Gauge:struct/MatchLabelColor:eval',false);set('Gauge:struct/PresetLabelGaugeColor:num',0);
        for(const [i,label,color] of [[0,'hpA','#af2933'],[1,'mpA','#552070'],[2,'tpA','#2a847d']])set(`Costs:arraystruct/${i}/GaugeDrawJS:func`, `const bitmap = this.bitmap;\nconst width = this.bitmapWidth();\nconst height = this.textHeight ? this.textHeight() : this.bitmapHeight();\nthis.drawFullGauge('${color}', '${color}', 0, height - 6, width, 6);\nbitmap.fontFace = 'CoretoOutfitMedium';\nbitmap.fontSize = 16;\nbitmap.outlineWidth = 0;\nbitmap.textColor = '#360a0b';\nbitmap.paintOpacity = 255;\nbitmap.drawText(TextManager.${label}, 0, 0, width, height - 6, 'left');\nbitmap.drawText(this.currentDisplayedValue(), 0, 0, width, height - 6, 'right');`);
        set('States:struct/ColorNeutral:str','#360a0b');set('States:struct/ColorPositive:str','#552070');set('States:struct/ColorNegative:str','#af2933');
        set('Buffs:struct/ColorBuff:str','#552070');set('Buffs:struct/ColorDebuff:str','#af2933');
    }
    return changes;
}

function translateTraitDescription(text){
    const exact={
        'No strengths or weaknesses.':'Sem vantagens ou fraquezas.',
        "Uncertain to this unit's gender.":'Gênero não informado.',
        "This race's attributes have not been determined.":'Os atributos desta espécie não foram definidos.',
        'This race has neutral attributes.':'Esta espécie tem atributos neutros.',
        "This unit's alignment is completely neutral.":'O alinhamento deste personagem é inteiramente neutro.',
        'This unit has not received a blessing.':'Este personagem não recebeu uma bênção.',
        'This unit has not been cursed.':'Este personagem não está amaldiçoado.',
        "This unit's Zodiac is unknown.":'O signo deste personagem é desconhecido.',
        'This unit is the rare Ophiuchus zodiac.':'Este personagem tem o raro signo de Ofiúco.',
        'This is your average unit.':'Este personagem tem atributos comuns.',
        'This unit receives less healing.':'Este personagem recebe menos cura.',
        'This unit uses more MP.':'Este personagem consome mais PM.',
        'This unit gaines less TP.':'Este personagem ganha menos PT.'
    };
    const races={'High Elves':'Altos elfos','Wood Elves':'Elfos silvestres','Dark Elves':'Elfos sombrios',Dwarves:'Anões',Gnomes:'Gnomos',Halflings:'Pequeninos',Wolfkin:'Lupinos',Felyne:'Felinos',Lizardmen:'Reptilianos'};
    const nouns={Canes:'cajados','Magic Armor':'armaduras mágicas',Bows:'arcos',Crossbows:'bestas',Daggers:'adagas',Swords:'espadas',Sword:'espadas',Flails:'mangual','Heavy Armor':'armaduras pesadas','Light Armor':'armaduras leves','Small Shields':'escudos pequenos',Claws:'garras',Gloves:'luvas',Whips:'chicotes',Axes:'machados',Spears:'lanças',MaxHP:'PV máximo',MaxMP:'PM máximo',ATK:'ataque',DEF:'defesa',MAT:'ataque mágico',MDF:'defesa mágica',AGI:'agilidade',LUK:'sorte',HIT:'precisão',EVA:'evasão',CRI:'chance crítica'};
    return text.split('\n').map(line=>{
        if(exact[line])return exact[line];
        let result=line.replace(/^Strong against /,'Resistente a ').replace(/^Weak against /,'Vulnerável a ').replace(/^This unit has /,'Este personagem tem ');
        for(const [en,pt] of Object.entries(races))result=result.replace(new RegExp('^'+en+' have '),pt+' têm ').replace(new RegExp('^'+en+' can equip '),pt+' podem equipar ');
        for(const [en,pt] of Object.entries({...traits,...nouns}).sort((a,b)=>b[0].length-a[0].length))result=result.replace(new RegExp('\\b'+en+'\\b','g'),pt);
        return result.replaceAll(' and less ',' e menos ').replaceAll(' and ',' e ').replaceAll('more ','mais ').replaceAll('less ','menos ').replaceAll('stronger physical attributes','atributos físicos maiores').replaceAll('weaker physical attributes','atributos físicos menores').replaceAll('stronger magical attributes','atributos mágicos maiores').replaceAll('weaker magical attributes','atributos mágicos menores').replaceAll('neutral parameters','atributos neutros').replaceAll('increased attributes','atributos maiores').replaceAll('decreased attributes','atributos menores').replaceAll('innate HP Regeneration','regeneração natural de PV').replaceAll('innate MP Regeneration','regeneração natural de PM').replaceAll('innate TP Regeneration','regeneração natural de PT').replaceAll('a slight increase to ','um pequeno aumento de ').replaceAll('a slight resistance to ','uma pequena resistência a ').replaceAll('increased ','aumento de ');
    }).join('\n');
}
