export default function Species({character, handler}) {
  return (
    <div className='Species'>
      <h1>{character.name || character.displayName || "Character"} Species</h1>
    </div>
  )
}