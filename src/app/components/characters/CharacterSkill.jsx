
function CharacterSkill(props) {
    const skill = props.skill;

    return (
        <div className={`skill ${skill.characteristic} ${skill.career}`}>

            <p className='skillName'>{skill.name}</p>
            <div  className='skillRanks'>
                <div className={`skillRank one ${skill.rank >= 1}`}></div>
                <div className={`skillRank two ${skill.rank >= 2}`}></div>
                <div className={`skillRank three ${skill.rank >= 3}`}></div>
                <div className={`skillRank four ${skill.rank >= 4}`}></div>
                <div className={`skillRank five ${skill.rank >= 5}`}></div>
            </div>
        </div>
    )
}

export default CharacterSkill;