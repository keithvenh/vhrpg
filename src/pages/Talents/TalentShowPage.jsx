import {useParams} from 'react-router-dom';
import {fetchTalent} from '../../services/talents';

export default function TalentShowPage() {
  const {id} = useParams();
  const talent = fetchTalent(id);

    return (
        <section className='Talent'>
          {talent.name}
        </section>
    )
}