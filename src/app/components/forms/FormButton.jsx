
export default function FormButton(props) {

    return (
        <div className={`formFieldContainer submitButtonContainer buttonContainer`}>
            <div className='formField'>
                <input type='submit' id='submit' className='button formButton submitButton' value={props.label}/>
            </div>
        </div> 
    )
}