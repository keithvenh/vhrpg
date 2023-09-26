import React from 'react';
import ReactDOM from 'react-dom';
import './app/assets/stylesheets/main.scss';
import App from './app/components/App';
import reportWebVitals from './app/helpers/application/reportWebVitals';
import { initializeApp } from "firebase/app";
import getFirebaseConfig from "./config/firebase";
import { UserProvider } from './app/contexts/userContext'; // Import UserProvider
import { AlertProvider } from './app/contexts/alertContext'; // Import AlertProvider

initializeApp(getFirebaseConfig());

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <AlertProvider>
        <App />
      </AlertProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
