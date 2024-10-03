export default function Skills({character, handler}) {
  return (
    <div className='Skills'>
      <h1>{character.name || character.displayName || "Character"} Skills</h1>
    </div>
  )
}