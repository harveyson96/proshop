import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logOut: (state, action) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});
export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
