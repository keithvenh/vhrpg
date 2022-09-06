import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

export default function Loading(props) {

    return (
        <div className='loading'>
            <h1 className='loading-heading sw' id="loading-heading">Loading</h1>
        </div>
    )
   
}