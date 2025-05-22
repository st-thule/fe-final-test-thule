import { ENDPOINT } from '@config/endpoint';
import { User } from '@shared/models/user';
import { ApiService } from './api.service';

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  phone: string;
  displayName: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  userInfo: User;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export class AuthService {
  apiService = new ApiService();

  registerAccount = (data: RegisterPayload) => {
    return this.apiService.post([ENDPOINT.auth.register], data);
  };

  loginAccount(data: LoginPayload): Promise<LoginResponse> {
    return this.apiService.post([ENDPOINT.auth.login], data);
  }

  logoutAccount() {
    return this.apiService.post([ENDPOINT.auth.logout]);
  }

  changePassword(data: ChangePasswordPayload) {
    return this.apiService.put([ENDPOINT.auth.changePassword], data);
  }
}
