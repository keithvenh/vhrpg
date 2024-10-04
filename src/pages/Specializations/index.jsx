import { fetchAllSpecializations } from "../../services/specializations"

import AlphabetizeWithLink from '../../components/Alphabetize';

export default function Specializations() {
    const specializations = fetchAllSpecializations();

    return (
        <section className='Specializations'>
            <h1>Specializations</h1>
            <div className='specializations-list'>
                <AlphabetizeWithLink data={specializations} sortField='name' linkPrefix='/specializations/' linkField='id' />
            </div>
        </section>
    )
}