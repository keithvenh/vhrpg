export default function Appearance({character, handler}) {
  return (
    <div className='Appearance'>
      <h1>{character.name || character.displayName || "Character"} Appearance</h1>
    </div>
  )
}