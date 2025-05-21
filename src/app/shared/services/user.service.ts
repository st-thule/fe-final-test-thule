import { ApiService } from '@app/core/services/api.service';
import { ENDPOINT } from '@config/endpoint';
import { UserWithPost } from '@shared/models/user';

export class UserService {
  apiService = new ApiService();

  getPersonalInfo = (id: number | string): Promise<UserWithPost> => {
    const endpoint = ENDPOINT.users.userInfoWithPost(id);
    return this.apiService.get([endpoint]);
  };
}
