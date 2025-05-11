import React, { createContext, ReactNode, useEffect, useState } from 'react';

import { USER_KEY } from '@app/core/constants/contants';
import {
  getDataFromLocalStorage,
  removeItemFromLocalStorage,
  setDataToLocalStorage,
} from '@app/core/helpers/storage.helper';
import { authStorage } from '@app/core/services/auth-storage.service';
import { User } from '../models/user';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  setUserSession: (user: User, token: string) => void;
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

  useEffect(() => {
    const token = authStorage.getToken();

    if (token) {
      const user = getDataFromLocalStorage(USER_KEY, null);
      if (user) {
        try {
          setUser(user);
          setIsAuthenticated(true);
        } catch (err) {
          console.log('Error: ', err);
        }
      }
      setIsAuthenticated(true);
    }
  }, []);

  const setUserSession = (user: User, token: string) => {
    setUser(user);
    setIsAuthenticated(true);
    authStorage.setToken(token);
    setDataToLocalStorage(USER_KEY, user);
  };

  const clearUserSession = () => {
    setUser(null);
    setIsAuthenticated(false);
    authStorage.removeToken();
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
