import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection, doc, onSnapshot, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import getFirebaseConfig from '../../config/firebase';


initializeApp(getFirebaseConfig());
export const db = getFirestore();
export const auth = getAuth();
export const charactersCollection = collection(db, 'characters');
export const campaigns = collection(db, 'campaigns');
export const messages = collection(db, 'messages');
export const users = collection(db, 'users');