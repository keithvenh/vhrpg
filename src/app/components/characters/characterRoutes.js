import { Route } from 'react-router-dom';
import Characters from './Characters';
import NewCharacter from './NewCharacter';
import Character from './Character';

export function characterRoutes() {
  return (
    <>
      <Route path="/characters" element={<Characters />} />
      <Route path="/characters/new" element={<NewCharacter />} />
      <Route path="/characters/:id/*" element={<Character />} />
    </>
  );
}

export default characterRoutes;
