
export default function Motivation(props) {

    return (
        <div>
            <h2>Determine Your Motivation</h2>
            <div>

<input type='submit' id='submit' className='button formButton submitButton' value='Previous' onClick={()  => props.characterCreationView(props.getNextView('motivation').priorView)}/>
<span>
    <input type='submit' id='submit' className='button formButton submitButton' value='Next' onClick={()  => props.characterCreationView(props.getNextView('motivation').nextView)}/>
</span>
</div>
        </div>
    )
}