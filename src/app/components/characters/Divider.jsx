export default function Divider({label, collapseSection}) {
  return (
    <div className="divider" onClick={() => collapseSection(label)}>
      <hr className="dividerLine"></hr>

      <p className="dividerLabel">{label}</p>

      <hr className="dividerLine"></hr>
    </div>
  )
}