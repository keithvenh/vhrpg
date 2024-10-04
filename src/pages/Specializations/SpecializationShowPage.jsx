import './styles.scss';

import {useParams} from 'react-router-dom';
import {fetchSpecialization} from '../../services/specializations';

export default function SpecializationShowPage() {
  const {id} = useParams();
  const specialization = fetchSpecialization(id);

    return (
        <section className='SpecializationShowPage'>
          <h1>{specialization.career.name}::{specialization.name}</h1>
          <h2>Specialization Skills: {specialization.skills.map(skill => <span>{skill.name} </span>)}</h2>
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