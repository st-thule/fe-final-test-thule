import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { modalReducer } from './modal/reducers/modalReducer';
import postSlice from './post/reducers/postReducer';
import imageSlice from './image/reducers/imageReducer';

const rootReducer = combineReducers({
  modal: modalReducer,
  post: postSlice,
  image: imageSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
