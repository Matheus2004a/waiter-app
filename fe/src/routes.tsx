import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { History } from './pages/History';
import { SplashScreen } from './pages/Login/components/SplashScreen';
import { Orders } from './pages/Orders';
import Products from './pages/Products';
import Users from './pages/Users';

import UserProvider from './contexts/Modal/UserContext';
import { DashboardLayout } from './layouts/DashboardLayout';

import PrivateRoutes from './PrivateRoutes';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SplashScreen />} />
        <Route element={<DashboardLayout />}>
          <Route element={<PrivateRoutes />}>
            <Route path='/orders' element={<Orders />} />
            <Route path='/history' element={<History />} />
            <Route path='/menu' element={<Products />} />
            <Route path='/users' element={
              <UserProvider>
                <Users />
              </UserProvider>
            } />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
