export default function ForcePowers({character, handler}) {
  return (
    <div className='ForcePowers'>
      <h1>{character.name || character.displayName || "Character"} ForcePowers</h1>
    </div>
  )
}