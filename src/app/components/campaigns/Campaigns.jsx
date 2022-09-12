import { Fragment, useState, useEffect } from 'react';
import {collection, getDocs } from 'firebase/firestore';
import { db } from '../../../db/application/db';
import Loading from '../loading/Loading';

export default function Campaigns(props) {
    const [filterView, setFilterView] = useState();
    const [campaigns, setCampaigns] = useState();
    const [initializing, setInitializing] = useState(true);

    //Change to only get campaigns that are public
    //Add query to get private campaigns that this user has created/joined.
    //Set campaigns to both queries above
    async function fetchCampaigns(filter) {

        let qSnap = await getDocs(collection(db, 'campaigns'));
        let campaigns = qSnap.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id
            }
        })
        console.log(campaigns);

        setCampaigns(campaigns);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        fetchCampaigns();
    },[])

    if(initializing) {
        return (<Loading />)
    }

    function campaignListing(c) {
        return c.map(obj => {

            //const { gameMaster,open,startDate,title } = obj;
            console.log(obj)
            return (
                <Fragment className='grid-row' onClick={() => campaignDetail(obj)}>
                    <div className='grid-master'>{obj.gameMaster}</div>
                    <div className='grid-title'>{obj.title}</div>
                    <div className='grid-open'>{obj.open}</div>
                    <div className='grid-private'>{obj.private}</div>
                    <div className='grid-date'>{obj.startDate}</div>
                </Fragment>
            );
        });
    }

    function campaignDetail(campaign) {
        //Code to show campaign details
    }

    return (
        <div className='Campaigns'>

            <div className='campaignsFilter'>
                <p className='allFilter true'>All</p>
                <p className='myFilter'>My Campaigns</p>
            </div>

            <div className='newCampaign' onClick={()  => props.changeView('newCampaign')}><i className='fas fa-plus'></i> New</div>
            
            <div className='grid-container'>
                <div className='heading'>Game Master</div>
                <div className='heading'>Title</div>
                <div className='heading'>Private?</div>
                <div className='heading'>Open?</div>
                <div className='heading'>Start Date</div>
                {campaignListing(campaigns)}
            </div>

        </div>
    );
}