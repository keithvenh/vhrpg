import { Route } from 'react-router-dom';
import Login from './Login';
import Auth from './Auth';

export function characterRoutes() {
  return (
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/users/:id/*" element={<Auth />} />
    </>
  );
}

export default characterRoutes;