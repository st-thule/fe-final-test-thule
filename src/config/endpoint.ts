const RESOURCES = {
  auth: 'users',
  post: 'posts',
  signatures: 'signatures',
  users: 'users',
};

export const ENDPOINT = {
  auth: {
    index: `${RESOURCES.auth}`,
    register: `${RESOURCES.auth}/register`,
    login: `${RESOURCES.auth}/login`,
    logout: `${RESOURCES.auth}/logout`,
  },
  post: {
    postList: `${RESOURCES.post}`,
    postDetail: (id: number | string) => `${RESOURCES.post}/${id}`,
    postCreate: `${RESOURCES.post}`,
  },

  signatures: {
    uploadImage: `${RESOURCES.signatures}`,
  },

  users: {
    userInfoWithPost: (id: number | string) =>
      `${RESOURCES.users}/${id}/${RESOURCES.post}`,
  },
};
