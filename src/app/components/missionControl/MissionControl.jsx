import { useContext } from 'react';
import { CampaignControlCard } from './ControlCards';

export default function MissionControl(props) {

    return (
        <div className="missionControl">

            <CampaignControlCard appView={props.appView}/>
            
        </div>
    )
    // return (
    //     <div id='mission-control' className='mission-control'>

    //         <div className='screen-container'>
    //             <div className='screen orange characterManagement' id='characterManagement' onClick={() => props.updateView('characterManagement')}>
    //                 <div className='screenTitle'>
    //                     <h2 className='title'>Character Management</h2>
    //                     <p className='sw'>Character Management</p>
    //                 </div>
    //             </div>

    //             <div className='screen blue square gear' id='gear' onClick={() => props.updateView('gear')}>
    //                 <div className='screenTitle'>
    //                     <h2 className='title'>Gear</h2>
    //                     <p className='sw'>Gear</p>
    //                 </div>
    //             </div>

    //             <div className='screen teal square talentTrees' id='talentTrees' onClick={() => props.updateView('talentTrees')}>
    //                 <div className='screenTitle'>
    //                     <h2 className='title'>Talent Trees</h2>
    //                     <p className='sw'>Talent Trees</p>
    //                 </div>
    //             </div>

    //             <div className='screen red square vehicles' id='vehicles' onClick={() => props.updateView('vehicles')}>
    //                 <div className='screenTitle'>
    //                     <h2 className='title'>Vehicles</h2>
    //                     <p className='sw'>Vehicles</p>
    //                 </div>
    //             </div>

    //             <div className='screen green currentMission' id='currentMission' onClick={() => props.updateView('currentMission')}>
    //                 <div className='screenTitle'>
    //                     <h2 className='title'>Current Mission</h2>
    //                     <p className='sw'>Current Mission</p>
    //                 </div>
    //                 <div className='missionDetails'>
    //                     <p className='currentLocation'>Location: Koler</p>
    //                 </div>
    //             </div>

    //             <div className='screen blue square library' id='library' onClick={() => props.updateView('library')}>
    //                 <div className='screenTitle'>
    //                     <h2 className='title'>Library</h2>
    //                     <p className='sw'>Library</p>
    //                 </div>
    //             </div>

    //             <div className='screen teal square forcePowers' id='forcePowers' onClick={() => props.updateView('forcePowers')}>
    //                 <div className='screenTitle'>
    //                     <h2 className='title'>Force Powers</h2>
    //                     <p className='sw'>Force Powers</p>
    //                 </div>
    //             </div>

    //             <div className='screen red square casino' id='casino' onClick={() => props.updateView('casino')}>
    //                 <div className='screenTitle'>
    //                     <h2 className='title'>Casino</h2>
    //                     <p className='sw'>Casino</p>
    //                 </div>
    //             </div>

    //             <div className='screen yellow organizationManagement' id='currentMission' onClick={() => props.updateView('currentMission')}>
    //                 <div className='screenTitle'>
    //                     <h2 className='title'>Organization Management</h2>
    //                     <p className='sw'>Organization Management</p>
    //                 </div>
    //             </div>

    //         </div>
    //     </div>
    // )
}