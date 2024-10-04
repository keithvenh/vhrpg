import { fetchAllForcePowers } from "../../services/forcePowers"

import AlphabetizeWithLink from '../../components/Alphabetize';

export default function ForcePowers() {
    const forcePowers = fetchAllForcePowers();

    return (
        <section className='ForcePowers'>
            <h1>Force Powers</h1>
            <div className='force-powers-list'>
                <AlphabetizeWithLink data={forcePowers} sortField='name' linkPrefix='/force-powers/' linkField='id' />
            </div>
        </section>
    )
}