import { useContext } from 'react';
import CharacterContext from '../../../contexts/characterContext';
import Table from '../../../helpers/characterCreation/table';

export default function Species(props) {

    const [state, setState] = useContext(CharacterContext);

    const speciesList = [
        {   name: 'Cathar',
            brawn: 2,
            agility: 2,
            cunning: 2,
            willpower: 2,
            intellect: 2,
            presence: 2,
            notes: ['Begins with one rank in Feral Strength talent.','Antoher Option']
        },
        {   name: 'Human',
            brawn: 2,
            agility: 2,
            cunning: 2,
            willpower: 2,
            intellect: 2,
            presence: 2,
            notes: ['Option 1','Antoher Option']
        },
        {   name: 'Pantoran',
            brawn: 2,
            agility: 2,
            cunning: 2,
            willpower: 2,
            intellect: 2,
            presence: 2,
            notes: ['Third Species Option1','Antoher Option']
        },
    ];

    function handleComparison () {
        //Take the checked species and compare in right div
    }

    const checkList = speciesList.map((species) =>
        <li>
            <input
                type='checkbox'
                id={`custom-checkbox-${species.name}`}
                value={species.checked}
            />
            {species.name}
        </li>
    )

    const dropdown = speciesList.map((species) => {
        return <option value={species.name}>{species.name}</option>
    })
    

    const selectedSpecies = [{
        name: speciesList[0].name,
        brawn: speciesList[0].brawn,
        agility: speciesList[0].agility,
        cunning: speciesList[0].cunning,
        willpower: speciesList[0].willpower,
        intellect: speciesList[0].intellect,
        presence: speciesList[0].presence
    }]
    const speciesOptions = speciesList[0].notes
    console.log(speciesOptions)
    const optionsObject = []
    for(var i=0;i<speciesOptions.length;i++) {
        optionsObject.push({
            note: speciesOptions[i]
        })
    }
    console.log(optionsObject)

    const notes = optionsObject.map((el) =>
        <li>
            <input
                type='checkbox'
                id={`custom-checkbox-${el.note}`}
                value={el.checked}
            />
            {el.note}
        </li>
    )
    console.log(notes)

    return (
        <div>
            <h2>Select A Species</h2>
            <div className='species-container'>
                <div className='species-list'>
                    {checkList}
                    <button onClick={handleComparison}>Compare</button>
                </div>
                <div className='species-comparison'>
                    <Table type='species' tableData={speciesList} headerData={['Species','Brawn','Agility','Cunning','Presence','Intellect','Willpower','Notes']} />
                </div>
            </div>
            <div className='species-container'>
                <div className='species-comparison' style={{marginLeft: '215px'}}>
                    <select className='select' placeholder='Select Species'>
                        <option></option>
                        {dropdown}
                    </select>
                    <Table type='species' tableData={selectedSpecies} headerData={['Species','Brawn','Agility','Cunning','Presence','Intellect','Willpower']} />
                    <div className='options-list'>
                        {notes}
                        <li>
                            <input
                                type='checkbox'
                                id={'custom-checkbox-force'}
                                value='checked'
                            />
                            Begin with Force Rating
                        </li>
                    </div>
                </div>
            </div>

            <div>
                <input
                    type='submit'
                    id='submit'
                    className='button formButton submitButton'
                    value='Previous'
                    onClick={()  => props.characterCreationView(props.getNextView('species').priorView)}
                />
                <span>
                    <input
                        type='submit'
                        id='submit'
                        className='button formButton submitButton'
                        value='Next'
                        onClick={()  => props.characterCreationView(props.getNextView('species').nextView)}
                    />
                </span>
            </div>
        </div>
    )
}