import { ApiService } from '@app/core/services/api.service';
import { ENDPOINT } from '@config/endpoint';
import { User } from '@shared/models/user';

export interface IUserPayload {
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  displayName: string;
}
export class UserService {
  apiService = new ApiService();

  getPersonalInfo = (id: number | string): Promise<User> => {
    const endpoint = ENDPOINT.users.userInfoWithPost(id);
    return this.apiService.get([endpoint]);
  };

  updateProfile = (data: IUserPayload): Promise<User> => {
    return this.apiService.put([`${ENDPOINT.users.editInfo}`], data);
  };
}
