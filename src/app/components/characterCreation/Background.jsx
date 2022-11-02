import { useState } from "react"

export default function Background(props) {
    
    const [story,setStory] = useState('');

    function handleNext() {
        props.characterCreationView(props.getNextView('background').nextView);
        //props.setBackground(story);
    }

    return (
        <div>
            <h2>Determine Your Background</h2>
            
            <div className='formField'>
                <textarea 
                    className='story-input'
                    placeholder='Type your background story . . .'
                    onChange={setStory}
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
//onClick={handleNext}
// function handleNext(func,story) {
    
//     props.characterCreationView(props.getNextView('background').nextView);
//     props.getBackground(story);
// }