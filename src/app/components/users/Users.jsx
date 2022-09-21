// ========== PARENT CONTAINER FOR ALL CAMPAIGN VIEWS ========== //

import { useEffect } from 'react';
import { useState } from 'react';
import PageNav from "../navigation/PageNav";
import User from './User';
import FindFriend from './FindFriend';

export default function Users(props) {

    const [view, setView] = useState();
    const [link, setLink] = useState();

    function userView(link, user = null) {

        const views = {
            show: <User userView={userView} user={user} />,
            findFriend: <FindFriend userView={userView} />
        }

        setView(views[link]);
        setLink(link);
    }


    useEffect(() => {
        userView(props.options.subview, props.options.user)
    }, [])

    return (
        <div className='Users'>

            { view }

        </div>
    )
}