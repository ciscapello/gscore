import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

interface LoginAction {
  email: string;
  username: string;
  token: string;
}

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
  },
});

export default userSlice.reducer;

export const { signIn, logout, selectProduct } = userSlice.actions;
