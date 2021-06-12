import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../interfaces/User";

const userSlice = createSlice({
  name: "user",
  initialState: {
    value: undefined as User | undefined,
  },
  reducers: {
    loginWithLocalStorage(state, action: PayloadAction<User>) {
      console.log("logging in ", action.payload);

      state.value = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    login(state, action: PayloadAction<User>) {
      state.value = action.payload;
    },
    logout(state) {
      state.value = undefined;
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout, loginWithLocalStorage } = userSlice.actions;
export default userSlice.reducer;
