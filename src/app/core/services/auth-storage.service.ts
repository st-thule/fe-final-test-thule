import {
  getDataFromLocalStorage,
  removeItemFromLocalStorage,
  setDataToLocalStorage,
} from '../helpers/storage.helper';

export interface AuthStorage {
  setToken(data?: string): void;
  getToken(): void;
  removeToken(): void;
}

export class AuthStorageService implements AuthStorage {
  ACCESS_TOKEN = 'token';

  setToken(token?: string) {
    if (token) {
      setDataToLocalStorage(this.ACCESS_TOKEN, token);
    }
  }

  getToken() {
    return getDataFromLocalStorage(this.ACCESS_TOKEN, '');
  }

  removeToken() {
    removeItemFromLocalStorage(this.ACCESS_TOKEN);
  }
}

export const authStorage = new AuthStorageService();
