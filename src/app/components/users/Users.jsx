// ========== PARENT CONTAINER FOR ALL CAMPAIGN VIEWS ========== //

import { useEffect } from 'react';
import { useState } from 'react';
import PageNav from "../navigation/PageNav";
import User from './User';

export default function Users(props) {

    const [view, setView] = useState();
    const [link, setLink] = useState();

    function usersView(link, user = null) {

        if(link === 'show') {
            setView(<User usersView={usersView} user={user} />);
            setLink('show');
        } else {
            setView(views[link]);
            setLink(link);
        }
    }

    const views = {

    }

    useEffect(() => {
        usersView('show', props.options.user)
    }, [])

    return (
        <div className='Campaigns'>

            <h1>Users</h1>

            { view }

        </div>
    )
}