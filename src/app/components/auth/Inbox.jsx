import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import { query, where, limit, getDocs } from 'firebase/firestore'
import { messages } from '../../../db/application/db';
import Loading from '../loading/Loading';
import Message from './Message'

export default function Inbox(props) {

    const context = useContext(UserContext);
    const [userMessages, setUserMessages] = useState([]);

    async function getMessages() {
         // make sure campaign array isn't empty for query

         // match up to 2 campaigns with the campaigns in the users profile
         const q = query(messages, where('receiver.uid', '==', context.user.uid), limit(20));
         let qSnap = await getDocs(q);
 
         let userMessages = qSnap.docs.map((doc) => {
             return {
                 ...doc.data(),
                 id: doc.id
             }
         })
 
         setUserMessages(userMessages);
    }

    useEffect(() => {
        getMessages();
    }, [])

    if(messages == []) {
        return (
            <Loading />
        )
    }

    return (
        <div className='Inbox'>
            {userMessages.map((m) => <Message key={m.id} message={m} appView={props.appView} />)}
        </div>
    )
}