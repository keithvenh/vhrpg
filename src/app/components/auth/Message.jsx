import { useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../db/application/db';
import MessageSnippet from './MessageSnippet';
import Loading from '../loading/Loading';

export default function Message(props) {

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
            <p className='messageBody' id={`${props.message.id}Body`}>{props.message.body}</p>
            <p className='messageLink'>{props.message.link}</p>
        </div>
    )
}