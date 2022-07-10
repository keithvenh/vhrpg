// MAY NEED TO CHANGE THIS TO A CLASS BASED COMPONENT. 
// WE WILL DEFINITELY NEED HELPER FUNCTIONS TO LOOP THROUGH AND DISPLAY DIFFERENT ASPECTS LIKE SKILLS AND TALENTS
// I NEED TO RESEARCH HOW TO RETURN CHUNKS OF JSX WITH A STANDARD FUNCTION AND PLUG IT INTO OTHER SECTIONS

import React from "react";

function Character(props) {
    
    const skillList = Object.entries(props.character.skills).map(([key])=>(
        <div>{key}: {key.rank}</div>
    ))

    return(
        <div className='character-container'>
            <div className='character-image'>
                {/* TRYING TO DECIDE WHAT TYPE AND HOW TO DISPLAY A CHARACTER IMAGE */}
            </div>
            <div className='character-details'>
                <div className='character-overview'>

                    <h1 className='character-name'>{props.character.displayName}</h1>

                </div>
                <div className='character-characteristics'>
                    <p className='brawn'>Brawn: {props.character.characteristics.brawn}</p>
                    <p className='brawn'>Agility: {props.character.characteristics.agility}</p>
                    <p className='brawn'>Intellect: {props.character.characteristics.intellect}</p>
                    <p className='brawn'>Cunning: {props.character.characteristics.cunning}</p>
                    <p className='brawn'>Willpower: {props.character.characteristics.willpower}</p>
                    <p className='brawn'>Presence: {props.character.characteristics.presence}</p>
                </div>
                <div className='character-skills'>
                    {/* WE NEED TO FIGURE OUT HOW TO LOOP THROUGH props.character.skills */}
                    <p className='brawn'> {skillList} </p>
                </div>
            </div>
            <div className='character-talents'>
                {/* WE NEED TO FIGURE OUT HOW TO LOOP THROUGH props.character.talents */}
            </div>
        </div>
    )
}

export default Character;