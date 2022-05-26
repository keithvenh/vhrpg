function CharacterLink(props) {

    return (
        <p className='charName' onClick={() => props.updateView('character', '', props.character)}>{props.character.displayName}</p>
    )
}

export default CharacterLink;