export default function Settings() {
  const uncheckbox = <i className='fas fa-square'></i>
  const checkbox = <i className='fas fa-square-check'></i>
  return (
    <section className='Settings'>
      <h1>Settings</h1>
      <ul>
        <h3>Primary</h3>
        <li>{uncheckbox} Active PC</li>
        <li>{uncheckbox} Primary PC</li>
        <li>{uncheckbox} PC List Order</li>
        <h3>Secondary</h3>
        <li>{uncheckbox} Design Options [primaryColor, secondaryColor, font]</li>
      </ul>
    </section>
  )
}