import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface IAuthState {
  data: {
    access_token?: string | undefined;
  }
}

// Define the initial state using that type
const initialState: IAuthState = {
  data: {

  }
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setStore: (state, { payload }) => {
      console.log(payload);
      state.data = {
        ...state.data,
        ...payload,
      }
    }
  },
});

export const { setStore } = authSlice.actions;

export default authSlice.reducer;