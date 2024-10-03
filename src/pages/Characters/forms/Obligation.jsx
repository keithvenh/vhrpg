export default function Obligation({character, handler}) {
  return (
    <div className='Obligation'>
      <h1>{character.name || character.displayName || "Character"} Obligation</h1>
    </div>
  )
}