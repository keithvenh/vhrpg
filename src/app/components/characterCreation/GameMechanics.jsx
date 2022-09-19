import { useState } from "react"
import FormCheckbox from "../forms/FormCheckbox"



export default function GameMechanics(props) {
    
    const startingObligation = 20
    const startingDuty = 20
    
    const [totalObligation,setTotalObligation] = useState(startingObligation)
    const [totalDuty,setTotalDuty] = useState(startingDuty)

    const gameMechanics = {
        obligation: [
            {id: 'o-xp-5', value: false, label: '+5XP                    +5 Obligation'},
            {id: 'o-xp-10', value: false, label: '+10XP                   +10 Obligation'},
            {id: 'o-cr-1000', value: false, label: '+1,000 Credits     +5 Obligation'},
            {id: 'o-cr-2500', value: false, label: '+2,500 Credits     +10 Obligation'}
        ],
        duty: [
            {id: 'd-xp-5', value: false, label: '+5XP                    -5 Duty'},
            {id: 'd-xp-10', value: false, label: '+10XP                   -10 Duty'},
            {id: 'd-cr-1000', value: false, label: '+1,000 Credits     -5 Duty'},
            {id: 'd-cr-2500', value: false, label: '+2,500 Credits     -10 Duty'}
        ],
        morality: [
            {id: 'm-xp-10', value: false, label: '+10XP'},
            {id: 'm-cr-2500', value: false, label: '+2,500 Credits'},
            {id: 'm-xp-5-cr-1000', value: false, label: '+5XP and +1,000 Credits'}
        ]

    }

    // function handleInput(event) {
    //     if(event.target.type === 'checkbox') {
    //         setForm({...form, [event.target.id]: event.target.checked});
    //     } else if(event.target.type === 'radio') {
    //         setForm({...form, [event.target.name]: event.target.value === 'true'})
    //     } else {
    //         setForm({...form, [event.target.name]: event.target.value})
    //     }
    // }

    return (
        <div>
            <div className='mechanics-container'>
                <div className='mechanic'>
                    Starting Obligation: {startingObligation}
                    <div>Total Obligation: {totalObligation}</div>
                    <FormCheckbox 
                        name='obligation'
                        label='Obligation'
                        options={gameMechanics.obligation}
                    />
                    - You may choose any of these options once.
                    <div>- Your choices cannot exceed Starting Obligation.</div>
                </div>
                
                <div className='mechanic'>
                    Starting Duty: {startingDuty}
                    <div>Total Duty: {totalDuty}</div>
                    <FormCheckbox 
                        name='duty'
                        label='Duty'
                        options={gameMechanics.duty}
                    />
                    - You may choose any of these options once.
                    <div>- You cannot spend more than Starting Duty.</div>
                </div>
                
                <div className='mechanic'>
                    Starting Morality: 50
                    <FormCheckbox 
                        name='morality'
                        label='Morality'
                        options={gameMechanics.morality}
                    />
                    -You may choose one of these options.
                </div>
            </div>
            
            <div>
                <div>
                    <input 
                        type='submit'
                        id='submit'
                        className='button formButton submitButton'
                        value='Previous'
                        onClick={()  => props.characterCreationView(props.getNextView('gameMechanics').priorView)}
                    />
                    <span>
                        <input
                            type='submit'
                            id='submit'
                            className='button formButton submitButton'
                            value='Next'
                            onClick={()  => props.characterCreationView(props.getNextView('gameMechanics').nextView)}
                        />
                    </span>
                </div>
            </div>
        </div>
    )
}