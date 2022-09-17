// ========== PARENT CONTAINER FOR ALL CAMPAIGN VIEWS ========== //

import { useState } from 'react';
import PageNav from "../navigation/PageNav";
import NewCampaign from "./NewCampaign";
import EditCampaign from './EditCampaign';
import MyCampaigns from "./MyCampaigns";
import CampaignFilter from "./CampaignFilter";
import Campaign from './Campaign';

export default function Campaigns(props) {

    const [view, setView] = useState();
    const [link, setLink] = useState();

    function campaignsView(link, options = null) {

        if(link === 'show') {
            setView(<Campaign id={options} />);
            setLink('show');
        } else {
            setView(views[link]);
            setLink(link);
        }
    }

    const views = {
        new: <NewCampaign campaignsView={campaignsView} />,
        edit: <EditCampaign />,
        myCampaigns: <MyCampaigns />,
        filter: <CampaignFilter />
    }

    return (
        <div className='Campaigns'>

            <h1>Campaigns</h1>
            <PageNav page="Campaigns" links={Object.keys(views)} handler={campaignsView} activeLink={link}/>
            { view }

        </div>
    )
}