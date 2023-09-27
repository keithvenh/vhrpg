const triumphImage = require('../../assets/images/symbols/r-white.png');
const despairImage = require('../../assets/images/symbols/d-white.png');
const failureImage = require('../../assets/images/symbols/f-white.png');
const threatImage = require('../../assets/images/symbols/t-white.png');
const successImage = require('../../assets/images/symbols/s-white.png');
const advantageImage = require('../../assets/images/symbols/a-white.png');

export default function FilterCharactersButtons({filter, clickHandler}) {
  const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;
    return a.sort().every((value, index) => value === b.sort()[index]);
  };

  return (
    <div className='filterCharactersButtons'>
        <button className={`characterFilterButton ${filter === 'all'}`} onClick={() => clickHandler('all')}>
          <div className='buttonImage'><img src={successImage}></img></div>
          <p className='buttonText'>ALL</p>
        </button>
        <button className={`characterFilterButton ${filter === 'pc'}`} onClick={() => clickHandler('pc')}>
          <div className='buttonImage'><img src={triumphImage}></img></div>
          <p className='buttonText'>PCs</p>
        </button>
        <button className={`characterFilterButton ${filter === 'npc'}`} onClick={() => clickHandler('npc')}>
          <div className='buttonImage'><img src={advantageImage}></img></div>
          <p className='buttonText'>NPCs</p>
        </button>
        <button className={`characterFilterButton ${filter === 'nemesis'}`} onClick={() => clickHandler('nemesis')}>
          <div className='buttonImage'><img src={despairImage}></img></div>
          <p className='buttonText'>NEMESES</p>
        </button>
        <button className={`characterFilterButton ${filter === 'rival'}`} onClick={() => clickHandler('rival')}>
          <div className='buttonImage'><img src={failureImage}></img></div>
          <p className='buttonText'>RIVALS</p>
        </button>
        <button className={`characterFilterButton ${filter === 'minion'}`} onClick={() => clickHandler('minion')}>
          <div className='buttonImage'><img src={threatImage}></img></div>
          <p className='buttonText'>MINIONS</p>
        </button>
        <button className={`characterFilterButton ${filter === 'create'}`} onClick={() => clickHandler('create')}>
          <div className='buttonImage'><i className='fas fa-plus'></i></div>
          <p className='buttonText'>CREATE</p>
        </button>
    </div>  
  )
}