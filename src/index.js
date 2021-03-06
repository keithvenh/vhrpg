import React from 'react';
import ReactDOM from 'react-dom';
import './app/assets/stylesheets/main.scss';
import App from './app/components/App';
import reportWebVitals from './app/helpers/application/reportWebVitals';
import { initializeApp } from "firebase/app";
import getFirebaseConfig from "./config/firebase";

initializeApp(getFirebaseConfig());

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
