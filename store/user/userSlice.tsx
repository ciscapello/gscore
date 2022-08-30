import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isLogin: boolean;
  username: string;
  email: string;
  token: string;
}

const initialState: UserState = {
  isLogin: false,
  username: "",
  email: "",
  token: "",
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
    },
  },
});

export default userSlice.reducer;

export const { signIn, logout } = userSlice.actions;
