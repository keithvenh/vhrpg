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
        let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();

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
                    <h2 className="character-species">{props.character.background.species}</h2>
                    <h2 className="character-career">{props.character.career.name}</h2>
                    <h3 className="character-specializations">{iterateObject(props.character.career.specializations).map((spec) => <p key={spec.name}>{spec.name}</p>)}</h3>

                </div>
                <div className='character-attributes'>
                    <div className='derived'>
                        <div className="attribute-container soak">
                            <div className="label">Soak</div>
                            <div className="values">
                                <div className='current'>
                                    <p className='value'>{props.character.attributes.soak}</p>
                                    <div className="sublabel">Current</div>
                                </div>
                            </div>
                        </div>

                        <div className="attribute-container wounds">
                            <div className="label">Wounds</div>
                            <div className="values">
                                <div className='current'>
                                    <p className='value'>{props.character.attributes.woundThreshold}</p>
                                    <div className="sublabel">Current</div>
                                </div>
                                <div className='threshold'>
                                    <p className='value'>{props.character.attributes.wounds}</p>
                                    <div className="sublabel">Threshold</div>
                                </div>
                            </div>
                            
                        </div>

                        <div className="attribute-container strain">
                            <div className="label">Strain</div>
                            <div className="values">
                                <div className='current'>
                                    <p className='value'>{props.character.attributes.strainThreshold}</p>
                                    <div className="sublabel">Current</div>
                                </div>
                                <div className='threshold'>
                                    <p className='value'>{props.character.attributes.strain}</p>
                                    <div className="sublabel">Threshold</div>
                                </div>
                            </div>
                        </div>

                        <div className="attribute-container defense">
                            <div className="label">Defense</div>
                            <div className="values">
                                <div className='current'>
                                    <p className='value'>{props.character.attributes.meleeDefense}</p>
                                    <div className="sublabel">Melee</div>
                                </div>
                                <div className='threshold'>
                                    <p className='value'>{props.character.attributes.rangedDefense}</p>
                                    <div className="sublabel">Ranged</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='characteristics'>
                        <p className='brawn'>Brawn <span className='rank'>{props.character.characteristics.brawn}</span></p>
                        <p className='brawn'>Agility <span className='rank'>{props.character.characteristics.agility}</span></p>
                        <p className='brawn'>Intellect <span className='rank'>{props.character.characteristics.intellect}</span></p>
                        <p className='brawn'>Cunning <span className='rank'>{props.character.characteristics.cunning}</span></p>
                        <p className='brawn'>Willpower <span className='rank'> {props.character.characteristics.willpower}</span></p>
                        <p className='brawn'>Presence <span className='rank'>{props.character.characteristics.presence}</span></p>
                    </div>
                </div>
                <div className='character-skills'>
                    {/*map over array and return list of skills and their ranks.*/}
                    {skillList.map((skill) =>
                        <div className='brawn' key={skill.name} >
                            {skill.name}
                            <span className='rank'>{skill.rank}</span>
                            <span className='xp'>XP: {skill.xp}</span>
                        </div>
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