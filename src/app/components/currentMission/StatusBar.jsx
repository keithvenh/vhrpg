import React from 'react'

export default class StatusBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            threshold: null,
            damage: null
        }
    }

    const wt = 16;
    const currentWounds = 3;
    
    const health = Array.from(Array(wt - currentWounds).keys());
    const wounds = Array.from(Array(currentWounds).keys());
  
  render() {
    return (
        <div className='status-bar-container'>
            WT
            {health.map(i => <div className='wt' />)}
            {wounds.map(i => <div className='wt' style={{'background-color': 'white'}} />)}
        </div>
    )
  }
}
