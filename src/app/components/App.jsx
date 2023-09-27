import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';

import Loading from './loading/Loading';
import Login from './auth/Login';
import Navigation from './navigation/Navigation';

// IMPORT ROUTE COMPONENTS
import MissionControl from './missionControl/MissionControl';
import Characters from './characters/Characters';
import Campaigns from './campaigns/Campaigns';
import Users from './users/Users';
import NotFound from './NotFound';

export default function App() {

  // Get user from context
  const { user, initializing } = useContext(UserContext);

  // Run the Loading Screen while Initializing the App
  if (initializing) {
    return (
      <div className='app'>
        <Loading />
      </div>
    );
  }

  return (
    <Router>
      <div className='app'>
        {/* If no user, show login screen */}
        {!user
          ? <Login />
          : (
            <>
              <header className='headerNav'>
                <Navigation />
              </header>

              <main className='viewScreen'>
                <Routes>
                  <Route path="/" element={<MissionControl />} />
                  <Route path="/characters/*" element={<Characters />} />
                  <Route path="/campaigns/*" element={<Campaigns />}/>
                  <Route path="/users/*" element={<Users />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              <section className='chatContainer'>


              </section>
            </>
          )}
      </div>

    </Router>
  );

}