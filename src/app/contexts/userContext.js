import React, { useState, useEffect, createContext } from 'react';
import { getAuth } from 'firebase/auth';
import getProfile from '../helpers/users/getProfile';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [initializing, setInitializing] = useState(true);

    const auth = getAuth();

    async function onAuthStateChanged(authUser) {
        if (authUser) {
            const profile = await getProfile(authUser);
            setUser({
                ...authUser,
                profile: profile.data()
            });
        } else {
            setUser(null);
        }
        setInitializing(false);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(onAuthStateChanged);
        return unsubscribe; // Clean up subscription
    }, [auth]);

    return (
        <UserContext.Provider value={{ user, setUser, initializing }}>
            {children}
        </UserContext.Provider>
    );
};
