import React, { createContext, ReactNode, useState } from 'react';

import { USER_KEY } from '@app/core/constants/contants';
import {
  removeItemFromLocalStorage,
  setDataToLocalStorage,
} from '@app/core/helpers/storage.helper';
import { User } from '../models/user';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  setUserSession: (user: User) => void;
  clearUserSession: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setUserSession = (user: User) => {
    setUser(user);
    setIsAuthenticated(true);
    setDataToLocalStorage(USER_KEY, user);
  };

  const clearUserSession = () => {
    setUser(null);
    setIsAuthenticated(false);
    removeItemFromLocalStorage(USER_KEY);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, setUserSession, clearUserSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};
