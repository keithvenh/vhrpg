
export default function FormRadio(props) {

    return(
        <div className={`formFieldContainer ${props.name}Container`}>
            <div className='formField radioFormField'>
                {props.options.map((option) =>
                    (<div key={option.id} className={`radioContainer ${props.name}RadioContainer}`}>
                        <input
                            name={props.name}
                            id={option.id}
                            className={`input radioInput ${props.name}RadioInput`}
                            type='radio'
                            value={option.value}
                            onChange={props.handler}
                            checked={props.value === option.value}
                        />
                        <label 
                            className={`radioLabel ${props.name}RadioLabel`}
                            htmlFor={option.id}
                        ><i className='radioSelector fa-brands fa-galactic-republic'></i> {option.label}</label>
                    </div>
                ))}
                <p className='label'>{props.label}</p>
            </div>
        </div>
    )
}