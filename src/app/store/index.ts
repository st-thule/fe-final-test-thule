import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/reducers/authReducer';
import imageReducer from './image/reducers/imageReducer';
import postReducer from './post/reducers/postReducer';
import userReducer from './user/reducers/userReducer';

const rootReducer = combineReducers({
  post: postReducer,
  image: imageReducer,
  auth: authReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
