import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../db/application/db';
import MessageSnippet from './MessageSnippet';

export default function Message(props) {

    const context = useContext(UserContext);
    let expanded = false;
    let read = props.message.read;

    function expandMessage(id) {
        let messageElement = document.getElementById(id);
        
        if(expanded) {
            // If the message is expanded, collapse it
            expanded = false;
            messageElement.classList.remove('expanded');
        } else {
            // If the message is collapsed, expand it
            expanded = true;
            messageElement.classList.add('expanded');

            // If the message isn't read, mark it as read on first open
            if(!read) {
                updateDoc(doc(db, 'messages', props.message.id), {read: true}).then(() => {
                    messageElement.classList.add('read');
                    messageElement.classList.remove('unread');
                }).catch((error) => console.log(error))
            }
        }
    }

    return (
        <div className={`message ${read ? 'read' : 'unread'}`} onClick={() => expandMessage(props.message.id)} id={props.message.id} >
            <MessageSnippet message={props.message} />
            <div className='messageBody' id={`${props.message.id}Body`}>
                <p className='messageBodyText'>{props.message.body}</p>
                <p className='messageLink' onClick={(() => props.appView(props.message.link.view, {...props.message.link.options, requestor: context.user.uid}))}>Click Here</p>
            </div>
        </div>
    )
}