import { createSlice } from '@reduxjs/toolkit';
import {
  fetchPostsThunk,
  createPostThunk,
  updatePostThunk,
  deletePostThunk,
  getPostByIdThunk,
  getPostDetailUpdateThunk,
} from '../thunk/postThunk';

const initialState = {
  posts: {
    data: [],
    totalPage: 0,
    totalItems: 0,
    itemsPerPage: 0,
    currentPage: 0,
    loadMore: true,
  },
  postDetail: null,
  loading: {
    fetch: false,
    create: false,
    update: false,
    delete: false,
    getById: false,
    getForUpdate: false,
  },
  error: {
    fetch: null,
    create: null,
    update: null,
    delete: null,
    getById: null,
    getForUpdate: null,
  },
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all posts
    builder
      .addCase(fetchPostsThunk.pending, (state) => {
        state.loading.fetch = true;
        state.error.fetch = null;
      })
      .addCase(fetchPostsThunk.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.posts = {
          data: action.payload.data,
          totalPage: action.payload.totalPage,
          totalItems: action.payload.totalItems,
          currentPage: action.payload.currentPage,
          itemsPerPage: action.payload.itemsPerPage,
          loadMore: action.payload.loadMore,
        };
      })
      .addCase(fetchPostsThunk.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error.fetch = action.error.message || 'Failed to fetch posts';
      });

    // Create post
    builder
      .addCase(createPostThunk.pending, (state) => {
        state.loading.create = true;
        state.error.create = null;
      })
      .addCase(createPostThunk.fulfilled, (state, action) => {
        state.loading.create = false;
        state.posts.data.unshift(action.payload);
        state.posts.totalItems += 1;
      })
      .addCase(createPostThunk.rejected, (state, action) => {
        state.loading.create = false;
        state.error.create = action.error.message || 'Failed to create post';
      });

    // Update post
    builder
      .addCase(updatePostThunk.pending, (state) => {
        state.loading.update = true;
        state.error.update = null;
      })
      .addCase(updatePostThunk.fulfilled, (state, action) => {
        state.loading.update = false;
        const index = state.posts.data.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) {
          state.posts.data[index] = action.payload;
        }
      })
      .addCase(updatePostThunk.rejected, (state, action) => {
        state.loading.update = false;
        state.error.update = action.error.message || 'Failed to update post';
      });

    // Delete post
    builder
      .addCase(deletePostThunk.pending, (state) => {
        state.loading.delete = true;
        state.error.delete = null;
      })
      .addCase(deletePostThunk.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.posts.data = state.posts.data.filter(
          (post) => post.id !== action.payload
        );
        state.posts.totalItems = Math.max(0, state.posts.totalItems - 1);
      })
      .addCase(deletePostThunk.rejected, (state, action) => {
        state.loading.delete = false;
        state.error.delete = action.error.message || 'Failed to delete post';
      });

    // Get post by ID
    builder
      .addCase(getPostByIdThunk.pending, (state) => {
        state.loading.getById = true;
        state.error.getById = null;
      })
      .addCase(getPostByIdThunk.fulfilled, (state, action) => {
        state.loading.getById = false;
        state.postDetail = action.payload;
      })
      .addCase(getPostByIdThunk.rejected, (state, action) => {
        state.loading.getById = false;
        state.error.getById = action.error.message || 'Failed to get post';
      });

    // Get post detail for update
    builder
      .addCase(getPostDetailUpdateThunk.pending, (state) => {
        state.loading.getForUpdate = true;
        state.error.getForUpdate = null;
      })
      .addCase(getPostDetailUpdateThunk.fulfilled, (state, action) => {
        state.loading.getForUpdate = false;
        state.postDetail = action.payload;
      })
      .addCase(getPostDetailUpdateThunk.rejected, (state, action) => {
        state.loading.getForUpdate = false;
        state.error.getForUpdate =
          action.error.message || 'Failed to get post for update';
      });
  },
});

export default postSlice.reducer;
