import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice  from './features/auth/auth';

// interface IAppStore {
//   auth: {}
// }

// console.log(authSlice);

const rootReducer = combineReducers({ auth: authSlice });

// console.log(authSlice);
export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
