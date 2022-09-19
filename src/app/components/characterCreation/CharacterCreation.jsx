// ========== PARENT CONTAINER FOR ALL CHARACTER CREATION VIEWS ========== //

import { useState } from 'react';
import PageNav from "../navigation/PageNav";
import Background from "./Background";
import GameMechanics from "./GameMechanics";
import Species from "./Species";
import CareerAndSpecialization from "./CareerAndSpecialization";
import Overview from "./Overview";
import InvestXP from "./InvestXP";
import Motivation from "./Motivation";
import Gear from "./Gear";
import Appearance from "./Appearance";
import FinalReview from "./FinalReview";
import getNextView from '../../helpers/characterCreation/getNextView';

export default function CharacterCreation(props) {

    const [view, setView] = useState(<Background getNextView={getNextView} characterCreationView={characterCreationView}/>);
    const [link, setLink] = useState('background');

    function characterCreationView(link, options = null) {
        setView(views[link]);
        setLink(link);
    }

    const views = {
        background: <Background getNextView={getNextView} characterCreationView={characterCreationView} />,
        gameMechanics: <GameMechanics getNextView={getNextView} characterCreationView={characterCreationView} />,
        species: <Species getNextView={getNextView} characterCreationView={characterCreationView}/>,
        career: <CareerAndSpecialization getNextView={getNextView} characterCreationView={characterCreationView}/>,
        overview: <Overview getNextView={getNextView} characterCreationView={characterCreationView}/>,
        investXp: <InvestXP getNextView={getNextView} characterCreationView={characterCreationView}/>,
        motivation: <Motivation getNextView={getNextView} characterCreationView={characterCreationView}/>,
        gear: <Gear getNextView={getNextView} characterCreationView={characterCreationView}/>,
        appearance: <Appearance getNextView={getNextView} characterCreationView={characterCreationView}/>,
        finalReview: <FinalReview getNextView={getNextView} characterCreationView={characterCreationView}/>
    }

    const viewsKeys = Object.keys(views);

    function getNextView(currentLink) {
        return {priorView: viewsKeys[viewsKeys.indexOf(currentLink) - 1], nextView: viewsKeys[viewsKeys.indexOf(currentLink) + 1]}
    }

    return (
        <div className='Campaigns'>

            <h1>New Character</h1>
            <PageNav page="CharcaterCreation" links={Object.keys(views)} handler={characterCreationView} activeLink={link}/>
            { view }

        </div>
    )
}