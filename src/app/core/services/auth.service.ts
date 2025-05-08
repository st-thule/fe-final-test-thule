import { apiService } from './api.service';

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
export const registerAccount = (data: RegisterPayload) => {
  console.log(data);
  return apiService.post(['/users/register'], data);
};
