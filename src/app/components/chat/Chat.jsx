import React from 'react';
import { getDocs, collection, doc, onSnapshot, query, orderBy, limit, setDocs } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import Message from './Message';

class Chat extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        messages: []
      }
      this.toggleChat = this.toggleChat.bind(this);
      this.getMessages = this.getMessages.bind(this);
    }

    async getMessages(db) {

      const q = query(collection(db, 'channels/chat/messages'), orderBy('createdAt'), limit(10));
    
      const unsub = onSnapshot(q,(querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const data = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
          }));
    
          this.setState({messages: data});
        });
      } )
      return unsub;
    
    }

    toggleChat() {

        this.setState({expanded: !this.state.expanded})

    }

    componentDidMount() {
      this.getMessages(db);
    }

    render() {

      return (
        <div className={`userChat ${this.state.expanded ? 'expanded' : 'collapsed'} ${this.props.currentView == 'loading' ? 'hidden' : ''}`} id='userChat'>
            <i className='toggle' onClick={() => this.toggleChat()}>{this.state.expanded ? String.fromCharCode(9660) : String.fromCharCode(9650)}</i>
            <div className='messages-container'>
              {this.state.messages.map(message => (<Message key={message.id} data={message} />))}
            </div>
            <input className='userChatInput' placeholder='Message' autoFocus />
        </div>
      );
  
    }
  }
  
  export default Chat;