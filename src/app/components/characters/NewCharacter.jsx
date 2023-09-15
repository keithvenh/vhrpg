import { useState, useEffect } from "react";
import FormSelect from '../forms/FormSelect';

export default function NewCharacter() {

    // Determines Form
    const [type, setType] = useState('pc');

    const characterTypeOptions = [
        {value: 'pc', display: 'PlayerCharacter'},
        {value: 'nemesis', display: 'Nemesis'},
        {value: 'rival', display: 'Rival'},
        {value: 'minion', display: 'Minion'}
    ]

    function changeCharacterType(e) {
        setType(e.target.value);
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
                    name='characterType'
                    label='Character Type'
                    value={type}
                    handler={changeCharacterType}
                    autoFocus={true}
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