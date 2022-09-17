
export default function FormSelect(props) {

    return(
        <div className={`formFieldContainer ${props.name}Container`}>
            <div className='formField'>
                <select 
                    name={props.name} 
                    id={props.name} 
                    className={`input selectInput ${props.name}Input`}
                    value={props.value}
                    onChange={props.handler}
                >
                    {props.options.map((option) => (
                        <option value={option.value}>
                            {option.display}
                        </option>
                    ))}

                    {props.children}
                </select>
                <p className='label'>{props.label}</p>
            </div>
        </div>
    )
}