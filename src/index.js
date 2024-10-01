import React from 'react';
import ReactDOM from 'react-dom/client';

import { UserProvider } from './app/contexts/userContext'; // Import UserProvider
import { AlertProvider } from './app/contexts/alertContext'; // Import AlertProvider

import App from './App';

import './app/assets/stylesheets/main.scss';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import getFirebaseConfig from "./config/firebase";

const app = initializeApp(getFirebaseConfig());
const analytics = getAnalytics(app);


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <UserProvider>
      <AlertProvider>
        <App />
      </AlertProvider>
    </UserProvider>
  </React.StrictMode>
);