import React, {createContext, useContext} from 'react';
import { useUser } from '../hooks';

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const { user, setUser } = useUser();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      { children }
    </UserContext.Provider>
  )
}

export const useUserData = () => useContext( UserContext );