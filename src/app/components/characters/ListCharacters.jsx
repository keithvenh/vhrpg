import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy, startAfter, limit } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { characters as charactersCollection } from '../../../db/application/db';


function ListCharacters() {
  const [charactersCache, setCharactersCache] = useState({}); 
  const [lastVisible, setLastVisible] = useState({});
  const [hasMore, setHasMore] = useState(true);
  const [type, setType] = useState(['pc']); 

  const getCharacters = async (currentType = ['pc'], lastDoc = null) => {
    let conditions = currentType.length === 1
      ? where('type', '==', currentType[0])
      : where('type', 'in', currentType);
    
    let q = query(
        charactersCollection,
        conditions,
        orderBy('displayName'),
        limit(25)
    );

    if (lastDoc) {
        q = q.startAfter(lastDoc);
    }

    const querySnapshot = await getDocs(q);

    const newCharacters = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
    }));

    setCharactersCache(prev => ({
      ...prev,
      [currentType.join('|')]: [...(prev[currentType.join('|')] || []), ...newCharacters]
    }));
    setLastVisible(prev => ({
      ...prev,
      [currentType.join('|')]: querySnapshot.docs[querySnapshot.docs.length - 1]
    }));
    setHasMore(newCharacters.length === 25);
  };

  const loadMore = () => {
    getCharacters(type, lastVisible[type.join('|')]);
  };

  const changeType = (newType) => {
    setType(newType);
    // You can check if the newType exists in the cache and decide whether to fetch
    if (!charactersCache[newType.join('|')]) {
      getCharacters(newType);
    }
  };

  useEffect(() => {
    if (!charactersCache[type.join('|')]) {
      getCharacters(type);
    }
  }, [type]); 

  const displayedCharacters = charactersCache[type.join('|')] || [];

  return (
    <div className='listCharacters'>
      <div className='filterCharactersButtons'>
        <button className='characterFilterButton' onClick={() => changeType(['pc'])}>PCs</button>
        <button className='characterFilterButton' onClick={() => changeType(['nemesis'])}>Nemeses</button>
        <button className='characterFilterButton' onClick={() => changeType(['rival'])}>Rivals</button>
        <button className='characterFilterButton' onClick={() => changeType(['minion'])}>Minion</button>
        <button className='characterFilterButton' onClick={() => changeType(['nemesis', 'rival', 'minion'])}>NPCs</button>
        <button className='characterFilterButton' onClick={() => changeType(['pc', 'nemesis', 'rival', 'minion'])}>All</button>
      </div>
      <div className='characterLinks'>
        {displayedCharacters.map(char => (
            <Link key={char.id} to={`/characters/${char.id}`}>
                {char.displayName} ({char.type})
            </Link>
        ))}
        {hasMore && <button onClick={loadMore}>Load More</button>}
      </div>

    </div>
    // ...
  );
}

export default ListCharacters;
