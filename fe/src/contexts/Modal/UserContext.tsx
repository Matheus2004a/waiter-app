import { createContext, useState } from 'react';

export const UserContext = createContext({});

interface UserProviderProps {
  children: React.ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const [userDeleteData, setUserDeleteData] = useState({});

  return (
    <UserContext.Provider value={{

    }}>
      {children}
    </UserContext.Provider>
  );
}
