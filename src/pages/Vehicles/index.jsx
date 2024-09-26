export default function Vehicles() {
  const uncheckbox = <i className='fas fa-square'></i>
  const checkbox = <i className='fas fa-square-check'></i>
  return (
    <section className='Vehicles'>
      <h1>Vehicles</h1>
      <ul>
        <li>{uncheckbox} Scrollable list of PC Vehicles with images, status bar</li>
        <li>{uncheckbox} Alphabetical list of all vehicles with separators</li>
        <li>{uncheckbox} Filter options for vehicles [class, enc]</li>
        <li>{uncheckbox} Search Feature</li>
      </ul>
      <hr />
      <h2>Vehicle</h2>
      <ul>
        <h3>Primary</h3>
        <li>{uncheckbox} Name</li>
        <li>{uncheckbox} Wounds</li>
        <li>{uncheckbox} Strain</li>
        <li>{uncheckbox} Armor</li>
        <li>{uncheckbox} Type</li>
        <li>{uncheckbox} Current Location</li>
        <li>{uncheckbox} Silhouette</li>
        <li>{uncheckbox} Consumables</li>
        <li>{uncheckbox} Fuel</li>
        <li>{uncheckbox} Encumbrance</li>
        <h3>Secondary</h3>
        <li>{uncheckbox} Weapons</li>
        <li>{uncheckbox} Other standar SWRPG vehicle information</li>
      </ul>
    </section>
  )
}