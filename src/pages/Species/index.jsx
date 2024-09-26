export default function Species() {
  const uncheckbox = <i className='fas fa-square'></i>
  const checkbox = <i className='fas fa-square-check'></i>
  return (
    <section className='Species'>
      <h1>Species</h1>
      <ul>
        <li>{uncheckbox} Alphabetical list of all species with separators</li>
        <li>{uncheckbox} Filter options for species</li>
        <li>{uncheckbox} Search Feature</li>
      </ul>
      <hr />
      <h2>Species [Singluar]</h2>
      <ul>
        <h3>Primary</h3>
        <li>{uncheckbox} Name</li>
        <li>{uncheckbox} Image</li>
        <li>{uncheckbox} Known Members</li>
        <li>{uncheckbox} Home Planet</li>
        <li>{uncheckbox} Build Information from SWRPG Books</li>
        <li>{uncheckbox} encountered?</li>
        <h3>Secondary</h3>
        <li>{uncheckbox} Description from SWRPG Books</li>
      </ul>
    </section>
  )
}