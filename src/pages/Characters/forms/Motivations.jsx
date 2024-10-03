export default function Motivations({character, handler}) {
  return (
    <div className='Motivations'>
      <h1>{character.name || character.displayName || "Character"} Motivations</h1>
    </div>
  )
}