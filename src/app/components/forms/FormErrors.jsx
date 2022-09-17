
export default function FormErrors(props) {

    return (
        <div className='formFieldContainer formErrorsContainer'>
            <div className='formField'>
                <div className='formErrors'>
                    {props.errors.map((error, index) => (
                        <p className='error' key={index}>{error}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}