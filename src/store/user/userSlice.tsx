import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signUp } from "./actions";
import { LoginResponse, UpdateUserData } from "./types";

interface UserState {
  isLogin: boolean;
  username: string;
  email: string;
  token: string;
  checkedCodes: number[];
  signInError: string;
  singUpError: string | undefined;
  passwordError: string;
  passwordSuccess: boolean;
  userInfoSuccess: boolean;
  userInfoError: string;
}

const initialState: UserState = {
  isLogin: false,
  username: "",
  email: "",
  token: "",
  checkedCodes: [],
  signInError: "",
  singUpError: "",
  passwordError: "",
  passwordSuccess: false,
  userInfoSuccess: false,
  userInfoError: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<LoginResponse>) => {
      const { user, token } = action.payload;
      console.log(action.payload);
      state.isLogin = true;
      state.email = user.email;
      state.username = user.username;
      state.token = token;
    },
    logout: (state) => {
      state.isLogin = false;
      state.username = "";
      state.token = "";
      state.email = "";
    },
    updateUserData: (state, action: PayloadAction<UpdateUserData>) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    setSignUpError: (state, action) => {
      console.log(action.payload);
      state.singUpError = action.payload;
    },
    setSignInError: (state, action) => {
      state.signInError = action.payload;
    },
    setPasswordError: (state, action) => {
      state.passwordError = action.payload;
    },
    setPasswordSuccess: (state, action) => {
      state.passwordSuccess = action.payload;
    },
    setUserInfoSuccess: (state, action) => {
      state.userInfoSuccess = action.payload;
    },
    setUserInfoError: (state, action) => {
      state.userInfoError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.rejected, (state, action) => {
      console.log(action.error);
      if (action.error) {
        state.singUpError = action.error.message;
      }
    });
  },
});

export default userSlice.reducer;

export const {
  signIn,
  logout,
  updateUserData,
  setSignInError,
  setPasswordError,
  setPasswordSuccess,
  setUserInfoError,
  setUserInfoSuccess,
  setSignUpError,
} = userSlice.actions;
