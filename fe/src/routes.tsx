import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { SplashScreen } from './pages/Login/components/SplashScreen';
import { Orders } from './pages/Orders';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SplashScreen />} />
        <Route path='/orders' element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
}
