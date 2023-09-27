import React, { createContext, useState, useCallback } from 'react';
import Alert from '../components/Alert';

const AlertContext = createContext();

const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = useCallback((message, type = "info") => {
    setAlert({ message, type });
    // Auto-hide the toast after 3 seconds
    setTimeout(() => setAlert(null), 3000);
  }, []);

  return (
    <AlertContext.Provider value={showAlert}>
      {children}
      {alert && <Alert message={alert.message} type={alert.type} />}
    </AlertContext.Provider>
  );
};

export { AlertProvider, AlertContext };
