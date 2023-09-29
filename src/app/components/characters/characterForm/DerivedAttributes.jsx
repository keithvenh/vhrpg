export default function DerivedAttributes({values, handleFormChange}) {

  return (
    <div className='derivedAttributes'>

      <div className='attributeContainer'>
        <p className='attributeLabel'>Soak</p>
        <div className='values'>
          <div className='current'>
            <input 
              className='value'
              name='soakThreshold'
              value={values.soakThreshold}
              onChange={handleFormChange}
            />
            <p className='sublabel'>Current</p>
          </div>
        </div>
      </div>

      <div className='attributeContainer'>
        <p className='attributeLabel'>Wounds</p>
        <div className='values'>
          <div className='threshold'>
            <input
              className='value'
              name='woundsThreshold'
              value={values.woundsThreshold}
              onChange={handleFormChange}
            />
            <p className='sublabel'>Threshold</p>
          </div>
          <div className='current'>
            <input 
              className='value'
              name='woundsCurrent'
              value={values.woundsCurrent}
              onChange={handleFormChange}
            />
            <p className='sublabel'>Current</p>
          </div>
        </div>
      </div>

      <div className='attributeContainer'>
        <p className='attributeLabel'>Strain</p>
        <div className='values'>
          <div className='threshold'>
            <input
              className='value'
              name='strainThreshold'
              value={values.strainThreshold}
              onChange={handleFormChange}
            />
            <p className='sublabel'>Threshold</p>
          </div>
          <div className='current'>
            <input 
              className='value'
              name='strainCurrent'
              value={values.strainCurrent}
              onChange={handleFormChange}
            />
            <p className='sublabel'>Current</p>
          </div>
        </div>
      </div>

      <div className='attributeContainer'>
        <p className='attributeLabel'>Defense</p>
        <div className='values'>
          <div className='ranged'>
            <input
              className='value'
              name='defenseRanged'
              value={values.defenseRanged}
              onChange={handleFormChange}
            />
            <p className='sublabel'>Ranged</p>
          </div>
          <div className='melee'>
            <input 
              className='value'
              name='defenseMelee'
              value={values.defenseMelee}
              onChange={handleFormChange}
            />
            <p className='sublabel'>Melee</p>
          </div>
        </div>
      </div>

      <div className='attributeContainer'>
        <p className='attributeLabel'>Force Rating</p>
        <div className='values'>
          <div className='threshold'>
            <input
              className='value'
              name='forceRating'
              value={values.forceRating}
              onChange={handleFormChange}
            />
            <p className='sublabel'>Rating</p>
          </div>
          <div className='current'>
            <input 
              className='value'
              name='forceCommitted'
              value={values.forceCommitted}
              onChange={handleFormChange}
            />
            <p className='sublabel'>Committed</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// <div className='derived' id="attributes">
// //                             <div className="attributeContainer soak">
// //                                 <div className="label">Soak</div>
// //                                 <div className="values">
// //                                     <div className='current'>
// //                                         <p className='value'>{this.props.character.attributes.soak}</p>
// //                                         <div className="sublabel">Current</div>
// //                                     </div>
// //                                 </div>
// //                             </div>

// //                             <div className="attributeContainer wounds">
// //                                 <div className="label">Wounds</div>
// //                                 <div className="values">
// //                                     <div className='threshold'>
// //                                         <p className='value'>{this.props.character.attributes.woundThreshold}</p>
// //                                         <div className="sublabel">Threshold</div>
// //                                     </div>
// //                                     <div className='current'>
// //                                         <p className='value'>{this.props.character.attributes.wounds}</p>
// //                                         <div className="sublabel">Current</div>
// //                                     </div>
// //                                 </div>

// //                             </div>

// //                             <div className="attributeContainer strain">
// //                                 <div className="label">Strain</div>
// //                                 <div className="values">
// //                                     <div className='threshold'>
// //                                         <p className='value'>{this.props.character.attributes.strainThreshold}</p>
// //                                         <div className="sublabel">Threshold</div>
// //                                     </div>
// //                                     <div className='current'>
// //                                         <p className='value'>{this.props.character.attributes.strain}</p>
// //                                         <div className="sublabel">Current</div>
// //                                     </div>
// //                                 </div>
// //                             </div>

// //                             <div className="attributeContainer defense">
// //                                 <div className="label">Defense</div>
// //                                 <div className="values">
// //                                     <div className='threshold'>
// //                                         <p className='value'>{this.props.character.attributes.rangedDefense}</p>
// //                                         <div className="sublabel">Ranged</div>
// //                                     </div>
// //                                     <div className='current'>
// //                                         <p className='value'>{this.props.character.attributes.meleeDefense}</p>
// //                                         <div className="sublabel">Melee</div>
// //                                     </div>
// //                                 </div>
// //                             </div>

// //                             <div className="attributeContainer forceRating">
// //                                 <div className="label">Force Rating</div>
// //                                 <div className="values">
// //                                     <div className='current'>
// //                                         <p className='value'>{this.props.character.attributes.forceRating}</p>
// //                                         <div className="sublabel">Current</div>
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                         </div>