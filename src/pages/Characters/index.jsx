export default function Characters() {
  const uncheckbox = <i className='fas fa-square'></i>
  const checkbox = <i className='fas fa-square-check'></i>
  return (
    <section className='Characters'>
      <h1>Characters</h1>
      <ul>
        <li>{uncheckbox} Scrollable list of PCs with images, status bar</li>
        <li>{uncheckbox} Alphabetical list of all characters with separators</li>
        <li>{uncheckbox} Filter options for characters</li>
        <li>{uncheckbox} Search Feature</li>
      </ul>
      <hr />
      <h2>Character</h2>
      <ul>
        <h3>Primary</h3>
        <li>{uncheckbox} Name</li>
        <li>{uncheckbox} Wounds</li>
        <li>{uncheckbox} Strain</li>
        <li>{uncheckbox} Credits</li>
        <li>{uncheckbox} Obligation [Triggered]</li>
        <li>{uncheckbox} Current Location</li>
        <li>{uncheckbox} Force Rating</li>
        <li>{uncheckbox} Morality | Conflict</li>
        <li>{uncheckbox} Type [PC, Nemesis, Rival, Minion]</li>
        <li>{uncheckbox} isContact?</li>
        <h3>Secondary</h3>
        <li>{uncheckbox} Skills</li>
        <li>{uncheckbox} Talents</li>
        <li>{uncheckbox} Force Powers</li>
        <li>{uncheckbox} Gear</li>
        <li>{uncheckbox} Faction Esteem</li>
      </ul>
    </section>
  )
}