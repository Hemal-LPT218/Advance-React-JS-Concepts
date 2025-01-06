import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserState } from "../types";

const initialState: IUserState = {
  users: [],
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<IUser>) => {
      if (state.users === undefined) {
        state.users = [action.payload];
      } else {
        state.users.push(action.payload);
      }
    },
    login: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout, register } = userSlice.actions;
export default userSlice.reducer;
