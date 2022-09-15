import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../db/application/db';

export default async function getProfile(user) {
    return getDoc(doc(db, 'users', user.uid))
}