export default function Contacts() {
  const uncheckbox = <i className='fas fa-square'></i>
  const checkbox = <i className='fas fa-square-check'></i>
  return (
    <section className='Contacts'>
      <h1>Contacts</h1>
      <ul>
        <li>{uncheckbox} Alphabetical list of all contacts with separators</li>
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