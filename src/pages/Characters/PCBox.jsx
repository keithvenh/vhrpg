export default function PCBox({pc}) {

  const emptyBox = (i) => {
    return <i key={i} className='fa-regular fa-square-full'></i>
  }
  const fullBox = (i) => {
    return <i key={i} className='fa-solid fa-square-full'></i>
  }
  const strain = []
  const wounds = []
  for(let i = 0; i < pc.woundsThreshold; i++) {
    let health = pc.woundsThreshold - pc.woundsCurrent;
    if(health > i) {
      wounds.push(fullBox(i))
    }
    else {wounds.push(emptyBox(i))}
  }

  for(let i = 0; i < pc.strainThreshold; i++) {
    let health = pc.strainThreshold - pc.strainCurrent;
    if(health > i) {
      strain.push(fullBox(i))
    }
    else {strain.push(emptyBox(i))}
  }

  return (
    <a href={`/characters/${pc.id}`}>
      <div className='pc-box'>
        <div className='pc-image'>
          <img src={pc.imageURL} />
        </div>
        <div className='pc-info'>
          <p>{pc.displayName}</p>
          <div className='strain'>
            {strain}
          </div>
          <div className='wounds'>
            {wounds}
          </div>
        </div>
      </div>
    </a>
  )
}