export default function Equipment({character, handler}) {
  return (
    <div className='Equipment'>
      <h1>{character.name || character.displayName || "Character"} Equipment</h1>
    </div>
  )
}