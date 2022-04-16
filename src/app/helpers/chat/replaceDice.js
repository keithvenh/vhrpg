export default function replaceDice(string, color='white') {
    const ye = require('../../assets/images/dice/ye.png');
    const gr = require('../../assets/images/dice/gr.png');
    const bl = require('../../assets/images/dice/bl.png');
    const re = require('../../assets/images/dice/re.png');
    const pu = require('../../assets/images/dice/pu.png');
    const bk = require('../../assets/images/dice/bk.png');
    const wh = require('../../assets/images/dice/wh.png');

    const suc = require(`../../assets/images/symbols/${color}/s.png`);
    const adv = require(`../../assets/images/symbols/${color}/a.png`);
    const tri = require(`../../assets/images/symbols/${color}/r.png`);
    const fai = require(`../../assets/images/symbols/${color}/f.png`);
    const thr = require(`../../assets/images/symbols/${color}/t.png`);
    const des = require(`../../assets/images/symbols/${color}/d.png`);
    const lsp = require(`../../assets/images/symbols/${color}/l.png`);
    const dsp = require(`../../assets/images/symbols/${color}/n.png`);
    const ls = require(`../../assets/images/symbols/${color}/dpn.png`);
    const ds = require(`../../assets/images/symbols/${color}/dpl.png`); 
    const fp = require(`../../assets/images/symbols/${color}/fp.png`);


    string = string.replace(':ye:', ` <img src=${ye} class='diceIcon' /> `);
    string = string.replace(':gr:', ` <img src=${gr} class='diceIcon' /> `);
    string = string.replace(':bl:', ` <img src=${bl} class='diceIcon' /> `);
    string = string.replace(':re:', ` <img src=${re} class='diceIcon' /> `);
    string = string.replace(':pu:', ` <img src=${pu} class='diceIcon' /> `);
    string = string.replace(':bk:', ` <img src=${bk} class='diceIcon' /> `);
    string = string.replace(':wh:', ` <img src=${wh} class='diceIcon' /> `);
    string = string.replace(':suc:', ` <img src=${suc} class='diceIcon' /> `);
    string = string.replace(':adv:', ` <img src=${adv} class='diceIcon' /> `);
    string = string.replace(':tri:', ` <img src=${tri} class='diceIcon' /> `);
    string = string.replace(':fai:', ` <img src=${fai} class='diceIcon' /> `);
    string = string.replace(':thr:', ` <img src=${thr} class='diceIcon' /> `);
    string = string.replace(':des:', ` <img src=${des} class='diceIcon' /> `);
    string = string.replace(':lsp:', ` <img src=${lsp} class='diceIcon' /> `);
    string = string.replace(':dsp:', ` <img src=${dsp} class='diceIcon' /> `);
    string = string.replace(':ls:', ` <img src=${ls} class='diceIcon' /> `);
    string = string.replace(':ds:', ` <img src=${ds} class='diceIcon' /> `);
    string = string.replace(':fp:', ` <img src=${fp} class='diceIcon' /> `);
    
    return string;
}