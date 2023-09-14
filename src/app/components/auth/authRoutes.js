import { Route } from 'react-router-dom';
import Login from './Login';
import Auth from './Auth';
import MyAccount from './MyAccount';

export function characterRoutes() {
  return (
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/users/:id/*" element={<Auth />} />
      <Route path="/profile" element={<MyAccount />} />
    </>
  );
}

export default characterRoutes;