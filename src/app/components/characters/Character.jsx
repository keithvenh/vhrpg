// MAY NEED TO CHANGE THIS TO A CLASS BASED COMPONENT. 
// WE WILL DEFINITELY NEED HELPER FUNCTIONS TO LOOP THROUGH AND DISPLAY DIFFERENT ASPECTS LIKE SKILLS AND TALENTS
// I NEED TO RESEARCH HOW TO RETURN CHUNKS OF JSX WITH A STANDARD FUNCTION AND PLUG IT INTO OTHER SECTIONS

import React from "react";
import iterateObject from "../../helpers/characters/iterateObject";
import CharacterSkill from "./CharacterSkill";

class Character extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skill: '',
            currentRank: 0,
            direction: '',
            skillList: [],
            generalSkills: [],
            combatSkills: [],
            knowledgeSkills: []
        }
    }

    //Gets array of objects within the provided ojbect
    //i.e. provided props.character.skills, returned array of child objects

    componentDidMount() {
        this.setState({
            skillList: iterateObject(this.props.character.skills)
        });
    }

    render () {

        return(
            <div className='character-container'>
                <div className='character-image'>
                    {/* TRYING TO DECIDE WHAT TYPE AND HOW TO DISPLAY A CHARACTER IMAGE */}
                </div>
                <div className='character-details'>
                    <div className='character-overview'>

                        <h1 className='character-name'>{this.props.character.displayName}</h1>
                        <h2 className="character-species">{this.props.character.background.species}</h2>
                        <h2 className="character-career">{this.props.character.career.name}</h2>
                        <h3 className="character-specializations">{iterateObject(this.props.character.career.specializations).map((spec) => <p key={spec.name}>{spec.name}</p>)}</h3>

                    </div>
                    <div className='character-attributes'>
                        <div className='derived'>
                            <div className="attribute-container soak">
                                <div className="label">Soak</div>
                                <div className="values">
                                    <div className='current'>
                                        <p className='value'>{this.props.character.attributes.soak}</p>
                                        <div className="sublabel">Current</div>
                                    </div>
                                </div>
                            </div>

                            <div className="attribute-container wounds">
                                <div className="label">Wounds</div>
                                <div className="values">
                                    <div className='threshold'>
                                        <p className='value'>{this.props.character.attributes.woundThreshold}</p>
                                        <div className="sublabel">Threshold</div>
                                    </div>
                                    <div className='current'>
                                        <p className='value'>{this.props.character.attributes.wounds}</p>
                                        <div className="sublabel">Current</div>
                                    </div>
                                </div>
                                
                            </div>

                            <div className="attribute-container strain">
                                <div className="label">Strain</div>
                                <div className="values">
                                    <div className='threshold'>
                                        <p className='value'>{this.props.character.attributes.strainThreshold}</p>
                                        <div className="sublabel">Threshold</div>
                                    </div>
                                    <div className='current'>
                                        <p className='value'>{this.props.character.attributes.strain}</p>
                                        <div className="sublabel">Current</div>
                                    </div>
                                </div>
                            </div>

                            <div className="attribute-container defense">
                                <div className="label">Defense</div>
                                <div className="values">
                                    <div className='threshold'>
                                        <p className='value'>{this.props.character.attributes.rangedDefense}</p>
                                        <div className="sublabel">Ranged</div>
                                    </div>
                                    <div className='current'>
                                        <p className='value'>{this.props.character.attributes.meleeDefense}</p>
                                        <div className="sublabel">Melee</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="divider">
                            <hr className="dividerLine"></hr>
                            <p className="dividerLabel">Characteristics</p>
                            <hr className="dividerLine"></hr>
                        </div>

                        <div className='characteristics'>

                            <div  className='characteristic brawn'>
                                <p className='rank'>{this.props.character.characteristics.brawn }</p>
                                <p className='label'>Brawn</p>
                            </div>

                            <div  className='characteristic agility'>
                                <p className='rank'>{this.props.character.characteristics.agility }</p>
                                <p className='label'>Agility</p>
                            </div>

                            <div  className='characteristic intellect'>
                                <p className='rank'>{this.props.character.characteristics.intellect }</p>
                                <p className='label'>Intellect</p>
                            </div>

                            <div  className='characteristic cunning'>
                                <p className='rank'>{this.props.character.characteristics.cunning }</p>
                                <p className='label'>Cunning</p>
                            </div>

                            <div  className='characteristic willpower'>
                                <p className='rank'>{this.props.character.characteristics.willpower }</p>
                                <p className='label'>Willpower</p>
                            </div>

                            <div  className='characteristic presence'>
                                <p className='rank'>{this.props.character.characteristics.presence }</p>
                                <p className='label'>Presence</p>
                            </div>

                        </div>
                    </div>

                    <div className="divider">
                        <hr className="dividerLine"></hr>
                        <p className="dividerLabel">Skills</p>
                        <hr className="dividerLine"></hr>
                    </div>
                    <div className='character-skills'>
                        {/*map over array and return list of skills and their ranks.*/}
                        <div className='skillsRow'>
                            <div className='generalSkills'>

                                {this.state.skillList.filter(skill => skill.category === "General").map((skill) => <CharacterSkill skill={skill} key={skill.name} /> )}

                            </div>
                        </div>

                        <div className='skillsRow'>
                            <div className='combatSkills'>
                                
                                {this.state.skillList.filter(skill => skill.category === "Combat").map((skill) => <CharacterSkill skill={skill} key={skill.name} /> )}

                            </div>

                            <div className='knowledgeSkills'>
                                
                                {this.state.skillList.filter(skill => skill.category === "Knowledge").map((skill) => <CharacterSkill skill={skill} key={skill.name} /> )}

                            </div>
                        </div>
                    </div>
                </div>
                <div className='character-talents'>
                    {/* WE NEED TO FIGURE OUT HOW TO LOOP THROUGH props.character.talents */}
                </div>
            </div>
        )
    }
}

export default Character;