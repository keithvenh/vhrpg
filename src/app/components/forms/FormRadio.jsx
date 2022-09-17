
export default function FormRadio(props) {

    console.log(props)
    return(
        <div className={`formFieldContainer ${props.name}Container`}>
            <div className='formField'>
                {props.options.map((option) =>
                    (<div className={`radioContainer ${props.name}radioContainer}`}>
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
                        >{option.label}</label>
                    </div>
                ))}
                <p className='label'>{props.label}</p>
            </div>
        </div>
    )
}