export default function Attributes({character, handler}) {
  return (
    <div className='Attributes'>
      <h1>{character.name || character.displayName || "Character"} Attributes</h1>
    </div>
  )
}