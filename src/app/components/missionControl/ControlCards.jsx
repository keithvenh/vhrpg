import { useContext, useState } from 'react'
import { UserContext } from '../../contexts/userContext';
import { query, getDocs, where, limit } from 'firebase/firestore';
import { campaigns } from '../../../db/application/db';
import { useEffect } from 'react';
import MiniCard from './MiniCard';

export function CampaignControlCard(props) {

    const context = useContext(UserContext);
    const [userCampaigns, setUserCampaigns] = useState([]);

    async function fetchCampaigns() {

        // make sure campaign array isn't empty for query
        let userCampaignArray = [...context.profile.campaigns.joined, ...context.profile.campaigns.invited, '']
        // match up to 2 campaigns with the campaigns in the users profile
        const q = query(campaigns, where('id', 'in', userCampaignArray), limit(2));
        let qSnap = await getDocs(q);

        let userCampaigns = qSnap.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id
            }
        })

        setUserCampaigns(userCampaigns);
    }

    useEffect(() => {
        fetchCampaigns();
    },  [])

    // If no user campaigns, return a new and find mini card
    if(userCampaigns.length < 1) {
        return (
            <div className='missionControlCard missionControlCardRect CampaignControlCard'>
                <div className='header' onClick={(() => props.appView('campaigns'))}>
                    <h2 className='title'>Campaigns</h2>
                </div>
                <div className='miniCards'>
                    <MiniCard type='new' view='campaigns' label='Create a Campaign' subview='newCampaign' appView={props.appView}/>
                    <MiniCard type='find' view='campaigns' label='Find a Campaign' subview='browseCampaigns' appView={props.appView}/>
                </div>
            </div>
        )
    }

    // If at least one user campaign, show the title as a card link
    return(
        <div className='missionControlCard missionControlCardRect CampaignControlCard' >
            <div className='header' onClick={(() => props.appView('campaigns'))} >
                <h2 className='title'>Campaigns</h2>
                <h2 className='subtitle'>Campaigns</h2>
            </div>
            <div className='miniCards'>
                {userCampaigns.map((c) => (
                    <MiniCard key={c.id} type='show' view='campaigns' label={c.title} subview='show' appView={props.appView} options={{campaign: c}}/>
                ))}
                {/* if only one user campaign show a second card linking to find a campaign to join */}
                {userCampaigns.length < 2 ? <MiniCard type='find' view='campaigns' label='Find a Campaign' subview='browseCampaigns' appView={props.appView}/> : ''}
            </div>
        </div>
    )
}