export default function Organization() {
  const uncheckbox = <i className='fas fa-square'></i>
  const checkbox = <i className='fas fa-square-check'></i>
  return (
    <section className='Organization'>
      <h1>Vorzyd Industries</h1>
      <ul>
        <li>{uncheckbox} Credits</li>
        <li>{uncheckbox} Members</li>
        <li>{uncheckbox} Property</li>
        <li>{uncheckbox} Hedaquarters</li>
        <li>{uncheckbox} Other Locations</li>
      </ul>
      <hr />
    </section>
  )
}