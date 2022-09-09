import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { LogInFormValues } from "../../components/forms/loginForm/logInForm";
import { SetPasswordFieldValues } from "../../components/forms/passwordForm/passwordForm";
import { SignUpFormValues } from "../../components/forms/signUpForm/signUpForm";
import { BASE_URL } from "../../pages";
import { AppDispatch, RootState } from "../store";
import { LoginAction, UpdateUserData } from "./types";

interface UserState {
  isLogin: boolean;
  username: string;
  email: string;
  token: string;
  selectedProductForBuy: number;
  checkedCodes: number[];
  signInError: boolean;
  passwordError: boolean;
  passwordSuccess: boolean;
  userInfoSuccess: boolean;
  userInfoError: boolean;
}

const initialState: UserState = {
  isLogin: false,
  username: "",
  email: "",
  token: "",
  selectedProductForBuy: 0,
  checkedCodes: [],
  signInError: false,
  passwordError: false,
  passwordSuccess: false,
  userInfoSuccess: false,
  userInfoError: false,
};

export const updateUserInfo = createAsyncThunk<
  void,
  { username: string; email: string },
  { state: RootState; dispatch: AppDispatch }
>("user/updateUserInfo", (data, { getState, dispatch }) => {
  const { token } = getState().user;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  axios
    .patch(`${BASE_URL}/users`, data, {
      headers: headers,
    })
    .then((res) => {
      const { email, username } = res.data;
      dispatch(setUserInfoSuccess(true));
      setTimeout(() => dispatch(setUserInfoSuccess(false)), 2000);
      dispatch(updateUserData({ email, username }));
    })
    .catch(() => {
      dispatch(setUserInfoError(true));
      setTimeout(() => dispatch(setUserInfoError(false)), 2000);
    });
});

export const setPassword = createAsyncThunk<
  void,
  SetPasswordFieldValues,
  { state: RootState; dispatch: AppDispatch }
>("user/setPassword", async (data, { getState, dispatch }) => {
  const { token } = getState().user;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await axios.patch(`${BASE_URL}/users/update-password`, data, {
    headers: headers,
  });
  console.log(res);
  if (!res.data) {
    return;
  }
  dispatch(setPasswordSuccess(true));
  dispatch(setPasswordError(""));
  setTimeout(() => {
    dispatch(setPasswordSuccess(false));
  }, 2000);
});

export const buyProduct = createAsyncThunk<
  void,
  undefined,
  { rejectValue: string; state: RootState }
>("user/buyProduct", async (_, { rejectWithValue, getState }) => {
  const { selectedProductForBuy, token } = getState().user;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await axios.post(
    `${BASE_URL}/payments/buy`,
    { priceId: selectedProductForBuy },
    { headers: headers }
  );
});

export const signUp = createAsyncThunk<
  unknown,
  SignUpFormValues,
  { rejectValue: string }
>("user/signUp", async (data, { rejectWithValue }) => {
  const res = await axios.post(`${BASE_URL}/users/sign-up`, data);

  if (!res.data) return rejectWithValue("Server error");
});

export const logIn = createAsyncThunk<
  LogInFormValues,
  LogInFormValues,
  { rejectValue: string; dispatch: AppDispatch }
>("user/logIn", async (data, { rejectWithValue, dispatch }) => {
  let res;
  try {
    res = await axios.post(`${BASE_URL}/users/sign-in`, data);
    dispatch(signIn(res.data));
    dispatch(setSignInError(false));
  } catch {
    dispatch(setSignInError(true));
    return rejectWithValue("Error");
  }

  return res.data;
});

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
      state.selectedProductForBuy = action.payload;
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
    builder.addCase(setPassword.rejected, (state, action) => {
      state.passwordError = true;
    });
  },
});

export default userSlice.reducer;

export const {
  signIn,
  logout,
  selectProduct,
  updateUserData,
  setSignInError,
  setPasswordError,
  setPasswordSuccess,
  setUserInfoError,
  setUserInfoSuccess,
} = userSlice.actions;
