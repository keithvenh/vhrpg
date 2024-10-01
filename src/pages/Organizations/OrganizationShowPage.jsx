import './styles.scss';

import useFetchData from "../../hooks/useFetchData";
import { fetchOrganization } from "../../services/organizations";
import { useParams } from 'react-router-dom';

import Loading from '../../features/Loading';

export default function OrganizationShowPage() {

  const {id} = useParams();
  const {data: organization, loading} = useFetchData(() => fetchOrganization(id))

  if(loading) return <Loading />

  return (
    <section className='OrganizationShowPage'>
      <h1>Galactic Organization Profile:</h1>
      <p className='sw id'>{organization.id}</p>
      <div className='basic-info'>
        <div className='organization-image'>
          {organization.imageURL ? <img src={organization.imageURL} /> : <i className='fas fa-building-columns'></i>}
        </div>
        <div className='info'>
          <h2>Name: {organization.displayName}</h2>
          <div className='data'>
            <p>Headquarters: {
              organization.headquarters ? 
              `
              ${organization.headquarters.planet} ::
              ${organization.headquarters.sector} ::
              ${organization.headquarters.region}
              ` : "Unknown" } </p>
            <h3>Description</h3>
            <p>{organization.description || "None Available"}</p>
          </div>
        </div>
      </div>
      <div className='knowm-members'>
        <h3>Known Members</h3>
        <p>{organization.knownMembers || "None Known"}</p>
      </div>
    </section>
  )
}