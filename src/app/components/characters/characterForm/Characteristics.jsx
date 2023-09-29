export default function Characteristics({values, handleFormChange}) {

  return (
    <div className='characteristics'>
      <div  className='characteristic brawn'>
        {/*<p className='rank'>{ values.brawn }</p>*/}
        <input 
          className='rank'
          name='brawn'
          value={values.brawn}
          onChange={handleFormChange}
        />
        <p className='label'>Brawn</p>
      </div>
      <div  className='characteristic agility'>
        {/*<p className='rank'>{ values.brawn }</p>*/}
        <input 
          className='rank'
          name='agility'
          value={values.agility}
          onChange={handleFormChange}
        />
        <p className='label'>Agility</p>
      </div>
      <div  className='characteristic intellect'>
        {/*<p className='rank'>{ values.brawn }</p>*/}
        <input 
          className='rank'
          name='intellect'
          value={values.intellect}
          onChange={handleFormChange}
        />
        <p className='label'>Intellect</p>
      </div>
      <div  className='characteristic cunning'>
        {/*<p className='rank'>{ values.brawn }</p>*/}
        <input 
          className='rank'
          name='cunning'
          value={values.cunning}
          onChange={handleFormChange}
        />
        <p className='label'>Cunning</p>
      </div>
      <div  className='characteristic willpower'>
        {/*<p className='rank'>{ values.brawn }</p>*/}
        <input 
          className='rank'
          name='willpower'
          value={values.willpower}
          onChange={handleFormChange}
        />
        <p className='label'>Willpower</p>
      </div>
      <div  className='characteristic presence'>
        {/*<p className='rank'>{ values.brawn }</p>*/}
        <input 
          className='rank'
          name='presence'
          value={values.presence}
          onChange={handleFormChange}
        />
        <p className='label'>Presence</p>
      </div>
    </div>
  )
}