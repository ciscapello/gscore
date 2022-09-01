import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginAction, UpdateUserData } from "./types";

interface UserState {
  isLogin: boolean;
  username: string;
  email: string;
  token: string;
  selectedProductId: number;
}

const initialState: UserState = {
  isLogin: false,
  username: "",
  email: "",
  token: "",
  selectedProductId: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<LoginAction>) => {
      const { email, username, token } = action.payload;
      state.isLogin = true;
      state.email = email;
      state.username = username;
      state.token = token;
    },
    logout: (state) => {
      state.isLogin = false;
      state.username = "";
      state.token = "";
      state.email = "";
    },
    selectProduct: (state, action: PayloadAction<number>) => {
      state.selectedProductId = action.payload;
    },
    updateUserData: (state, action: PayloadAction<UpdateUserData>) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
  },
});

export default userSlice.reducer;

export const { signIn, logout, selectProduct, updateUserData } =
  userSlice.actions;
