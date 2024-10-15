import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import useFetchData from '../../hooks/useFetchData';
import {fetchCharacter, updateCharacter} from '../../services/characters';
import {fetchCareer} from '../../services/careers';
import Loading from '../../features/Loading'
import '../Specializations/styles.scss';

export default function CharacterSpecialization() {
  const {id, spec_id} = useParams();
  const {data: char, loading} = useFetchData(() => fetchCharacter(id));
  const [character, setCharacter] = useState(null);
  const [specialization, setSpecialization] = useState(null);
  const [career, setCareer] = useState(null);

  function handleTalentPurchase(index) {
    setSpecialization(prevState => {
      const updatedTalents = prevState.talents.map((talent, i) => 
        i === index ? { ...talent, isPurchased: !talent.isPurchased } : talent
      );
      
      return {
        ...prevState,
        talents: updatedTalents
      };
    });
  }

  async function handleSpecializationSave() {
    console.log("Submitting Specialization");
    const specIndex = character.specializations.findIndex(spec => spec.id === spec_id)
    const updatedSpecializations = [...character.specializations];
    updatedSpecializations[specIndex] = {
      ...updatedSpecializations[specIndex],
      ...specialization
    }
    try {
      await updateCharacter(id, {specializations: updatedSpecializations});
    }
    catch(error) {"Error Updating Character:", error}

  }

  useEffect(() => {
    if (!loading && char) {
      setCharacter(char);
      const spec = char.specializations.find((spec) => spec.id === spec_id);
      const career = fetchCareer(spec.career.id)
      setSpecialization(spec);
      setCareer(career);
    }
  }, [loading, char])

  if(!character || !specialization) return <Loading />

  return (
    <section className='SpecializationShowPage'>
      <div className='specialization-overview'>
        <div className='specialization-data'>
          <h1><span className='career'>{specialization.career.name}:</span> {specialization.name} Talent Tree</h1>
          <p className='career-skills'>Career Skills: {career.skills.map(c => c.name).join(", ")}</p>
          <p className='specialization-skills'>Bonus Career Skills: {specialization.skills.map(skill => skill.name).join(", ")}</p>
          <button onClick={handleSpecializationSave} className='submit-button'>Save Changes</button>
        </div>
        <div className='specialization-legend'>
          <p className='active'><i className='fas fa-square'></i> Active</p>
          <p className='passive'><i className='fas fa-square'></i> Passive</p>
          <p className='force'><i className='fas fa-burst'></i><i className='fas fa-square'></i> Force Talent</p>
        </div>
      </div>
      <div className='talents'>
        {specialization.talents.map((talent, index) => (
            <div className='talent'>
                <div className={`talent-box active-${talent.isActive || false} purchased-${talent.isPurchased || false}`}>
                    {talent.isForceOnly == "true" ? <i className='fas fa-burst'></i> : ''}
                    <p className='talent-name'><input type='checkbox' checked={talent.isPurchased || false} className='purchased-checkbox' onChange={() => handleTalentPurchase(index)} /> <span>{talent.name}</span></p>
                    <p className='talent-description'>{talent.description}</p>
                    <p className='talent-cost'>{talent.cost} XP</p>
                </div>
                <div className={`right-link ${talent.links.right}`}></div>
                <div className={`down-link ${talent.links.down}`}></div>
            </div>
        ))}
      </div>
    </section>
  )
}