import { Routes, Route } from 'react-router-dom';

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
