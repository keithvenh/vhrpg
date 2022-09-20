import { useContext, useState } from 'react'
import { UserContext } from '../../contexts/userContext';
import { getDocs, where, limit } from 'firebase/firestore';
import { campaigns } from '../../../db/application/db';
import { useEffect } from 'react';

export function CampaignControlCard(props) {

    const context = useContext(UserContext);
    const [userCampaigns, setCampaigns] = useState();

    const newCampaignCard = (
        <div className='miniCard newCard' onClick={() => props.appView('campaigns', {subview: 'newCampaign'})}>
            <p><i className='fas fa-circle-plus'></i></p>
            <p>New Campaign</p>
        </div>
    )

    const findCampaignCard = (
        <div className='miniCard newCard' onClick={() => props.appView('campaigns', {subview: 'browseCampaigns'})}>
            <p><i className='fas fa-spyglass'></i></p>
            <p>Find Campaign</p>
        </div>
    )

    async function fetchCampaigns() {

        let qSnap = await getDocs(campaigns, where("id", 'in', context.profile.campaigns), limit(2));

        let userCampaigns = qSnap.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id
            }
        })

        setCampaigns(userCampaigns);
    }

    useEffect(() => {
        fetchCampaigns();
    },  [])

    if(!userCampaigns) {
        return (
            <div className='missionControlCard missionControlCardRect CampaignControlCard'>
                <div className='header' onClick={(() => props.appView('campaigns'))}>
                    <h2 className='title'>Campaigns</h2>
                </div>
                <div className='miniCards'>
                    {newCampaignCard}
                    {findCampaignCard}
                </div>
            </div>
        )
    }

    return(
        <div className='missionControlCard missionControlCardRect CampaignControlCard' >
            <div className='header' onClick={(() => props.appView('campaigns'))} >
                <h2 className='title'>Campaigns</h2>
                <h2 className='subtitle'>Campaigns</h2>
            </div>
            <div className='miniCards'>
                {userCampaigns.map((c) => (
                    <div key={c.id} className='miniCard' onClick={() => props.appView('campaigns', {subview: 'show', campaign: c})}>
                        <p>{c.title}</p>
                    </div>
                ))}
                {userCampaigns.length < 2 ? newCampaignCard : ''}
            </div>
        </div>
    )
}