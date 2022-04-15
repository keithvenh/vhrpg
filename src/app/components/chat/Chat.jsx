import React from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import Channel from './Channel';

async function getChannels(db) {

    const channels = await getDocs(collection(db, 'channels'));
    const channelsList = channels.docs.map(doc => doc.data());
    return channelsList;
}

class Chat extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          channels: null,
          activeChannel: 'Chat',
          channel: <Channel details={{name: 'Chat'}} />,
          expanded: true
      }
      this.changeChannel = this.changeChannel.bind(this);
    }
  
    changeChannel(channel) {
        this.setState({
            activeChannel: channel.name,
            channel: <Channel details={channel} />
        })
    }

    toggleChat() {

        this.setState({expanded: !this.state.expanded})
    }

    render() {

        if(this.state.channels == null) {

            getChannels(db).then((res) => {this.setState({channels: res})})

        }

        let channels;
        if (this.state.channels != null) {
            channels = this.state.channels.map((channel) => <p className={`channelName ${this.state.activeChannel == channel.name ? 'active' : 'inactive'}`} key={channel.name} onClick={() => this.changeChannel(channel)}>{channel.name}</p>);
        }

      return (
        <div className={`userChat ${this.state.expanded ? 'expanded' : 'collapsed'} ${this.props.currentView == 'loading' ? 'hidden' : ''}`} id='userChat'>
            <i className='toggle' onClick={() => this.toggleChat()}>{this.state.expanded ? String.fromCharCode(8722) : String.fromCharCode(43)}</i>
            <div className='channelLinks'>
                {channels}
            </div>
            {this.state.channel}
            <input className='userChatInput' placeholder={`Message ${this.state.activeChannel}`} autoFocus />
        </div>
      );
  
    }
  }
  
  export default Chat;