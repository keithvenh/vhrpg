import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/userContext';
import { getAuth } from 'firebase/auth';
import Navigation from './navigation/Navigation';
import Auth from './auth/Auth';
import MissionControl from './missionControl/MissionControl';
import Loading from './loading/Loading';
import Campaigns from './campaigns/Campaigns';
import Users from './users/Users';
import Characters from './characters/Characters';
import getProfile from '../helpers/users/getProfile';
import CharacterCreation from './characterCreation/CharacterCreation';

export default function App() {
  const context = useContext(UserContext);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();
  const [view, setView] = useState(<MissionControl appView={appView}/>);
  const [link, setLink] = useState('missionControl');
  const auth = getAuth();

  // Handle user state changes
  async function onAuthStateChanged(user) {
    setUser(user);
    await updateProfile(user);
    if (initializing) setInitializing(false);
    if(!user) {
      appView('auth')
    }
  }

  async function updateProfile(user) {
    if(user) {
      const profile = await getProfile(user);
      setProfile(profile.data());
    }
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function appView(link, options = {subview: ''}) {

    const views = {
      auth: <Auth appView={appView} />,
      loading: <Loading />,
      missionControl: <MissionControl appView={appView}/>,
      campaigns: <Campaigns appView={appView} options={options}/>,
      users: <Users options={options} />
    }

    if(link === 'users') {
      if(options && options.user.uid === options.requestor.uid) {
          // Return myAccount if current user requestor are the same
          return appView('auth')
        } 
    }

    setView(views[link]);
    setLink(link);
  }


  if (initializing) {
    return (
      <div className='App'>
        <Loading />
      </div>
    );
  }

  return (
    <UserContext.Provider value={{user, setUser, profile, setProfile}}>

      <div className='App'>

        <div className='navigationContainer'>
          <Navigation changeView={appView} appView={appView} link={link}/>
        </div>

        <div className='viewScreen'>
          {view}
        </div>

        <div className='chatContainer'>


        </div>

      </div>

    </UserContext.Provider>
  );

}