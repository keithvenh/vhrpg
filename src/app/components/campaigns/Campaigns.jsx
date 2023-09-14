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
    console.log(props);
    function campaignsView(link, campaign = null) {

        if(link === 'show') {
            setView(<Campaign campaignsView={campaignsView} campaign={campaign} appView={props.appView} />);
            setLink('show');
        } else if(link === 'edit') {
            setView(<EditCampaign campaign={campaign} campaignsView={campaignsView}/>)
            setLink('edit');
        } else {
            setView(views[link]);
            setLink(link);
        }
    }

    const views = {
        myCampaigns: <MyCampaigns />,
        browseCampaigns: <CampaignFilter campaignsView={campaignsView}/>,
        newCampaign: <NewCampaign campaignsView={campaignsView} />
    }

    useEffect(() => {
        campaignsView(props.options.link, props.options.campaign)
    }, [])

    return (
        <div className='Campaigns'>

            <h1>Campaigns</h1>
            <PageNav page="Campaigns" links={Object.keys(views)} handler={campaignsView} activeLink={link}/>
            { view }

        </div>
    )
}