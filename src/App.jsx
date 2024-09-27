import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserContext } from './app/contexts/userContext';

import Loading from './app/components/loading/Loading';
import Login from './app/components/auth/Login';
import Navigation from './app/components/navigation/Navigation';

// IMPORT ROUTE COMPONENTS
import NotFound from './app/components/NotFound';

import Home from './pages/Home';

import Astrogation from './features/Astrogation';

import Characters from './pages/Characters';
import CharacterShowPage from './pages/Characters/CharacterShowPage';

import Contacts from './pages/Contacts';

import Organizations from './pages/Organizations';
import Organization from './pages/Organizations/Organization';

import Planets from './pages/Planets';
import PlanetShowPage from './pages/Planets/PlanetShowPage';

import Settings from './pages/Users/Settings';

import Species from './pages/Species';

import Todos from './features/Todos';

import Vehicles from './pages/Vehicles';

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
                  <Route path="/" element={<Home />} />

                  <Route path="/astrogation" element={<Astrogation />} />
                  <Route path="/characters" element={<Characters />} />
                  <Route path="/characters/:id" element={<CharacterShowPage />} />

                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/organizations" element={<Organizations />} />
                  <Route path="/organization" element={<Organization />} />

                  <Route path="/planets" element={<Planets />} />
                  <Route path="/planets/:id" element={<PlanetShowPage />} />

                  <Route path="/profile" element={<Settings />} />
                  <Route path="/species" element={<Species />} />

                  <Route path="/todos" element={<Todos />} />
                  <Route path="/vehicles" element={<Vehicles />} />

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