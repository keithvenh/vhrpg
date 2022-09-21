import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../db/application/db';
import { useState, useEffect, useContext} from 'react';
import { UserContext } from '../../contexts/userContext';
import Loading from '../loading/Loading';
import UserProfile from './UserProfile';

export default function User(props) {

    const context = useContext(UserContext);
    const [profile, setProfile] = useState();

    async function getUserProfile(uid) {
        const p = (await getDoc(doc(db, 'users', uid))).data();
        setProfile(p);
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

        <UserProfile profile={profile} />

    )
}