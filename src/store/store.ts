import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./slices/tokenSlice";

const persistedToken = localStorage.getItem("token");

const store = configureStore({
  reducer: {
    token: tokenReducer,
  },
  preloadedState: persistedToken
    ? { token: { value: JSON.parse(persistedToken) } }
    : {},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;

store.subscribe(() => {
  const token = store.getState().token.value;

  localStorage.setItem("token", token ? JSON.stringify(token) : "");
});

export default store;
