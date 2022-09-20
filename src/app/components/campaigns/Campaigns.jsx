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

    function campaignsView(link, campaign = null) {

        const views = {
            myCampaigns: <MyCampaigns />,
            browseCampaigns: <CampaignFilter campaignsView={campaignsView}/>,
            newCampaign: <NewCampaign campaignsView={campaignsView} />,
            show: <Campaign campaignsView={campaignsView} campaign={campaign} appView={props.appView} />,
            edit: <EditCampaign campaign={campaign} campaignsView={campaignsView} />
        }

        setView(views[link]);
        setLink(link);
    }

    useEffect(() => {
        campaignsView(props.options.subview, props.options.campaign)
    }, [])

    return (
        <div className='Campaigns'>

            <h1>Campaigns</h1>
            <PageNav page="Campaigns" links={["myCampaigns", "browseCampaigns", 'newCampaign']} handler={campaignsView} activeLink={link}/>
            { view }

        </div>
    )
}