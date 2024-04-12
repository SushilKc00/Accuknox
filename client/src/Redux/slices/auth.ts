import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UserInitialState } from "../../types/ProductType";

const initialState: UserInitialState = {
  isAuthenticate: false,
  currentUser: {
    username: "",
    email: "",
    profile: "",
  },
  isLoading: true,
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    getCurrentUser(state, action) {
      state.currentUser = action.payload.user;
      state.isLoading = false;
      state.isAuthenticate = true;
    },

    Error(state) {
      state.isAuthenticate = false;
    },
  },
});

export const { getCurrentUser, Error } = userReducer.actions;
export default userReducer.reducer;

export function getUser(token: any) {
  return async function getUserFun(dispatch: any) {
    try {
      const { data } = await axios.get("/api/auth/user/authenticate", {
        headers: {
          token: token,
        },
      });

      dispatch(getCurrentUser(data));
    } catch (error: any) {
      dispatch(Error(error.response.data));
    }
  };
}
