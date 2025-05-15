import { apiService } from '@app/core/services/api.service';
import { ENDPOINT } from '@config/endpoint';
import { UserWithPost } from '@shared/models/user';

export const getUserInfo = (id: string | number): Promise<UserWithPost> => {
  return apiService.get([`${ENDPOINT.users.userInfoWithPost(id)}`]);
};
