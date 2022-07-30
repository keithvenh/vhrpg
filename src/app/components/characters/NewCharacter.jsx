import React from "react";
import AddCharacter from "../../helpers/characters/addCharacter";

class NewCharacter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            species: '',
            chartype: 'pc'

        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSpeciesChange = this.handleSpeciesChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
   
    handleNameChange(event) {
        this.setState({name: event.target.value});
    }
    handleSpeciesChange(event) {
        this.setState({species: event.target.value});
    }
    handleTypeChange(event) {
        this.setState({chartype: event.target.value});
    }
    
    handleSubmit(event) {
        //import function to create new character in DB
        AddCharacter(this.state.name,this.state.species,this.state.chartype);
    }

    render () {

        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label className='new-character'>
                    <div className='name'>Character Name:</div>
                        <input type='text' name={this.state.name} onChange={this.handleNameChange} />
                    </label>
                </div>

                <div>
                    <label className='new-character'>
                    <div className='species'>Species:</div>
                        <input type='text' species={this.state.species} onChange={this.handleSpeciesChange} />
                    </label>
                </div>

                <div>
                    <label className='new-character'>
                        <div className='type'>Character Type:</div>
                        <select chartype={this.state.chartype} onChange={this.handleTypeChange}>
                            <option value='pc'>Player Character</option>
                            <option value='npc'>Non-Player Character</option>
                            <option value='minion'>Minion</option>
                            <option value='rival'>Rival</option>
                            <option value='nemesis'>Nemesis</option>
                        </select>
                    </label>
                </div>

                <input className='submit' type='submit' value='Submit' />
            </form>
        );
    }
}

export default NewCharacter