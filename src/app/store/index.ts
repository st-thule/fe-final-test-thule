import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { modalReducer } from './modal/reducers/modalReducer';
import postSlice from './post/reducers/postReducer';

const rootReducer = combineReducers({
  modal: modalReducer,
  post: postSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
