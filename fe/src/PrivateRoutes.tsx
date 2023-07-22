import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoutes() {
  const userIsLogged = localStorage.getItem('token');

  return userIsLogged ? <Outlet /> : <Navigate to="/" />;
}
