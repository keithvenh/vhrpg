import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';
import { getAuth } from 'firebase/auth';

import Login from './auth/Login';
import Navigation from './navigation/Navigation';
import MissionControl from './missionControl/MissionControl';
import Loading from './loading/Loading';

// IMPORT ROUTE COMPONENTS
import characterRoutes from './characters/characterRoutes';
import authRoutes from './auth/authRoutes';

import getProfile from '../helpers/users/getProfile';

export default function App() {
  
  // Set up Authentication
  const auth = getAuth();
  
  // Set up User Context
  const context = useContext(UserContext);
  
  // ===== USER CONTEXT STATES ===== //
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();
  
  // Start app as initializing until auth runs //
  const [initializing, setInitializing] = useState(true);

  // run the function to extract the routes
  const routesForCharacters = characterRoutes();
  const routesForAuth = authRoutes();

  // Handle user state changes
  async function onAuthStateChanged(user) {
    setUser(user);
    await updateProfile(user);
    if (initializing) setInitializing(false);
  }

  // Update the User profile to match current user in Context
  async function updateProfile(user) {
    if(user) {
      // Fetch User Profile from the database
      const profile = await getProfile(user);
      setProfile(profile.data());
    }
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Run the Loading Screen while Initializing the App
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
                    {/* Choose View based on Browser Router */}
                    <Route path="/" element={<MissionControl />} />
                    {routesForAuth}
                    {routesForCharacters}
                  </Routes>
                </main>

                <section className='chatContainer'>


                </section>
              </>
            )}
        </div>

      </Router>

    </UserContext.Provider>
  );

}