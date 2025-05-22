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
    changePassword: `${RESOURCES.auth}/change-password`,
  },

  post: {
    postList: `${RESOURCES.post}`,
    postDetail: (id: number | string) => `${RESOURCES.post}/${id}`,
    postCreate: `${RESOURCES.post}`,
    postEdit: (id: number | string) => `${RESOURCES.post}/${id}`,
    postDelete: (id: number | string) => `${RESOURCES.post}/${id}`,
    postByTag: (tagName: string) => `${RESOURCES.post}/public?tags=${tagName}`,
  },

  signatures: {
    uploadImage: `${RESOURCES.signatures}`,
  },

  users: {
    userInfoWithPost: (id: number | string) =>
      id === 'me'
        ? `${RESOURCES.users}/me/${RESOURCES.post}`
        : `${RESOURCES.users}/${id}/${RESOURCES.post}`,
    editInfo: `${RESOURCES.users}/me`,
  },
};
