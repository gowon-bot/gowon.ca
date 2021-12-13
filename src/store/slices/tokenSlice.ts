import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TokenAndUser } from "../../interfaces/DoughnutToken";

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    value: undefined as TokenAndUser | undefined,
  },
  reducers: {
    loginWithLocalStorage(state, action: PayloadAction<TokenAndUser>) {
      state.value = action.payload;
    },
    login(state, action: PayloadAction<TokenAndUser>) {
      state.value = action.payload;
    },
    logout(state) {
      state.value = undefined;
    },
  },
});

export const { login, logout, loginWithLocalStorage } = tokenSlice.actions;
export default tokenSlice.reducer;
