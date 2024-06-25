import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userInfo: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action?.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userInfo = null;
    },
  },
});

export const { setUser, setUserInfo, logout } = authSlice.actions;

export default authSlice.reducer;

export const currentUser = (state) => state.auth.user;
export const currentUserInfo = (state) => state.auth.userInfo;
export const currentUserToken = (state) => state.auth.token;
