// ========== PARENT CONTAINER FOR ALL CAMPAIGN VIEWS ========== //

import { useState } from 'react';
import PageNav from "../navigation/PageNav";
import NewCampaign from "./NewCampaign";
import MyCampaigns from "./MyCampaigns";
import CampaignFilter from "./CampaignFilter";
import Campaign from './Campaign';
import EditCampaign from './EditCampaign';
import { useEffect } from 'react';

export default function Campaigns(props) {

    const [view, setView] = useState();
    const [link, setLink] = useState();

    function campaignView(link, campaign = null) {

        const views = {
            myCampaigns: <MyCampaigns appView={props.appView} campaignView={campaignView} />,
            browseCampaigns: <CampaignFilter campaignView={campaignView}/>,
            newCampaign: <NewCampaign campaignView={campaignView} />,
            show: <Campaign campaignView={campaignView} campaign={campaign} appView={props.appView} />,
            edit: <EditCampaign campaign={campaign} campaignView={campaignView} />
        }

        if(link === '') {
            campaignView('myCampaigns');
        } else {
            setView(views[link]);
            setLink(link);
        }
    }

    useEffect(() => {
        campaignView(props.options.subview, props.options.campaign)
    }, [])

    return (
        <div className='Campaigns'>

            <div className='viewHeader'>
                <h1 className='viewTitle title'>Campaigns</h1>
                <h2 className='viewSubtitle subtitle'>Campaigns</h2>
            </div>
            <PageNav page="Campaigns" links={["myCampaigns", "browseCampaigns", 'newCampaign']} handler={campaignView} activeLink={link}/>
            { view }

        </div>
    )
}