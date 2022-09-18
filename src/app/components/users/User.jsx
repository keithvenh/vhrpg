import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../db/application/db';
import { useState, useEffect, useContext} from 'react';
import { UserContext } from '../../contexts/userContext';
import Loading from '../loading/Loading';

export default function User(props) {

    const context = useContext(UserContext);
    const [profile, setProfile] = useState();

    async function getUserProfile(uid) {
        const profile = (await getDoc(doc(db, 'users', uid))).data();
        setProfile(profile);
    }

    useEffect(() => {
        getUserProfile(props.user.uid);
    }, [])

    if(!profile) {
        return (
            <Loading />
        )
    }

    return (

        <div className='User'>
            
            <div className='profileDetail'>
                <div className='icon'><p><i className='fas fa-at'></i></p></div>
                <div className='value'>
                    <p className='username'>{profile.public.username}</p>
                    <p className='username sw'>{profile.public.username}</p>
                </div>
            </div>

            <div className='profileDetail'>
                <div className='icon'><p><i className='fa-brands fa-galactic-senate'></i></p></div>
                <div className='value'>
                    <p className='name'>{profile.public.role}</p>
                    <p className='name sw'>{profile.public.role}</p>
                </div>
            </div>

        </div>

    )
}