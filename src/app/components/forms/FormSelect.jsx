import {useState} from 'react';

export default function FormSelect(props) {
    const [isFocused, setIsFocused] = useState(false);

    return(
        <div className={`formFieldContainer ${props.name}Container`}>
            <div className='formField'>
                <p className={`label ${isFocused && 'hasFocus'}`}>{props.label}</p>

                <select 
                    name={props.name} 
                    id={props.name} 
                    className={`input selectInput ${props.name}Input`}
                    value={props.value}
                    onChange={props.handler}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                >
                    {props.options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.display}
                        </option>
                    ))}

                    {props.children}
                </select>
            </div>
        </div>
    )
}