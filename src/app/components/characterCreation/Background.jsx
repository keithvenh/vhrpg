import { useState } from "react"

export default function Background(props) {

    const [story,setStory] = useState('');
    
    function handleNext() {
        
        props.characterCreationView(props.getNextView('background').nextView)
        //Create code to save text to to a temp state somehow so when you come back
        //It sticks.
    }

    function handleChange(e) {
        setStory(e.target.value);
    }

    return (
        <div>
            <h2>Determine Your Background</h2>
            
            <div className='formField'>
                <textarea 
                    className='story-input'
                    placeholder='Start typing your background . . .'
                    onChange={handleChange}
                    autoFocus
                />
            </div>

            <input 
                type='submit'
                id='submit'
                className='button formButton submitButton'
                value='Next'
                onClick={handleNext}
            />
        </div>
    )
}