import { query, orderBy, getDocs } from 'firebase/firestore';
import { charactersCollection } from '../../../db/application/db';

export const fetchCharacters = async () => {
    const q = query(charactersCollection, orderBy('displayName'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
    }));
};
