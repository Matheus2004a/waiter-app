import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { SplashScreen } from './pages/Login/components/SplashScreen';
import { Orders } from './pages/Orders';

import PrivateRoutes from './PrivateRoutes';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SplashScreen />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/orders' element={<Orders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
