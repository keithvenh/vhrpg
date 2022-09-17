import { useEffect } from 'react';
import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../db/application/db';
import Loading from '../loading/Loading';

export default function Campaign(props) {

    const context = useContext(UserContext);
    const [initializing, setInitializing] =  useState(true);
    const [campaign, setCampaign] = useState(null);
    console.log(props.id);

    async function getCampaign(id) {
        const c = await getDoc(doc(db, 'campaigns', id));
        setCampaign(c.data());
    }

    useEffect(() => {
        getCampaign(props.id);
    }, [])

    if(!campaign) {
        return (
            <Loading />
        )
    }

    return(
        <h2>{campaign.title}</h2>
    )
}