
export default function Houses() {

    const mission = require('../../assets/images/mission.png');
    const hangar = require('../../assets/images/hangar.png');
    const equipment = require('../../assets/images/equipment.png');
    const weapons = require('../../assets/images/weapons.png');
    const characters = require('../../assets/images/characters.png');
    const health = require('../../assets/images/health.png');
    const stats = require('../../assets/images/stats.png');
    const rules = require('../../assets/images/rules.png');

    return (

        <div id='houses-container' className="houses-container">

            <img className='house' src={mission} alt='Missions' />
            <img className='house' src={hangar} alt='Hangar' />
            <img className='house' src={equipment} alt='Equipment' />
            <img className='house' src={weapons} alt='Weapons' />
            <div className='house'></div>
            <img className='house' src={characters} alt='Characters' />
            <img className='house' src={health} alt='Health' />
            <img className='house' src={stats} alt='Stats' />
            <img className='house' src={rules} alt='Rules' />

        </div>

    )
}