export default function Planets() {
  const uncheckbox = <i className='fas fa-square'></i>
  const checkbox = <i className='fas fa-square-check'></i>
  return (
    <section className='Planets'>
      <h1>Planets</h1>
      <ul>
        <li>{uncheckbox} Alphabetical list of all planets with separators</li>
        <li>{uncheckbox} Filter options [visited, sector, rim, grid]</li>
        <li>{uncheckbox} Search Feature</li>
      </ul>
      <hr />
      <h2>Planet</h2>
      <ul>
        <h3>Primary</h3>
        <li>{uncheckbox} Name</li>
        <li>{uncheckbox} Image</li>
        <li>{uncheckbox} Description</li>
        <li>{uncheckbox} visited?</li>
        <li>{uncheckbox} location data [rim, sector, grid]</li>
        <h3>Secondary</h3>
        <li>{uncheckbox} Other SWRPG Data</li>
        <li>{uncheckbox} Distance From Current Location</li>
      </ul>
    </section>
  )
}