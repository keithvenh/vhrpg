
export default function Gear(props) {

    return (
        <div>
            <h2>Purchase Gear</h2>
            <div>

            <input type='submit' id='submit' className='button formButton submitButton' value='Previous' onClick={()  => props.characterCreationView(props.getNextView('gear').priorView)}/>
            <span>
                <input type='submit' id='submit' className='button formButton submitButton' value='Next' onClick={()  => props.characterCreationView(props.getNextView('gear').nextView)}/>
            </span>
            </div>
        </div>
    )
}