import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./components/ReduxToolkit";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export type StateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
