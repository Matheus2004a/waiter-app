import { createContext, useCallback, useState } from 'react';

import { localStorageKeys } from '../config/localStorageKeys';

interface AuthProps {
  children: React.ReactNode,
}

interface AuthContextProps {
  isAuthenticated: boolean,
  signin: (token: string) => void,
  signout: () => void,
}

export const AuthContext = createContext({} as AuthContextProps);

export default function AuthProvider({ children }: AuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const userIsLogged = localStorage.getItem(localStorageKeys.token);

    return !!userIsLogged;
  });

  const signin = useCallback((token: string) => {
    localStorage.setItem(localStorageKeys.token, token);
    setIsAuthenticated(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.token);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      signin,
      signout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
