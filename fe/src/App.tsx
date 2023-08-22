import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Router from './routes';

import AuthProvider from './contexts/AuthContext';
import { GlobalStyles } from './styles/GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyles />
      <AuthProvider>
        <Router />
      </AuthProvider>
      <ToastContainer position='bottom-center' />
    </>
  );
}

export default App;
