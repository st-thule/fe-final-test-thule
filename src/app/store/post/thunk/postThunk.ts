import { createAsyncThunk } from '@reduxjs/toolkit';

import { Post, PostResponse } from '@shared/models/post';
import { PostService } from '@shared/services/post.service';

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
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch posts');
  }
});

//create post
export const createPostThunk = createAsyncThunk<
  Post,
  any,
  { rejectValue: string }
>('posts/createPost', async (postData, { rejectWithValue }) => {
  try {
    const response = await postService.createPost(postData);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to create post');
  }
});

//update post
export const updatePostThunk = createAsyncThunk<
  Post,
  { id: string | number; data: any },
  { rejectValue: string }
>('posts/updatePost', async ({ id, data }, { rejectWithValue }) => {
  try {
    const updatedPost = await postService.updatePost(id, data);
    return updatedPost;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to update post');
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
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to delete post');
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
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch post by id');
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
  } catch (error: any) {
    return rejectWithValue(
      error.message || 'Failed to fetch post detail for update'
    );
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
      return rejectWithValue(error.message || 'Failed to fetch posts by tag');
    }
  }
);
