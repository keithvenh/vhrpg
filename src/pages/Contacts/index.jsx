import './styles.scss';

import { fetchAllContacts } from "../../services/contacts";
import useFetchData from '../../hooks/useFetchData';

import Loading from '../../features/Loading';

export default function Contacts() {
  const {data: contacts, loading} = useFetchData(fetchAllContacts);

  const uncheckbox = <i className='fas fa-square'></i>
  const checkbox = <i className='fas fa-square-check'></i>

  if(loading) return <Loading />

  return (
    <section className='Contacts'>
      <h1>Vorzyd Industries Contact List</h1>
      <div className='contacts-list'>
        {contacts.map(contact => <p key={contact.id}><a href={`/planets/${contact.id}`}>{contact.displayName}</a></p>)}
      </div>
      <hr style={{"borderTop": "3px solid #fff"}} />
      <h2>Contacts</h2>
      <ul>
        <h3>Primary</h3>
        <li>{checkbox} Alphabetical list of all contacts</li>
        <h3>Secondary</h3>
        <li>{uncheckbox} Alphabetical separators or scroll bar</li>
        <li>{uncheckbox} Filter options for contacts [esteem, location]</li>
        <li>{uncheckbox} Search Feature</li>
      </ul>
      <hr />
      <h2>Contact</h2>
      <ul>
        <h3>Primary</h3>
        <li>{uncheckbox} Name</li>
        <li>{uncheckbox} Last Known Location</li>
        <li>{uncheckbox} Wounds</li>
        <li>{uncheckbox} Strain</li>
        <li>{uncheckbox} Esteem</li>
        <li>{uncheckbox} Biography</li>
        <li>{uncheckbox} Type [PC, Nemesis, Rival, Minion]</li>
        <li>{uncheckbox} isContact?</li>
        <h3>Secondary</h3>
      </ul>
    </section>
  )
}