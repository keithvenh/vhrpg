import './styles.scss';

import useFetchData from "../../hooks/useFetchData";
import { fetchSpecies } from "../../services/species";
import { useParams } from 'react-router-dom';

import Loading from '../../features/Loading';

export default function SpeciesShowPage() {

  const {id} = useParams();
  const {data: species, loading} = useFetchData(() => fetchSpecies(id))

  if(loading) return <Loading />

  return (
    <section className='SpeciesShowPage'>
      <h1>Galactic Species Profile:</h1>
      <p className='sw id'>{species.id}</p>
      <div className='basic-info'>
        <div className='species-image'>
          {species.imageURL ? <img src={species.imageURL} /> : <i className='fas fa-astronaut'></i>}
        </div>
        <div className='info'>
          <h2>Name: {species.displayName}</h2>
          <div className='data'>
            <p>Homeworld: {species.homeworld || "Unknown"}</p>
          </div>
        </div>
      </div>
      <div className='knowm-members'>
        <h3>Known Members</h3>
        <p>{species.knownMembers || "None Known"}</p>
      </div>
    </section>
  )
}