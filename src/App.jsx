import './styles/index.scss';

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
import CharacterForm from './pages/Characters/CharacterForm';

import Contacts from './pages/Contacts';

import Organizations from './pages/Organizations';
import OrganizationShowPage from './pages/Organizations/OrganizationShowPage';

import Planets from './pages/Planets';
import PlanetShowPage from './pages/Planets/PlanetShowPage';

import Settings from './pages/Users/Settings';

import Specializations from './pages/Specializations';
import SpecializationShowPage from './pages/Specializations/SpecializationShowPage';

import Species from './pages/Species';
import SpeciesShowPage from './pages/Species/SpeciesShowPage';

import Talents from './pages/Talents';
import TalentShowPage from './pages/Talents/TalentShowPage'

import Todos from './features/Todos';

import Vehicles from './pages/Vehicles';
import VehicleShowPage from './pages/Vehicles/VehicleShowPage';

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
                  <Route path="/characters/:id/edit" element={<CharacterForm />} />

                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/organizations" element={<Organizations />} />
                  <Route path="/organizations/:id" element={<OrganizationShowPage />} />

                  <Route path="/planets" element={<Planets />} />
                  <Route path="/planets/:id" element={<PlanetShowPage />} />

                  <Route path="/profile" element={<Settings />} />

                  <Route path='/specializations' element={<Specializations />} />
                  <Route path='/specializations/:id' element={<SpecializationShowPage />} />
                  
                  <Route path="/species" element={<Species />} />
                  <Route path="/species/:id" element={<SpeciesShowPage />} />

                  <Route path="/talents" element={<Talents />} />
                  <Route path="/talents/:id" element={<TalentShowPage />} />

                  <Route path="/todos" element={<Todos />} />

                  <Route path="/vehicles" element={<Vehicles />} />
                  <Route path='/vehicles/:id' element={<VehicleShowPage />} />

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