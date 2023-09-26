// import React from 'react';
// import { Link } from 'react-router-dom';
// import { query, onSnapshot } from 'firebase/firestore';
// import { characters } from '../../../db/application/db';
// import CharacterLink from './CharacterLink';

// class Characters extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             characters: [],
//             view: '',
//             page: '',

//         }
//         this.getCharacters = this.getCharacters.bind(this);
//     }

//     async getCharacters(characters) {

//         const q = query(characters);
      
//         const unsub = onSnapshot(q,(querySnapshot) => {
//           querySnapshot.forEach((doc) => {
//             // doc.data() is never undefined for query doc snapshots
//             const data = querySnapshot.docs.map(doc => ({
//               ...doc.data(),
//               id: doc.id,
//             }));
      
//             this.setState({characters: data});
//           });
//         } )
//         return unsub;
      
//     }

//     componentDidMount() {
//         this.getCharacters(characters);
//     }

//     render() {

//         return (
            
//             <div className='characters'>

//                 <div className='charactersFilter'>
//                     <p className='allFilter true'>All</p>
//                     <p className='pcFilter'>PCs</p>
//                     <p className='npcFilter'>NPCs</p>
//                     <p className='nemesisFilter'>Nemeses</p>
//                     <p className='rivalFilter'>Rivals</p>
//                     <p className='minionFilter'>Minions</p>
//                 </div>

//                 <h1 className='newCharacter' >
//                     <Link to='/characters/new'>
//                         <i className='fas fa-plus' onClick={() => this.props.updateView('newCharacter','','')}></i> New
//                     </Link>
//                 </h1>
                
//                 <div className='characterLinks'>

//                     {this.state.characters.map((char) => (<CharacterLink key={char.id} character={char} updateView={this.props.updateView} />))}

//                 </div>
//             </div>
//         )

//     }
// }

// export default Characters;

import { Routes, Route, Outlet } from 'react-router-dom';

import ListCharacters from './ListCharacters';
import ShowCharacter from './ShowCharacter';
import EditCharacter from './EditCharacter';
import NewCharacter from './NewCharacter';

function Characters() {
  return (
    <Routes>
      <Route path="/" element={<ListCharacters />} />
      <Route path="/new" element={<NewCharacter />} />
      <Route path=":id" element={<ShowCharacter />} />
      <Route path=":id/edit" element={<EditCharacter />} />
    </Routes>
  );
}

export default Characters;
