import { createAsyncThunk } from '@reduxjs/toolkit';

import { Post, PostResponse } from '@shared/models/post';
import { IPostPayLoad, PostService } from '@shared/services/post.service';

const postService = new PostService();

//fetchpost
export const fetchPostsThunk = createAsyncThunk<
  PostResponse,
  { page: number; size: number },
  { rejectValue: string }
>('posts/fetchPosts', async ({ page, size }, { rejectWithValue }) => {
  try {
    const response = await postService.getPublicPost(page, size);
    return response;
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to fetch posts');
  }
});

//create post
export const createPostThunk = createAsyncThunk<
  Post,
  IPostPayLoad,
  { rejectValue: string }
>('posts/createPost', async (postData, { rejectWithValue }) => {
  try {
    const response = await postService.createPost(postData);
    return response;
  } catch (error) {
    const message =
      error?.response?.data?.errors?.[0] ||
      error?.response?.data?.message ||
      'Failed to create posts';
    return rejectWithValue(message);
  }
});

//update post
export const updatePostThunk = createAsyncThunk<
  Post,
  { id: string | number; data },
  { rejectValue: string }
>('posts/updatePost', async ({ id, data }, { rejectWithValue }) => {
  try {
    const updatedPost = await postService.updatePost(id, data);
    return updatedPost;
  } catch (error) {
    const message =
      error?.response?.data?.errors?.[0] ||
      error?.response?.data?.message ||
      'Failed to update post';
    return rejectWithValue(message);
  }
});

// Delete post
export const deletePostThunk = createAsyncThunk<
  string | number,
  string | number,
  { rejectValue: string }
>('posts/deletePost', async (id, { rejectWithValue }) => {
  try {
    await postService.deletePost(id);
    return id;
  } catch (error) {
    const message =
      error?.response?.data?.errors?.[0] ||
      error?.response?.data?.message ||
      'Failed to delete post';
    return rejectWithValue(message);
  }
});

// get post by id
export const getPostByIdThunk = createAsyncThunk<
  Post,
  string | number,
  { rejectValue: string }
>('posts/getPostById', async (id, { rejectWithValue }) => {
  try {
    const post = await postService.getPostById(id);
    return post;
  } catch (error) {
    const message =
      error?.response?.data?.errors?.[0] ||
      error?.response?.data?.message ||
      'Failed to fetch post by id';
    return rejectWithValue(message);
  }
});

// get post detail to update
export const getPostDetailUpdateThunk = createAsyncThunk<
  Post,
  string | number,
  { rejectValue: string }
>('posts/getPostDetailUpdate', async (id, { rejectWithValue }) => {
  try {
    const post = await postService.getPostDetailUpdate(id);
    return post;
  } catch (error) {
    const message =
      error?.response?.data?.errors?.[0] ||
      error?.response?.data?.message ||
      'Failed to fetch post to update';
    return rejectWithValue(message);
  }
});

// get posts by tag
export const getPostsByTagThunk = createAsyncThunk<
  PostResponse,
  { tagName: string; page: number; size: number },
  { rejectValue: string }
>(
  'posts/getPostsByTag',
  async ({ tagName, page, size }, { rejectWithValue }) => {
    try {
      const response = await postService.getPostsByTag(tagName, page, size);
      return response;
    } catch (error) {
      const message =
        error?.response?.data?.errors?.[0] ||
        error?.response?.data?.message ||
        'Failed to fetch posts by tag';
      return rejectWithValue(message);
    }
  }
);
