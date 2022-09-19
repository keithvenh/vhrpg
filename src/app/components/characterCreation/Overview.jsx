
export default function Overview(props) {

    return (
        <div>
            <h2>Character Overview</h2>
            <div>

<input type='submit' id='submit' className='button formButton submitButton' value='Previous' onClick={()  => props.characterCreationView(props.getNextView('overview').priorView)}/>
<span>
    <input type='submit' id='submit' className='button formButton submitButton' value='Next' onClick={()  => props.characterCreationView(props.getNextView('overview').nextView)}/>
</span>
</div>
        </div>
    )
}