
export default function FormInput(props) {

    return(
        <div className={`formFieldContainer ${props.name}Container`}>
            <div className='formField'>
                <input 
                    name={props.name} 
                    id={props.name} 
                    className={`input ${props.type}Input ${props.name}Input`}
                    type={props.type}
                    value={props.value}
                    onChange={props.handler}
                    autoFocus={props.autoFocus}
                />
                <p className='label'>{props.label}</p>
            </div>
        </div>
    )
}