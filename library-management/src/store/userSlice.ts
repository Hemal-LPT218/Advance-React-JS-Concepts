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
      state.users.push(action.payload);
    },

    login: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = null;
    },

    deleteAccount: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const { login, logout, register, deleteAccount } = userSlice.actions;
export default userSlice.reducer;
