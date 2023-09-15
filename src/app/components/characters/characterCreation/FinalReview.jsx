
export default function FinalReview(props) {

    function handleSubmit() {

    }

    return (
        <div>
            <h2>Final Review</h2>
            <input type='submit' id='submit' className='button formButton submitButton' value='Previous' onClick={()  => props.characterCreationView(props.getNextView('finalReview').priorView)}/>
            <span>
                <input type='submit' id='submit' className='button formButton submitButton' value='Create Character' onClick={handleSubmit}/>
            </span>
        </div>
    )
}