import { useEffect, useState, useContext } from "react";
import { getDocs, where, query } from 'firebase/firestore';
import { campaigns } from '../../../db/application/db';
import { UserContext } from '../../contexts/userContext';
import Loading from '../loading/Loading';
import CampaignLink from './CampaignLink';
import MiniCard from '../missionControl/MiniCard';

export default function MyCampaigns(props) {

    const context = useContext(UserContext);
    const [userCampaigns, setUserCampaigns] = useState([]);
    const [initializing, setInitializing] = useState(true);

    async function fetchCampaigns() {

        let userCampaignArray = [...context.profile.campaigns, '']
        const q = query(campaigns, where('id', 'in', userCampaignArray));

        let qSnap = await getDocs(q);

        let userCampaigns = qSnap.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id
            }
        })

        setUserCampaigns(userCampaigns);
        if(initializing) setInitializing(false);
    }

    useEffect(() => {
        fetchCampaigns();
    }, [])

    if(initializing) {
        return(<Loading />)
    } else if (userCampaigns.length < 1) {
        return(
            <div className='MyCampaigns'>
                <div className='campaignsList'>
                    <p className='noCampaignText'>You are not currently involved in any campaigns.</p>
                    <div className='miniCardList'>
                        <MiniCard type='new' view='campaigns' label='Create a Campaign' subview='newCampaign' appView={props.appView}/>
                        <MiniCard type='find' view='campaigns' label='Find a Campaign' subview='browseCampaigns' appView={props.appView}/>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='MyCampaigns'>
            <div className='campaignList'>
                {userCampaigns.map((c) => (
                    <CampaignLink key={c.id} campaign={c} clickHandler={() => props.campaignView('show', c)} />
                ))}
            </div>
        </div>
    )
}