// MAY NEED TO CHANGE THIS TO A CLASS BASED COMPONENT. 
// WE WILL DEFINITELY NEED HELPER FUNCTIONS TO LOOP THROUGH AND DISPLAY DIFFERENT ASPECTS LIKE SKILLS AND TALENTS
// I NEED TO RESEARCH HOW TO RETURN CHUNKS OF JSX WITH A STANDARD FUNCTION AND PLUG IT INTO OTHER SECTIONS

import React from "react";
import iterateObject from "../../helpers/characters/iterateObject";

function Character(props) {

    //Gets array of objects within the provided ojbect
    //i.e. provided props.character.skills, returned array of child objects
    let skillList = iterateObject(props.character.skills);
    
    //Sort alphabetically
    skillList.sort((a,b) => {
        let fa = a.title.toLowerCase(),
            fb = b.title.toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });
    console.log(skillList);

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
                    <p className='brawn'>Brawn <span className='rank'>{props.character.characteristics.brawn}</span></p>
                    <p className='brawn'>Agility <span className='rank'>{props.character.characteristics.agility}</span></p>
                    <p className='brawn'>Intellect <span className='rank'>{props.character.characteristics.intellect}</span></p>
                    <p className='brawn'>Cunning <span className='rank'>{props.character.characteristics.cunning}</span></p>
                    <p className='brawn'>Willpower <span className='rank'> {props.character.characteristics.willpower}</span></p>
                    <p className='brawn'>Presence <span className='rank'>{props.character.characteristics.presence}</span></p>
                </div>
                <div className='character-skills'>
                    {/*map over array and return list of skills and their ranks.*/}
                    {skillList.map((skill) =>
                        <p className='brawn'>
                            {skill.title}
                            <span className='rank'>{skill.rank}</span>
                            <span className='xp'>XP: {skill.xp}</span>
                        </p>
                    )}
                </div>
            </div>
            <div className='character-talents'>
                {/* WE NEED TO FIGURE OUT HOW TO LOOP THROUGH props.character.talents */}
            </div>
        </div>
    )
}

export default Character;