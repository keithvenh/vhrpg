import './styles.scss';

import {useParams} from 'react-router-dom';
import {fetchSpecialization} from '../../services/specializations';
import {fetchCareer} from '../../services/careers';

export default function SpecializationShowPage() {
  const {id} = useParams();
  const specialization = fetchSpecialization(id);
  console.log(specialization.career.id);
  const career = fetchCareer(specialization.career.id);
  console.log(career)
    return (
        <section className='SpecializationShowPage'>
          <div className='specialization-overview'>
            <div className='specialization-data'>
              <h1><span className='career'>{specialization.career.name}:</span> {specialization.name} Talent Tree</h1>
              <p className='career-skills'>Career Skills: {career.skills.map(c => c.name).join(", ")}</p>
              <p className='specialization-skills'>Bonus Career Skills: {specialization.skills.map(skill => skill.name).join(", ")}</p>
            </div>
            <div className='specialization-legend'>
              <p className='active'><i className='fas fa-square'></i> Active</p>
              <p className='passive'><i className='fas fa-square'></i> Passive</p>
              <p className='force'><i className='fas fa-burst'></i><i className='fas fa-square'></i> Force Talent</p>
            </div>
          </div>
          <div className='talents'>
            {specialization.talents.map(talent => (
                <div className='talent'>
                    <div className={`talent-box active-${talent.isActive}`}>
                        {talent.isForceOnly == "true" ? <i className='fas fa-burst'></i> : ''}
                        <p className='talent-name'><i className='fas fa-square'></i> <span>{talent.name}</span></p>
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