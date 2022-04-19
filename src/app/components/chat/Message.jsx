import React from 'react';
import { auth, db } from '../../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import replaceDice from '../../helpers/chat/replaceDice';

class Message extends React.Component {
    constructor(props) {
        
        super(props);

        this.state = {
            messageSender: '',
            messageText: props.data.text,
            currentUser: auth.currentUser.uid == props.data.userId
        }

        this.getSender = this.getSender.bind(this);
    }

    async getSender(id) {

        const sender = await getDoc(doc(db, 'users', id));
    
        this.setState({messageSender: sender.data()});
    }
    
    componentDidMount() {
        this.getSender(this.props.data.userId);
    }

    render() {

        return (
    
            <div className={`message ${this.state.currentUser}`}>
    
                <p className='message-text' dangerouslySetInnerHTML={{ __html: replaceDice(this.state.messageText) }}></p>
    
            </div>
    
        )
    }
}

export default Message;