export default function Weapons({character, handler}) {
  return (
    <div className='Weapons'>
      <h1>{character.name || character.displayName || "Character"} Weapons</h1>
    </div>
  )
}