export default function replaceDice(string) {
    const ye = require('../../assets/images/ye.png');
    const gr = require('../../assets/images/gr.png');
    const bl = require('../../assets/images/bl.png');
    const re = require('../../assets/images/re.png');
    const pu = require('../../assets/images/pu.png');
    const bk = require('../../assets/images/bk.png');
    const wh = require('../../assets/images/wh.png');

    const suc = require('../../assets/images/symbols/s.png');
    const adv = require('../../assets/images/symbols/a.png');
    const tri = require('../../assets/images/symbols/r.png');
    const fai = require('../../assets/images/symbols/f.png');
    const thr = require('../../assets/images/symbols/t.png');
    const des = require('../../assets/images/symbols/d.png');
    const lsp = require('../../assets/images/symbols/l.png');
    const dsp = require('../../assets/images/symbols/n.png');


    string = string.replace(':ye:', ` <img src=${ye} class='diceIcon yellow' /> `);
    string = string.replace(':gr:', ` <img src=${gr} class='diceIcon green' /> `);
    string = string.replace(':bl:', ` <img src=${bl} class='diceIcon blue' /> `);
    string = string.replace(':re:', ` <img src=${re} class='diceIcon red' /> `);
    string = string.replace(':pu:', ` <img src=${pu} class='diceIcon purple' /> `);
    string = string.replace(':bk:', ` <img src=${bk} class='diceIcon black' /> `);
    string = string.replace(':wh:', ` <img src=${wh} class='diceIcon white' /> `);
    string = string.replace(':suc:', ` <img src=${suc} class='diceIcon white' /> `);
    string = string.replace(':adv:', ` <img src=${adv} class='diceIcon white' /> `);
    string = string.replace(':tri:', ` <img src=${tri} class='diceIcon white' /> `);
    string = string.replace(':fai:', ` <img src=${fai} class='diceIcon white' /> `);
    string = string.replace(':thr:', ` <img src=${thr} class='diceIcon white' /> `);
    string = string.replace(':des:', ` <img src=${des} class='diceIcon white' /> `);
    string = string.replace(':lsp:', ` <img src=${lsp} class='diceIcon white' /> `);
    string = string.replace(':dsp:', ` <img src=${dsp} class='diceIcon white' /> `);
    console.log(string);
    return string;
}