import { createContext, useCallback, useState } from 'react';

import { Users } from '../../types/Users';

interface UserContextProps {
  isModalVisible: {
    newUser: boolean,
    updateUser: boolean,
    deleteUser: boolean,
  };
  userSelected: Users;
  handleModalVisible: (key: string, value: boolean, item?: Users) => void;
}

export const UserContext = createContext({} as UserContextProps);

interface UserProviderProps {
  children: React.ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const [isModalVisible, setIsModalVisible] = useState({
    newUser: false,
    updateUser: false,
    deleteUser: false,
  });

  const [userSelected, setUserSelected] = useState({} as Users);

  const handleModalVisible = useCallback((key: string, value: boolean, item?: Users) => {
    setIsModalVisible((prevState) => ({
      ...prevState,
      [key]: value,
    }));

    if (item) setUserSelected(item);
  }, []);

  return (
    <UserContext.Provider value={{
      isModalVisible,
      userSelected,
      handleModalVisible
    }}>
      {children}
    </UserContext.Provider>
  );
}
