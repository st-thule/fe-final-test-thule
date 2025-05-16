import { apiService } from '@app/core/services/api.service';
import { ENDPOINT } from '@config/endpoint';
import { UserWithPost } from '@shared/models/user';

export const getPersonalInfo = (id: number | string): Promise<UserWithPost> => {
  const endpoint = ENDPOINT.users.userInfoWithPost(id);
  return apiService.get([endpoint]);
};
