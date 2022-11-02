import { useState } from 'react';
import Table from '../../helpers/characterCreation/table';

export default function CareerAndSpecialization(props) {

    const [career,setCareer] = useState({});
    const [specializations,setSpecializations] = useState({});
    const [careerSkills,setCareerSkills] = useState([]);
    const [specialization,setSpecialization] = useState({});
    const [bonusSkills,setBonusSkills] = useState([]);
    
    const careerList = [
        {   name: 'Bounty Hunter',
            role: 'The name says it all: this is a hunter who seeks to collect bouties for his work.',
            stories: 'The average, sane person does not become a Bounty Hunter.',
            extras: 'The Bounty Hunters Creed: People Dont Have Bounties, only Acquisitions have bounties.',
            careerSkills: ['Athletics','Brawl','Perception','Piloting (Planetary)','Piloting (Space)','Ranged (Heavy)','Streetwise','Vigilance'],
            specializations: ['Assassin','Gadgeteer','Survivalist']
        },
        {   name: 'Colonist',
            role: 'In a way, Colonists are the most out-of-place people in the Outer Rim.',
            stories: 'What drives a Colonist to abandon the comforts and safety of the Core Worlds and take such terrilbe risks?',
            extras: 'The Colony: The Outer Rim is dotted with colonies large and small, each with its own charcter.',
            careerSkills: ['Charm','Deception','Knowledge (Core Worlds)','Knowledget (Education)','Knowledge (Lore)','Leadership','Negotiation','Streetwise'],
            specializations: ['Doctor','Politico','Scholar']
        },
        {   name: 'Explorer',
            role: 'The Empire is vast, but it is amere fraction of the galaxy.',
            stories: 'The most common trait among Explorers is the need to travel.',
            extras: 'Unknown Stars: There are, by most estimations, about 400 billion stars in the galaxy.',
            careerSkills: ['Astrogation','Cool','Knowledge (Lore)','Knowledge (Outer Rim)','Knowledge (Xenology)','Perception','Piloting (Space)','Survival'],
            specializations: ['Fringer','Scout','Trader']
        },
    ];


    const specializationList = [
        {   career: 'Bounty Hunter',
            name: 'Assassin',
            notes: 'These are the notes.',
            bonusCareerSkills: ['Bonus 1','Bonus 2','Bonus 3']
        },
        {   career: 'Bounty Hunter',
            name: 'Gadgeteer',
            notes: 'These are the notes.',
            bonusCareerSkills: ['Bonus 3','Bonus 2','Bonus 1']
        },
        {   career: 'Bounty Hunter',
            name: 'Survivalist',
            notes: 'These are the notes.',
            bonusCareerSkills: ['Bonus 4','Bonus 5','Bonus 6']
        },
        {   career: 'Colonist',
            name: 'Doctor',
            notes: 'These are the notes.',
            bonusCareerSkills: ['Bonus 1','Bonus 2','Bonus 3']
        },
        {   career: 'Colonist',
            name: 'Politico',
            notes: 'These are the notes.',
            bonusCareerSkills: ['Bonus 3','Bonus 2','Bonus 1']
        },
        {   career: 'Colonist',
            name: 'Scholar',
            notes: 'These are the notes.',
            bonusCareerSkills: ['Bonus 4','Bonus 5','Bonus 6']
        },
    ];

    function handleClick(key) {
        
        const chosenCareer = careerList.filter(obj => {
            return obj.name === 'Bounty Hunter'; //Pass in line key and set obj.name === key
        });
        setCareer(chosenCareer[0]);
        setCareerSkills(career.careerSkills)

        const specFilter = specializationList.filter(obj => {
            return obj.career === career.name
        })
        setSpecializations(specFilter);

        console.log(career)
        console.log(specializations)
        console.log(careerSkills)

    }
    
    function CareerChoices() {
        console.log(career);
        console.log(specializations);
        if (Object.keys(career).length > 0 && Object.keys(specializations).length > 0) {
            return (
                <div className='chosen-career'>
                    <p>{career.name}</p>
                    <p>Role: <br /> {career.role}</p>
                    <p>Stories: <br /> {career.stories}</p>
                    <p>Extras: <br /> {career.extras}</p>
                    <Table type='specializations' tableData={specializations} headerData={['Specialization', 'Bonus Career Skills']} handleClick={handleSpecClick}/>
                </div>
            );
        } else {
            return (
                <div className='chosen-career'>
                    <p>Career Not Chosen</p>
                </div>
            );
        }
    }

    function handleSpecClick(key) {
        const chosenSpecialization = specializationList.filter(obj => {
            return obj.name === 'Assassin' //Pass in line key and set obj.name === key
        });

        setSpecialization(chosenSpecialization);
        setBonusSkills(specialization.bonusCareerSkills);
        console.log(specialization);
        console.log(bonusSkills);
    }

    function SkillDrop() {
        
        if(!careerSkills) return <></>
        
        const skillOptions = careerSkills.map((skill) => {
            return <option value={skill} key={skill}>{skill}</option>
        })

        return (
            <div>
                Career Skills:
                <select className='select'>
                    <option></option>
                    {skillOptions}
                </select>
                <select className='select'>
                    <option></option>
                    {skillOptions}
                </select>
                <select className='select'>
                    <option></option>
                    {skillOptions}
                </select>
            </div>
        )
    }
    
    
    function BonusDrop() {

        if(!bonusSkills) return <></>
        console.log(bonusSkills)
        const bonusOptions = bonusSkills.map((skill) => {
            return <option value={skill} key={skill}>{skill}</option>
        })

        return (
            <div>
                Bonus Career Skills:
                <select className='select'>
                    <option></option>
                    {bonusOptions}
                </select>
                <select className='select'>
                    <option></option>
                    {bonusOptions}
                </select>
            </div>
        )
    }

    return (
        <div>

            <h2>Select A Career</h2>

            <div className='career-container'>
                <div className='career-list'>
                    <Table type='career' tableData={careerList} headerData={['Career','Career Skills']} handleClick={handleClick}/>
                </div>
            </div>

            <div className='career-container'>
                <CareerChoices handleClick={handleSpecClick}/>
                <div>
                    <SkillDrop />
                    
                    <br />
                    <br />

                    <BonusDrop />
                </div>
            </div>

            <div>
                <input 
                    type='submit'
                    id='submit'
                    className='button formButton submitButton'
                    value='Previous'
                    onClick={()  => props.characterCreationView(props.getNextView('career').priorView)}
                />
                <span>
                    <input
                        type='submit'
                        id='submit'
                        className='button formButton submitButton'
                        value='Next'
                        onClick={()  => props.characterCreationView(props.getNextView('career').nextView)}
                    />
                </span>
            </div>

        </div>
    )
}