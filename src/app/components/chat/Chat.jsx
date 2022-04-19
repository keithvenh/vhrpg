import React from 'react';
import { getDocs, collection, doc, onSnapshot, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../../config/firebase';
import Message from './Message';
import replaceDice from '../../helpers/chat/replaceDice';

class Chat extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        messages: [],
        messageInput: '',
        expanded: false
      }
      this.toggleChat = this.toggleChat.bind(this);
      this.getMessages = this.getMessages.bind(this);
      this.validateMessage = this.validateMessage.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    async getMessages(db) {

      const q = query(collection(db, 'channels/chat/messages'), orderBy('createdAt', 'desc'), limit(50));
    
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

    validateMessage(e) {

      this.setState({messageInput: e.target.value})
    }

    async submitMessage(message) {
      console.log(auth.currentUser.uid);
      const newMessage = await addDoc(collection(db, "channels/chat/messages"), {
        userId: auth.currentUser.uid,
        text: message.trim(),
        createdAt: serverTimestamp()
      });
      return newMessage;
    }

    handleSubmit(e) {
      if(e.key == 'Enter' && this.state.messageInput != '') {
        this.submitMessage(this.state.messageInput);
        this.setState({messageInput: ''})
      }
    }

    componentDidMount() {
      this.getMessages(db);
      document.getElementById('messagesEnd').scrollIntoView({behavior: 'smooth'});
    }

    componentDidUpdate() {
      document.getElementById('messagesEnd').scrollIntoView({behavior: 'smooth'});
    }

    render() {

      return (
        <div className={`userChat ${this.state.expanded ? 'expanded' : 'collapsed'} ${this.props.currentView == 'loading' ? 'hidden' : ''}`} id='userChat'>
            <i className='toggle' onClick={() => this.toggleChat()}>{this.state.expanded ? String.fromCharCode(9660) : String.fromCharCode(9700)}</i>
            <div className='messages-container' id='messages-container'>
              <div className='messages' id='messages'>
                <div className='messagesEnd' id='messagesEnd'></div>
                {this.state.messages.map(message => (<Message key={message.id} data={message} />))}
                <div className='messagesStart' id='messagesStart'></div>
              </div>
            </div>
            <div className='userChatInputContainer'>
              <span 
                className='userChatInput' 
                placeholder='Message' 
                value={this.state.messageInput} 
                onChange={(e) => this.validateMessage(e)}
                onKeyPress={(e) => this.handleSubmit(e)} 
                autoFocus ></span>

            </div>
        </div>
      );
  
    }
  }
  
  export default Chat;