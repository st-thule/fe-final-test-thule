import { apiService } from '@app/core/services/api.service';
import { ENDPOINT } from '@config/endpoint';
import { User } from '@shared/models/user';

export const getUserInfo = (id: string | number): Promise<User> => {
  return apiService.get([`${ENDPOINT.users.userInfoWithPost(id)}`]);
};
