export default function Specializaitons({character, handler}) {
  return (
    <div className='Specializaitons'>
      <h1>{character.name || character.displayName || "Character"} Specializaitons</h1>
    </div>
  )
}