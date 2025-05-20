import { combineReducers, configureStore } from '@reduxjs/toolkit';

import imageReducer from './image/reducers/imageReducer';
import postReducer from './post/reducers/postReducer';
import authReducer from './auth/reducers/authReducer';

const rootReducer = combineReducers({
  post: postReducer,
  image: imageReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
