import { useState, useMemo } from 'react';
import Table from '../../helpers/characterCreation/table';
import FormSelect from '../forms/FormSelect';

export default function Species(props) {

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
    console.log(dropdown)

    return (
        <div>
            <h2>Select A Species</h2>
            <div className='species-container'>
                <div className='species-list'>
                    {checkList}
                    <button onClick={handleComparison}>Compare</button>
                </div>
                <div className='species-comparison'>
                    <Table tableData={speciesList} headerData={['Species','Brawn','Agility','Cunning','Presence','Intellect','Willpower','Notes']} />
                </div>
            </div>
            <div>
                <select className='select' placeholder='Select Species'>
                    <option></option>
                    {dropdown}
                </select>
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