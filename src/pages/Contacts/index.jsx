import './styles.scss';

import { fetchAllContacts } from "../../services/contacts";
import useFetchData from '../../hooks/useFetchData';

import Loading from '../../features/Loading';
import AlphabetizeWithLink from '../../components/Alphabetize';

export default function Contacts() {
  const {data: contacts, loading} = useFetchData(fetchAllContacts);

  if(loading) return <Loading />

  return (
    <section className='Contacts'>
      <h1>Vorzyd Industries Contact List</h1>
      <div className='contacts-list'>
        <AlphabetizeWithLink data={contacts} sortField='displayName' linkPrefix='/characters/' linkField='id' />
      </div>
    </section>
  )
}