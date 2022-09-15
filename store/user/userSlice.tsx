import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { LogInFormValues } from "../../components/forms/loginForm/logInForm";
import { SetPasswordFieldValues } from "../../components/forms/passwordForm/passwordForm";
import { SignUpFormValues } from "../../components/forms/signUpForm/signUpForm";
import { BASE_URL } from "../../pages";
import { AppDispatch, RootState } from "../store";
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
    .catch((error) => {
      console.log(error.response.data.message);
      dispatch(setUserInfoError(error.response.data.message));
      setTimeout(() => dispatch(setUserInfoError(false)), 2000);
    });
});

export const setPassword = createAsyncThunk<
  void,
  SetPasswordFieldValues,
  { state: RootState; dispatch: AppDispatch }
>("user/setPassword", (data, { getState, dispatch }) => {
  const { token } = getState().user;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  axios
    .patch(`${BASE_URL}/users/update-password`, data, {
      headers: headers,
    })
    .then((res) => {
      dispatch(setPasswordSuccess(true));
      dispatch(setPasswordError(""));
    })
    .catch((error) => {
      dispatch(setPasswordError(error.response.data.message));
      console.log(error.response.data.message);
    })
    .finally(() => {
      setTimeout(() => {
        dispatch(setPasswordSuccess(false));
      }, 2000);
      setTimeout(() => {
        dispatch(setPasswordError(false));
      }, 2000);
    });
});

export const signUp = createAsyncThunk<
  unknown,
  SignUpFormValues,
  { dispatch: AppDispatch; rejectValue: string }
>("user/signUp", async (data, { dispatch, rejectWithValue }) => {
  const res = await axios.post(`${BASE_URL}/users/sign-up`, data);
  console.log(res);
  return res;
});

export const logIn = createAsyncThunk<
  LoginResponse,
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
