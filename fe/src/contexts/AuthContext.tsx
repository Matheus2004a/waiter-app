import { createContext, useCallback, useState } from 'react';

import { localStorageKeys } from '../config/localStorageKeys';

interface AuthProps {
  children: React.ReactNode,
}

interface AuthContextProps {
  isAuthenticated: boolean,
  isAdmin: boolean,
  signin: (token: string) => void,
  signout: () => void,
  handleUserAdmin: (isAdmin: boolean) => void,
}

export const AuthContext = createContext({} as AuthContextProps);

export default function AuthProvider({ children }: AuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const userIsLogged = localStorage.getItem(localStorageKeys.token);

    return !!userIsLogged;
  });

  const [isAdmin, setIsAdmin] = useState(false);

  const signin = useCallback((token: string) => {
    localStorage.setItem(localStorageKeys.token, token);
    setIsAuthenticated(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.token);
    setIsAuthenticated(false);
  }, []);

  function handleUserAdmin(isAdmin: boolean) {
    setIsAdmin(isAdmin);
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isAdmin,
      handleUserAdmin,
      signin,
      signout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
