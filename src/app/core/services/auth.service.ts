import { User } from '@shared/models/user';
import { apiService } from './api.service';
import { ENDPOINT } from '@config/endpoint';

interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  phone: string;
  displayName: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  userInfo: User;
}
export const registerAccount = (data: RegisterPayload) => {
  return apiService.post([ENDPOINT.auth.register], data);
};

export const loginAccount = async (
  data: LoginPayload
): Promise<LoginResponse> => {
  return await apiService.post([ENDPOINT.auth.login], data);
};

export const logoutAccount = async () => {
  return apiService.delete([ENDPOINT.auth.logout]);
};
