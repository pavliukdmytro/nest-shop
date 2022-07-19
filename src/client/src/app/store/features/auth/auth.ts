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
  initialState,
  reducers: {
    setStore: (state, { payload }) => {
      state.data = {
        ...state.data,
        ...payload,
      }
    }
  },
});

export const { setStore } = authSlice.actions;

export const userData = (state: any): any => {
  const token = state?.auth?.data?.access_token;
  if (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }
  return null;
};

export default authSlice.reducer;