import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userDetails: null,
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
    setUserDetails: (state, action) => {
      const { info } = action.payload;
      state.userDetails = info;
    },
    logout: (state) => {
      state.user = null;
      state.userDetails = null;
      state.token = null;
    },
  },
});

export const { setUser, setUserDetails, logout } = authSlice.actions;

export default authSlice.reducer;

export const currentUser = (state) => state.auth.user;
export const currentUserToken = (state) => state.auth.token;
export const currentUserDetails = (state) => state.auth.userDetails;
