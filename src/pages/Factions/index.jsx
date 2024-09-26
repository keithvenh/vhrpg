export default function Factions() {
  const uncheckbox = <i className='fas fa-square'></i>
  const checkbox = <i className='fas fa-square-check'></i>
  return (
    <section className='Factions'>
      <h1>Factions</h1>
      <ul>
        <li>{uncheckbox} Alphabetical list of all factions with separators</li>
      </ul>
      <hr />
      <h2>Faction</h2>
      <ul>
        <h3>Primary</h3>
        <li>{uncheckbox} Name</li>
        <li>{uncheckbox} Logo</li>
        <li>{uncheckbox} Description</li>
        <li>{uncheckbox} Jobs</li>
        <li>{uncheckbox} Bonuses</li>
        <li>{uncheckbox} Rewards</li>
        <li>{uncheckbox} Known Members</li>
        <li>{uncheckbox} Headquarters Location</li>
        <h3>Secondary</h3>
        <li>{uncheckbox} Current PC Esteem</li>
        <li>{uncheckbox} All PC Esteem</li>
      </ul>
    </section>
  )
}