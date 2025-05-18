import { ENDPOINT } from '@config/endpoint';
import { User } from '@shared/models/user';
import { ApiService } from './api.service';

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

export class AuthService {
  apiService = new ApiService();

  registerAccount = (data: RegisterPayload) => {
    return this.apiService.post([ENDPOINT.auth.register], data);
  };

  loginAccount(data: LoginPayload): Promise<LoginResponse> {
    const endpoint = ENDPOINT.auth.login;
    return this.apiService.post([ENDPOINT.auth.login], data);
  }

  logoutAccount() {
    const endpoint = ENDPOINT.auth.logout;
    return this.apiService.delete([ENDPOINT.auth.login]);
  }
}
