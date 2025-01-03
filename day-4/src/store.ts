import { configureStore } from "@reduxjs/toolkit";
import { userApis } from "./components/RtkQuery";

export const store = configureStore({
  reducer: {
    [userApis.reducerPath]: userApis.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApis.middleware),
});

export type StateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
