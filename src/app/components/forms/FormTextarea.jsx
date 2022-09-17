
export default function FormTextArea(props) {

    return(
        <div className={`formFieldContainer ${props.name}Container`}>
            <div className='formField'>
                <textarea 
                    name={props.name} 
                    id={props.name} 
                    className={`input textareaInput ${props.type}Input ${props.name}Input`}
                    type={props.type}
                    value={props.value}
                    onChange={props.handler}
                    autoFocus={props.autoFocus}
                    placeholder={props.placeholder}
                />
                <p className='label'>{props.label}</p>
            </div>
        </div>
    )
}