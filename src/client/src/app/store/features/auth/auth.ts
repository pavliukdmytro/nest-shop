import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from '@store/store';

// Define a type for the slice state
interface IAuthState {
  data: {
    accessToken?: string;
  }
}

// Define the initial state using that type
const initialState: IAuthState = {
  data: {}
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
  const token = state?.auth?.data?.accessToken;

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

export const checkUserData = () => async (dispatch: AppDispatch) => {
    const { status, data } = await axios.post('/token/refresh');

    if (status === 201) {
      dispatch(setStore({ accessToken: data.accessToken }));
    }
}

export default authSlice.reducer;