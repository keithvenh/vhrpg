import { useState, useEffect } from 'react';
import {collection, getDocs } from 'firebase/firestore';
import { db } from '../../../db/application/db';
import NewCampaign from './NewCampaign';
import Loading from '../loading/Loading';

export default function Campaigns(props) {

    const [filterView, setFilterView] = useState();
    const [campaigns, setCampaigns] = useState();
    const [initializing, setInitializing] = useState(true);

    async function fetchCampaigns(filter) {


        let qSnap = await getDocs(collection(db, 'campaigns'));
        let campaigns = qSnap.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id
            }
        })
        setCampaigns(campaigns);
        setFilterView(campaigns.map((c) => {<p>{c.title}</p>}))
        if (initializing) setInitializing(false);
    }
    
    useEffect(() => {
        fetchCampaigns();
    },[])

    if(initializing) {
        return (<Loading />)
    }
        
    return (
        <div className='Campaigns'>

            <div className='campaignsFilter'>
                <p className='allFilter true'>All</p>
                <p className='myFilter'>My Campaigns</p>
            </div>

            <h1 className='newCampaign' onClick={() => setFilterView(<NewCampaign user={props.user}/>)} ><i className='fas fa-plus'></i> New</h1>
            
            {filterView}

        </div>
    )
}