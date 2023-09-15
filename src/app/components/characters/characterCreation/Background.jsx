import { useContext } from "react";
import CharacterContext from '../../../contexts/characterContext';

export default function Background(props) {
    
    const [state, setState] = useContext(CharacterContext);
    console.log(state.background);

    function handleChange(e) {
        setState(state => ({...state, background: e.target.value}))
    };

    return (
        <div>
            <h2>Determine Your Background</h2>
            
            <div className='formField'>
                <textarea 
                    className='story-input'
                    defaultValue={state.background}
                    placeholder='Type your background story . . .'
                    onChange={handleChange}
                    autoFocus
                />
            </div>

            <input 
                type='submit'
                id='submit'
                className='button formButton submitButton'
                value='Next'
                onClick={() => props.characterCreationView(props.getNextView('background').nextView)}
            />
        </div>
    )
}