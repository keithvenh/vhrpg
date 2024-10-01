import './styles.scss';

import { fetchAllVehicles } from "../../services/vehicles";
import useFetchData from '../../hooks/useFetchData';

import Loading from '../../features/Loading';
import AlphabetizeWithLink from '../../components/Alphabetize';

export default function Vehicles() {
  const {data: vehicles, loading} = useFetchData(fetchAllVehicles);

  if(loading) return <Loading />

  return (
    <section className='Vehicles'>
      <h1>Starships and Other Vehicles</h1>
      <div className='vehicles-list'>
        <AlphabetizeWithLink data={vehicles} sortField='displayName' linkPrefix='/vehicles/' linkField='id' />
      </div>
    </section>
  )
}