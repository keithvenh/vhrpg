import { useState } from 'react';

export default function FormInput(props) {
    const [isFocused, setIsFocused] = useState(false);

    return(
        <div className={`formFieldContainer ${props.name}Container`}>
            <div className='formField'>

                <p className={`label ${isFocused && 'hasFocus'}`}>{props.label}</p>

                <input 
                    name={props.name} 
                    id={props.name} 
                    className={`input ${props.type}Input ${props.name}Input`}
                    type={props.type}
                    value={props.value}
                    autoFocus={props.autoFocus}
                    onChange={props.handler}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </div>
        </div>
    )
}