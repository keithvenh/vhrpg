import { useContext } from "react";
import FormCheckbox from "../forms/FormCheckbox";
import CharacterContext from '../../contexts/characterContext';

export default function GameMechanics(props) {
    
    const [state, setState] = useContext(CharacterContext);

    const gameMechanics = {
        obligation: [
            {id: 'oxp5', value: state.oxp5, label: '+5XP / +5 Obligation'},
            {id: 'oxp10', value: state.oxp10, label: '+10XP / +10 Obligation'},
            {id: 'ocr1000', value: state.ocr1000, label: '+1,000 Credits / +5 Obligation'},
            {id: 'ocr2500', value: state.ocr2500, label: '+2,500 Credits / +10 Obligation'}
        ],
        duty: [
            {id: 'dxp5', value: state.dxp5, label: '+5XP / -5 Duty'},
            {id: 'dxp10', value: state.dxp10, label: '+10XP / -10 Duty'},
            {id: 'dcr1000', value: state.dcr1000, label: '+1,000 Credits / -5 Duty'},
            {id: 'dcr2500', value: state.dcr2500, label: '+2,500 Credits / -10 Duty'}
        ],
        morality: [
            {id: 'mxp10', value: state.mxp10, label: '+10XP'},
            {id: 'mcr2500', value: state.mcr2500, label: '+2,500 Credits'},
            {id: 'mxp5cr1000', value: state.mxp5cr1000, label: '+5XP & +1,000 Credits'}
        ]
    }

    function handleInput(event) {

        const mechanicID = event.target.id;

        let xp = state.xpAdd
        let cr = state.creditAdd
        let ob = state.totalObligation
        let du = state.totalDuty

        switch(mechanicID) {
            case 'oxp5':
                xp += event.target.checked ? 5 : -5
                cr += 0
                ob += event.target.checked ? 5 : -5
                break;
            case 'oxp10':
                xp += event.target.checked ? 10 : -10
                cr += 0
                ob += event.target.checked ? 10 : -10
                break;
            case 'ocr1000':
                xp += 0
                cr += event.target.checked ? 1000 : -1000
                ob += event.target.checked ? 5 : -5
                break;
            case 'ocr2500':
                xp += 0
                cr += event.target.checked ? 2500 : -2500
                ob += event.target.checked ? 10 : -10
                break;
            case 'dxp5':
                xp += event.target.checked ? 5 : -5
                cr += 0
                du += event.target.checked ? -5 : 5
                break;
            case 'dxp10':
                xp += event.target.checked ? 10 : -10
                cr += 0
                du += event.target.checked ? -10 : 10
                break;
            case 'dcr1000':
                xp += 0
                cr += event.target.checked ? 1000 : -1000
                du += event.target.checked ? -5 : 5
                break;
            case 'dcr2500':
                xp += 0
                cr += event.target.checked ? 2500 : -2500
                du += event.target.checked ? -10 : 10
                break;
            case 'mxp10':
                xp += event.target.checked ? 10 : -10
                cr += 0
                break;
            case 'mcr2500':
                xp += 0
                cr += event.target.checked ? 2500 : -2500
                break;
            case 'mxp5cr1000':
                xp += event.target.checked ? 5 : -5
                cr += event.target.checked ? 1000 : -1000
                break;
            default:
                break;
        }
            
        setState(state => ({
            ...state,
            xpAdd: xp,
            creditAdd: cr,
            totalObligation: ob,
            totalDuty: du,
            [mechanicID]: event.target.checked
        }))
    }
    console.log(state);

    return (
        <div>
            <div className='mechanics-container'>
                <div className='mechanic'>
                    Starting Obligation: {state.startingObligation}
                    <br />
                    Total Obligation: {state.totalObligation}
                    <br />
                    <br />
                    <div style={{textAlign: 'left'}}>Choose any number of these:</div>
                    <FormCheckbox 
                        name='newCharacter'
                        options={gameMechanics.obligation}
                        handler={handleInput}
                    />
                    <div style={{textAlign: 'left'}}>* Total Obligation can't exceed {state.startingObligation * 2}</div>
                    <br />
                </div>
                
                <div className='mechanic' style={{width: '450px'}}>
                    Starting Duty: {state.startingDuty}
                    <br />
                    Total Duty: {state.totalDuty}
                    <br />
                    <br />
                    <div style={{textAlign: 'left'}}>Choose any number of these:</div>
                    <FormCheckbox 
                        name='newCharacter'
                        options={gameMechanics.duty}
                        handler={handleInput}
                    />
                    <div style={{textAlign: 'left'}}>* Total Duty can't be less than 0</div>
                    <br />
                </div>
                
                <div className='mechanic' style={{width: '390px'}}>
                    Starting Morality: 50
                    <br />
                    <br />
                    <br />
                    <div style={{textAlign: 'left'}}>Choose only ONE of these:</div>
                    <FormCheckbox 
                        name='newCharacter'
                        options={gameMechanics.morality}
                        handler={handleInput}
                    />
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