// ========== PARENT CONTAINER FOR ALL CAMPAIGN VIEWS ========== //

import { useEffect } from 'react';
import { useState } from 'react';
import PageNav from "../navigation/PageNav";
import User from './User';

export default function Users(props) {

    const [view, setView] = useState();
    const [link, setLink] = useState();

    function userView(link, user = null) {

        const views = {
            show: <User userView={userView} user={user} />
        }

        setView(views[link]);
        setLink(link);
    }


    useEffect(() => {
        userView(props.options.subview, props.options.user)
    }, [])

    return (
        <div className='Campaigns'>

            <h1>Users</h1>

            { view }

        </div>
    )
}