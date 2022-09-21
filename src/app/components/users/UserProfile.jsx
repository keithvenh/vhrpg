import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/userContext';
import { doc, updateDoc, setDoc, collection, arrayUnion, serverTimestamp, arrayRemove } from 'firebase/firestore';
import { db, messages } from '../../../db/application/db';

export default function UserProfile(props) {

    const context = useContext(UserContext);

    let [friendOfUser, setFriendOfUser] = useState(context.profile.friends.confirmed.includes(props.profile.public.uid));
    let [requestSent, setRequestSent] = useState(context.profile.friends.pending.includes(props.profile.public.uid));
    let [requestReceived, setRequestReceived] = useState(props.profile.friends.pending.includes(context.user.uid));

    async function requestFriend() {

        // If a friend request has been received, accept the request.
        if(requestReceived) {
            // Add Friend to current User
            updateDoc(doc(db, 'users', context.user.uid), {
                friends: {
                    ...context.profile.friends,
                    confirmed: arrayUnion(props.profile.public.uid)
                }
            })
            // Add current user to confirmed friends and remove from pending
            updateDoc(doc(db, 'users', props.profile.public.uid),  {
                friends: {
                    ...props.profile.friends,
                    confirmed: arrayUnion(context.user.uid),
                    pending: arrayRemove(context.user.uid)
                }
            })
            // Send a message to the Original Requestor
            const newMessageRef = doc(messages);
            setDoc(newMessageRef, {                        
                sender: {username: "5Y5-T3M Droid", role: "Messenger Droid", uid: "systemmessenger"},
                subject: `${context.profile.public.username} has accepted your friend request`,
                receiver: props.profile.public,
                body: `You are now friends with ${context.profile.public.username}! View their profile at the link below.`,
                link: {view: 'users', options: {subview: 'show', user: context.profile.public }},
                read: false,
                id: newMessageRef.id,
                timestamp: serverTimestamp()
            })
            // set friends to true
            setFriendOfUser(true);
        }
        // if not already a friend or if the request is not already pending, send a friend request
        if(!friendOfUser && !requestSent && ! requestReceived) {
            // Add Found Friend to Current Users Pending Friend List
            updateDoc(doc(db, 'users', context.user.uid), {
                friends: {
                    ...context.profile.friends, 
                    pending: arrayUnion(props.profile.public.uid)
            }})
            // Send a message that a friend request has been made
            const newMessageRef = doc(messages);
            setDoc(newMessageRef, {                        
                sender: {username: "5Y5-T3M Droid", role: "Messenger Droid", uid: "systemmessenger"},
                subject: `New Friend Request from ${context.profile.public.username}`,
                receiver: props.profile.public,
                body: `You have received a friend request from ${context.profile.public.username}. To accept this request, follow the link below.`,
                link: {view: 'users', options: {subview: 'show', user: context.profile.public }},
                read: false,
                id: newMessageRef.id,
                timestamp: serverTimestamp()
            })
            // Set request pending to true
            setRequestSent(true);
        }        
    }

    return (

        <div className='User'>
            
            <div className='profileDetail'>
                <div className='icon'><p><i className='fas fa-at'></i></p></div>
                <div className='value'>
                    <p className='username'>{props.profile.public.username}</p>
                    <p className='username sw'>{props.profile.public.username}</p>
                </div>
            </div>

            <div className='profileDetail'>
                <div className='icon'><p><i className='fa-brands fa-galactic-senate'></i></p></div>
                <div className='value'>
                    <p className='name'>{props.profile.public.role}</p>
                    <p className='name sw'>{props.profile.public.role}</p>
                </div>
            </div>

            <p className={`friendButton ${(friendOfUser || requestSent)}`} onClick={requestFriend} >
                <i className={`fas fa-${friendOfUser ? 'circle-check' : requestSent ? 'circle-pause': 'circle-plus'}`} ></i>
                {friendOfUser ? ' Friends' : requestSent ? ' Pending' : requestReceived ? ' Accept Request' : ' Add Friend'}
            </p>

        </div>

    )
}