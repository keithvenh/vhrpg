// ========== PARENT CONTAINER FOR ALL CAMPAIGN VIEWS ========== //

import { useState } from 'react';
import PageNav from "../navigation/PageNav";
import NewCampaign from "./NewCampaign";
import MyCampaigns from "./MyCampaigns";
import CampaignFilter from "./CampaignFilter";
import Campaign from './Campaign';
import EditCampaign from './EditCampaign';

export default function Campaigns(props) {

    const [view, setView] = useState();
    const [link, setLink] = useState();

    function campaignsView(link, campaign = null) {

        if(link === 'show') {
            console.log('in show')
            setView(<Campaign campaignsView={campaignsView} campaign={campaign} />);
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

    return (
        <div className='Campaigns'>

            <h1>Campaigns</h1>
            <PageNav page="Campaigns" links={Object.keys(views)} handler={campaignsView} activeLink={link}/>
            { view }

        </div>
    )
}