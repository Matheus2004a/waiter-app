import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { History } from './pages/History';
import Login from './pages/Login';
import { Orders } from './pages/Orders';
import Products from './pages/Products';
import Users from './pages/Users';

import UserProvider from './contexts/Modal/UserContext';
import { DashboardLayout } from './layouts/DashboardLayout';

import PrivateRoutes from './PrivateRoutes';
import ProductProvider from './contexts/Modal/ProductContext';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route element={<DashboardLayout />}>
          <Route element={<PrivateRoutes />}>
            <Route path='/orders' element={<Orders />} />
            <Route path='/history' element={<History />} />
            <Route path='/menu' element={
              <ProductProvider>
                <Products />
              </ProductProvider>
            } />
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
