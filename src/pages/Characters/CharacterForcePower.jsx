import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import useFetchData from '../../hooks/useFetchData';
import {fetchCharacter, updateCharacter} from '../../services/characters';
import {fetchCareer} from '../../services/careers';
import Loading from '../../features/Loading'
import '../Specializations/styles.scss';

export default function CharacterForcePower() {
  const {id, fp_id} = useParams();
  const {data: char, loading} = useFetchData(() => fetchCharacter(id));
  const [character, setCharacter] = useState(null);
  const [forcePower, setForcePower] = useState(null);

  function handleForcePowerPurchase(index) {
    setForcePower(prevState => {
      const updatedUpgrades = prevState.upgrades.map((upgrade, i) => 
        i === index ? { ...upgrade, isPurchased: !upgrade.isPurchased } : upgrade
      );
      
      return {
        ...prevState,
        upgrades: updatedUpgrades
      };
    });
  }

  async function handleForcePowerSave() {
    console.log("Submitting Specialization");
    const fpIndex = character.forcePowers.findIndex(fp => fp.id === fp_id)
    const updatedForcePowers = [...character.forcePowers];
    updatedForcePowers[fpIndex] = {
      ...updatedForcePowers[fpIndex],
      ...forcePower
    }
    try {
      await updateCharacter(id, {forcePowers: updatedForcePowers});
    }
    catch(error) {"Error Updating Character:", error}

  }

  useEffect(() => {
    if (!loading && char) {
      setCharacter(char);
      const fp = char.forcePowers.find((fp) => fp.id === fp_id);
      setForcePower(fp);
    }
  }, [loading, char])

  if(!character || !forcePower) return <Loading />

  return (
    <section className='ForcePowerShowPage'>
      <div className='force-power-overview'>
        <div className='force-power-data'>
          <h1><span>Force Power Tree:</span> {forcePower.name}</h1>
          <p>Prerequisites: Force Rating {forcePower.forceRatingRequired}+</p>
          <button onClick={handleForcePowerSave} className='submit-button'>Save Changes</button>
        </div>
        <div className='force-power-legend'>
          <p className='force'><i className='fas fa-square'></i> Force Ability</p>
        </div>
      </div>
      <div className='upgrades'>
        <div 
          className='upgrade'
          key="1"
          style={{
            gridRow: 1,
            gridColumn: "1 / span 4"
          }}
        >
          <div className='up-links'></div>
          <div className='upgrade-row'>
            <div className={`upgrade-box col-span-4 purchased-true`}>
                <p className='upgrade-name'><input type='checkbox' checked={true} readOnly /> <span>{forcePower.name} Base Power</span></p>
                <p className='upgrade-description'>{forcePower.descriptionShort}</p>
                <p className='upgrade-cost'>{forcePower.cost} XP</p>
            </div>
            <div className={`right-link`}></div>
          </div>
        </div>
        {forcePower.upgrades.map((upgrade, index) => (
            <div 
              className='upgrade'
              key={upgrade.number}
              style={{
                gridRow: upgrade.position.row,
                gridColumn: `${upgrade.position.colStart} / span ${upgrade.position.colSpan}`
              }}
            >
              <div className='up-links' style={{gridTemplateColumns: `repeat(${upgrade.position.colSpan},1fr)`}}>
                {upgrade.links.up?.map((upLink, index) => 
                  <div 
                    key={index}
                    className='up-link true'
                    style={{
                      gridColumn: `${upLink.colStart - upgrade.position.colStart + 1} / span ${upLink.colSpan}`
                    }}
                  ><div className='link-line'></div></div>)}
              </div>
              <div className='upgrade-row'>
                <div className={`upgrade-box purchased-${upgrade.isPurchased || false}`}>
                    <p className='upgrade-name'><input type='checkbox' checked={upgrade.isPurchased || false} className='purchased-checkbox' onChange={() => handleForcePowerPurchase(index)} /> <span>{upgrade.name}</span></p>
                    <p className='upgrade-description'>{upgrade.descriptionShort}</p>
                    <p className='upgrade-cost'>{upgrade.cost} XP</p>
                </div>
                <div className={`right-link ${upgrade.links.right}`}></div>
              </div>
                
            </div>
        ))}
      </div>
    </section>
  )
}