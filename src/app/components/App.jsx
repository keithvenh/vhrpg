import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';
import { getAuth } from 'firebase/auth';
import Navigation from './navigation/Navigation';
import Auth from './auth/Auth';
import MissionControl from './missionControl/MissionControl';
import Loading from './loading/Loading';
import characterRoutes from './characters/characterRoutes';
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
  // run the function to extract the routes
  const routesForCharacters = characterRoutes();

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

    if(link === 'users' && options.subview === 'show') {
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
      <div className='app'>
        <Loading />
      </div>
    );
  }

  return (
    <UserContext.Provider value={{user, setUser, profile, setProfile}}>
      <Router>
        <div className='app'>
          <header className='headerNav'>
            <Navigation changeView={appView} appView={appView} link={link}/>
          </header>

          <main className='viewScreen'>
            <Routes>
              <Route path="/" element={<MissionControl />} />
              {routesForCharacters}
            </Routes>
          </main>

          <section className='chatContainer'>


          </section>

        </div>

      </Router>

    </UserContext.Provider>
  );

}