import Background from "./forms/Background"
export default function CharacterForm({character}) {

  return (
    <div className='CharacterForm'>
      <Background 
        name={character.name}
        background={character.background}
      />
    </div>
  )
}