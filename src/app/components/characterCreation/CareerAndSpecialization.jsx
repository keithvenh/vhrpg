
export default function CareerAndSpecialization(props) {

    return (
        <div>

            <h2>Select A Career</h2>
            <div>

            <input type='submit' id='submit' className='button formButton submitButton' value='Previous' onClick={()  => props.characterCreationView(props.getNextView('career').priorView)}/>
            <span>
                <input type='submit' id='submit' className='button formButton submitButton' value='Next' onClick={()  => props.characterCreationView(props.getNextView('career').nextView)}/>
            </span>
            </div>
        </div>
    )
}