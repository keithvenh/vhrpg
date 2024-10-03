export default function Characteristics({character, handler}) {
  return (
    <div className='Characteristics'>
      <h1>{character.name || character.displayName || "Character"} Characteristics</h1>
    </div>
  )
}