import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logIn, signUp } from "./actions";
import { UpdateUserData } from "./types";

interface UserState {
  isLogin: boolean;
  username: string;
  email: string;
  token: string;
  checkedCodes: number[];
  signInError: string | undefined;
  singUpError: string | undefined;
  passwordError: string;
  passwordSuccess: boolean;
  userInfoSuccess: boolean;
  userInfoError: string;
  isLoading: boolean;
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
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSignUpError: (state, action) => {
      state.singUpError = action.payload;
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
    builder
      .addCase(signUp.rejected, (state, action) => {
        state.singUpError = action.payload;
        state.isLoading = false;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.signInError = action.payload;
        state.isLoading = false;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        const { user, token } = action.payload;
        state.isLogin = true;
        state.email = user.email;
        state.username = user.name;
        state.token = token;
      })
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export default userSlice.reducer;

export const {
  logout,
  updateUserData,
  setSignInError,
  setPasswordError,
  setPasswordSuccess,
  setUserInfoError,
  setUserInfoSuccess,
  setSignUpError,
} = userSlice.actions;
