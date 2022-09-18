import { useEffect } from 'react';
import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../db/application/db';
import Loading from '../loading/Loading';

export default function Campaign(props) {

    console.log(props);
    const context = useContext(UserContext);
    const [initializing, setInitializing] =  useState(true);
    const [campaign, setCampaign] = useState(null);
//    const startDate = new Date(campaign.startDate).toLocaleString('en-US', { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' })

    async function getCampaign(id) {
        const c = await getDoc(doc(db, 'campaigns', id));
        setCampaign(c.data());
    }

    useEffect(() => {
        getCampaign(props.campaign.id);
    }, [])

    if(!campaign) {
        return (
            <Loading />
        )
    }

    return(
        <div className='Campaign'>
            <div className='campaignHeader'>
                <h2 className='title campaignTitle'>{campaign.title}</h2>
                <p className='subtitle campaignSubtitle'>{campaign.title}</p>
                <div className='campaignStatus'>
                    <p className={`${campaign.isOpen} campaignOpen`}>
                        <i className={`indicator fas fa-${campaign.isOpen ? 'circle-dot' : 'circle'}`}></i>
                        {campaign.isOpen ? ' Open' : ' Closed'}
                    </p>
                    <p className={`${!campaign.isPrivate} campaignOpen`}>
                        <i className={`indicator fas fa-${campaign.isPrivate ? 'lock' : 'lock-open'}`}></i>
                        {campaign.isPrivate ? ' Private' : ' Public'}
                    </p>
                </div>
                <p className='campaignPlayerCount'>
                    Players: {campaign.players.length} of {campaign.maxPlayers}
                </p>
                <p className='campaignStartDate'>
                    Start Date: {campaign.startDate}
                </p>
                {campaign.endDate ? <p className='campaignEndDate'>End Date: {campaign.endDate} </p> : ''}
            </div>

            <hr className='campaignDivider' />

            <div className='campaignDetails'>
                <section className='campaignLinks'>
                    <p className='sectionHeader'>Campaign Links</p>
                    {campaign.creator.uid === context.user.uid 
                        ? <p className='campaignLinkItem' onClick={() => {props.campaignsView('edit', campaign)}}>Edit Campaign</p>
                        : ''
                    }
                </section>

                <section className='campaignOverview'>
                    <p className='sectionHeader'>Overview</p>
                    <div className='campaignGameMaster'>
                        <p className='gameMasterHeading overviewDetailHeading'>Game Master</p>
                        <p className='overviewDetail' >{campaign.gameMaster ? campaign.gameMaster.username : 'Needed'}</p>
                    </div>
                    <div className='campaignPlayers'>
                        <p className='playersHeading overviewDetailHeading'>Players</p>
                        {campaign.players.map((player, index) => <p key={index} className='player overviewDetail'>{player.username}</p>)}
                    </div>
                    <div className='campaignMechanics'>
                        <p className='mechanicsHeading overviewDetailHeading'>Game Mechanics</p>
                        {campaign.gameMechanics.map((mechanic) =>
                            <p key={mechanic} className='campaignMechanic overviewDetail'>{mechanic}</p>
                        )}
                    </div>
                </section>

                <section className='campaignInformationContainer'>
                    <p className='sectionHeader'>Information</p>
                    <div className='campaignInformation'>
                        <p className='campaignInformationHeading, overviewInformationHeading'>Meeting Details</p>
                        <p className='campaignMeetingDetails informationDetail'>{campaign.meetingDetails}</p>
                    </div>
                    <div className='campaignInformation'>
                        <p className='campaignInformationHeading overviewInformationHeading'>PC Creation Rules</p>
                        <p className='campaignCharacterCreationRules informationDetail'>{campaign.characterCreationRules}</p>
                    </div>
                    <div className='campaignInformation'>
                        <p className='campaignInformationHeading overviewInformationHeading'></p>
                        <p className='campaignOtherNotes informationDetail'>{campaign.otherNotes}</p>
                    </div>
                </section>
            </div>

            <hr className='campaignDivider' />

            <div className='campaignFooter'>
                <p className='campaignCreator'>Created By {campaign.creator.username}</p>
            </div>
        </div>
    )
}