
export default function Appearance(props) {

    return (
        <div>
            <h2>Determine Your Appearance</h2>
            <div>

            <input type='submit' id='submit' className='button formButton submitButton' value='Previous' onClick={()  => props.characterCreationView(props.getNextView('appearance').priorView)}/>
            <span>
                <input type='submit' id='submit' className='button formButton submitButton' value='Next' onClick={()  => props.characterCreationView(props.getNextView('appearance').nextView)}/>
            </span>
            </div>
        </div>
    )
}