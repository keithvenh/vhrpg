import { fetchAllTalents } from "../../services/talents"

import AlphabetizeWithLink from '../../components/Alphabetize';

export default function Talents() {
    const talents = fetchAllTalents();

    return (
        <section className='Talents'>
            <h1>Talents</h1>
            <div className='talents-list'>
                <AlphabetizeWithLink data={talents} sortField='name' linkPrefix='/talents/' linkField='id' />
            </div>
        </section>
    )
}