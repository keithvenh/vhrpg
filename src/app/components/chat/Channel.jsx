import  React from 'react';
import { db } from '../../../config/firebase';
import { collection } from 'firebase/firestore';

class Channels extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
    }

    render() {

        return (
            <div className='currentChannel'>

                <p>{this.props.details.name}</p>

            </div>
        )
    }
}

export default Channels;