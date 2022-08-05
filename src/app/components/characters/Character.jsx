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
            character: props.character,
            skill: '',
            currentRank: 0,
            direction: '',
            skillList: [],
            generalSkills: [],
            combatSkills: [],
            knowledgeSkills: [],
            image: require('../../assets/images/' + props.character.id + '-headshot.jpeg')
        }
        this.collapseElement = this.collapseElement.bind(this);
    }

    //Gets array of objects within the provided ojbect
    //i.e. provided props.character.skills, returned array of child objects
    collapseElement(event) {
        const elem = document.getElementById(event.target.innerText.toLowerCase());
        if(elem.style.display == 'none') {
            elem.style.display = 'flex';
        } else {
            elem.style.display = 'none';
        }
    }
    
    componentDidMount() {
        this.setState({
            skillList: iterateObject(this.props.character.skills).filter((skill) => (skill.rank > 0 || skill.career === true))
        });
    }

    render () {

        return(
            <div className='characterContainer'>
            
                <div className='characterDetails'>


                    <div className='characterOverview'>

                        <div className='characterImageContainer'>
                            <img className='characterImage' src={this.state.image} alt='' />
                        </div>

                        <div className='characterTitle'>
                            <div className='characterName'>
                                <h1>{this.state.character.displayName}</h1>
                                <p className='sw'>{this.state.character.displayName}</p>
                            </div>
                            <h2 className="characterSpecies">
                                <span className='label'>Species: </span>
                                {this.state.character.background.species}
                            </h2>
                            <h2 className="characterCareer">
                                <span className='label'>Career: </span>
                                {this.state.character.career.name}
                            </h2>
                            <h3 className="characterSpecializations">
                                <p className='label'>Specializations: </p>
                                {iterateObject(this.state.character.career.specializations).map(
                                    (spec) => <p key={spec.name}>{spec.name}</p>
                                )}
                            </h3>
                        </div>

                    </div>
                    <div className="divider">
                        <hr className="dividerLine"></hr>
                        <p className="dividerLabel" onClick={(e) => this.collapseElement(e)}>Attributes</p>
                        <hr className="dividerLine"></hr>
                    </div>
                    <div className='characterAttributes'>
                        <div className='derived' id="attributes">
                            <div className="attributeContainer soak">
                                <div className="label">Soak</div>
                                <div className="values">
                                    <div className='current'>
                                        <p className='value'>{this.props.character.attributes.soak}</p>
                                        <div className="sublabel">Current</div>
                                    </div>
                                </div>
                            </div>

                            <div className="attributeContainer wounds">
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

                            <div className="attributeContainer strain">
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

                            <div className="attributeContainer defense">
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

                            <div className="attributeContainer forceRating">
                                <div className="label">Force Rating</div>
                                <div className="values">
                                    <div className='current'>
                                        <p className='value'>{this.props.character.attributes.forceRating}</p>
                                        <div className="sublabel">Current</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="divider">
                            <hr className="dividerLine"></hr>
                            <p className="dividerLabel"  onClick={(e) => this.collapseElement(e)}>Characteristics</p>
                            <hr className="dividerLine"></hr>
                        </div>

                        <div className='characteristics' id='characteristics'>

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
                        <p className="dividerLabel" onClick={(e) => this.collapseElement(e)}>Skills</p>
                        <hr className="dividerLine"></hr>
                    </div>
                    <div className='characterSkills' id='skills'>
                        {/*map over array and return list of skills and their ranks.*/}
                        <div className='skillsRow'>
                            <div className="divider">
                                <hr className="dividerLine"></hr>
                                <p className="dividerLabel" onClick={(e) => this.collapseElement(e)}>General</p>
                                <hr className="dividerLine"></hr>
                            </div>
                            <div className='generalSkills'  id='general'>

                                {this.state.skillList.filter(skill => skill.category === "General").map((skill) => <CharacterSkill skill={skill} key={skill.name} /> )}

                            </div>
                        </div>

                        <div className='skillsRow'>
                            <div className="divider">
                                <hr className="dividerLine"></hr>
                                <p className="dividerLabel" onClick={(e) => this.collapseElement(e)}>Combat</p>
                                <hr className="dividerLine"></hr>
                            </div>
                            <div className='combatSkills' id='combat'>
                                
                                {this.state.skillList.filter(skill => skill.category === "Combat").map((skill) => <CharacterSkill skill={skill} key={skill.name} /> )}

                            </div>

                            <div className="divider">
                                <hr className="dividerLine"></hr>
                                <p className="dividerLabel" onClick={(e) => this.collapseElement(e)}>Knowledge</p>
                                <hr className="dividerLine"></hr>
                            </div>

                            <div className='knowledgeSkills' id='knowledge'>
                                
                                {this.state.skillList.filter(skill => skill.category === "Knowledge").map((skill) => <CharacterSkill skill={skill} key={skill.name} /> )}

                            </div>
                        </div>
                    </div>
                </div>
                <div className="divider">
                    <hr className="dividerLine"></hr>
                    <p className="dividerLabel" onClick={(e) => this.collapseElement(e)}>Talents</p>
                    <hr className="dividerLine"></hr>
                </div>
                <div className='character-talents' id='talentsß'>
                    {/* WE NEED TO FIGURE OUT HOW TO LOOP THROUGH props.character.talents */}
                </div>
            </div>
        )
    }
}

export default Character;