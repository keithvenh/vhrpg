
export default function FormCheckbox(props) {

    return(
        <div className={`formFieldContainer ${props.name}Container`}>
            <div className='formField checkboxFormField'>
                {props.options.map((option) =>
                    (<div key={option.id} className={`checkboxContainer ${props.name}CheckboxContainer}`}>
                        <input
                            name={props.name}
                            id={option.id}
                            className={`input checkboxInput ${props.name}CheckboxInput`}
                            type='checkbox'
                            value={option.value}
                            checked={option.value}
                            onChange={props.handler}
                            checked={props.checked.includes(option.value)}
                        />
                        <label 
                            className={`checkboxLabel ${props.name}CheckboxLabel`}
                            htmlFor={option.id}
                        ><i className='checkboxSelector fa-brands fa-galactic-republic'></i> {option.label}</label>
                    </div>
                ))}
                <p className='label'>{props.label}</p>
            </div>
        </div>
    )
}