import { Navigate, Outlet } from 'react-router-dom';
import useAuth from './hooks/useAuth';

export default function AdminRoutes() {
  const { isAuthenticated, isAdmin } = useAuth();

  const isAllowed = isAuthenticated && isAdmin;

  return isAllowed ? <Outlet /> : <Navigate to="/" replace />;
}
