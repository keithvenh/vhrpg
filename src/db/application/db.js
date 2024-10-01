import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import getFirebaseConfig from '../../config/firebase';


initializeApp(getFirebaseConfig());
export const db = getFirestore();
export const auth = getAuth();
export const charactersCollection = collection(db, 'characters');
export const planetsCollection = collection(db, 'planets');
export const organizationsCollection = collection(db, 'organizations');
export const contactsCollection = collection(db, 'contacts');
export const vehiclesCollection = collection(db, 'vehicles');
export const speciesCollection = collection(db, 'species');
export const usersCollection = collection(db, 'users');

export const campaigns = collection(db, 'campaigns');
export const messages = collection(db, 'messages');