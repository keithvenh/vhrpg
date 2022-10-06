
export default function CampaignLink(props) {
    const campaign = props.campaign;

    return (
        <div className='CampaignLink' onClick={props.clickHandler}>
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
                    Players: {campaign.players.joined.length} of {campaign.maxPlayers}
                </p>
            </div>
        </div>
    )
}