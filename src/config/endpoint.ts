const RESOURCES = {
  auth: 'auth',
  post: 'posts',
};

export const ENDPOINT = {
  auth: {
    index: `${RESOURCES.auth}`,
    login: `${RESOURCES.auth}/login`,
  },
  post: {
    postList: `${RESOURCES.post}`,
    // postDetail: (id: number | string) => `${RESOURCES.post}/${id}`,
  },
};
