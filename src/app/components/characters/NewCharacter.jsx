import { useState, useEffect } from "react";
import FormSelect from '../forms/FormSelect';
import FormInput from "../forms/FormInput";
import FormButton from "../forms/FormButton";
import { charactersCollection } from '../../../db/application/db'
import { addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function NewCharacter() {

    // Determines Form
    const [character, setCharacter] = useState({type: 'pc', displayName: ''});

    const navigate = useNavigate();

    const characterTypeOptions = [
        {value: 'pc', display: 'PlayerCharacter'},
        {value: 'nemesis', display: 'Nemesis'},
        {value: 'rival', display: 'Rival'},
        {value: 'minion', display: 'Minion'}
    ]

    function handleChange(e) {
        setCharacter(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    async function createCharacter(newCharacter) {
        try {
            const docRef = await addDoc(charactersCollection, newCharacter);
            console.log("Document written with ID: ", docRef.id);
            navigate(`/characters/${docRef.id}/edit`)
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        createCharacter(character);
    }

    return (
        <div className='characterCreation'>
            <div className='viewHeader'>
                <h2 className='viewTitle'>Character Generation</h2>
                <h2 className='viewSubtitle'>Character Generation</h2>
            </div>
            <div className='characterType'>
                <FormSelect
                    options={characterTypeOptions} 
                    name='type'
                    label='Character Type'
                    value={character.type}
                    handler={handleChange}
                    autoFocus={true}
                />
            </div>
            <div className='characterName'>
                <FormInput
                    name='displayName'
                    label='Character Name'
                    value={character.displayName}
                    handler={handleChange}
                />
            </div>
            <div className='characterButton'>
                <FormButton
                    type='submit'
                    label='Create Character'
                    handler={handleSubmit}
                />
            </div>
            {/* <div className='progressContainer'>
                {progress.map((marker, index) => (
                    <div key={index} 
                        className={`${marker} progressMarker ${index === currentProgress ? 'active' : ''}`}
                        onClick={() => changeStage(index)}
                    >
                    </div>
                ))}
            </div>
            <div className='subpageContainer'>
                <div className='characterImage'>
                    <img src={character.imageURL} />
                </div>
                {stages[currentProgress]}
            </div> */}
        </div>
    )
}