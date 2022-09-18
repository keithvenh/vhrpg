import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import {collection, getDocs } from 'firebase/firestore';
import { db } from '../../../db/application/db';
import Loading from '../loading/Loading';
import CampaignLink from './CampaignLink';

export default function CampaignFilter(props) {
// ===== Use UserContext for filters ===== //
    const context = useContext(UserContext);
    const [campaigns, setCampaigns] = useState(null);
    const [filter, setFilter] = useState()
    const [initializing, setInitializing] = useState(true);

    async function fetchCampaigns() {

        let qSnap = await getDocs(collection(db, 'campaigns'));
        let campaigns = qSnap.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id
            }
        })
        
        filterCampaigns(campaigns);
        if (initializing) setInitializing(false);
    }
    
    function filterCampaigns(campaigns, filter) {
        setCampaigns(campaigns);
    }

    useEffect(() => {
        fetchCampaigns();
    },[])

    if(!campaigns) {
        return (<Loading />)
    }

    return (
        <div className='CampaignFilter'>

            {campaigns.map((c) => <CampaignLink key={c.id} campaign={c} clickHandler={() => props.campaignsView('show', c)}/>)}

        </div>
    );
}