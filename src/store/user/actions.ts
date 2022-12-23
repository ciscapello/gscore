import { createAsyncThunk } from "@reduxjs/toolkit";
import { LogInFormValues } from "../../components/forms/loginForm/logInForm";
import { SetPasswordFieldValues } from "../../components/forms/passwordForm/passwordForm";
import { SignUpFormValues } from "../../components/forms/signUpForm/signUpForm";
import { AppDispatch, RootState } from "../store";
import { LoginResponse } from "./types";
import {
  setPasswordError,
  setPasswordSuccess,
  setUserInfoError,
  setUserInfoSuccess,
  updateUserData,
} from "./userSlice";
import Api from "../../api";

export const updateUserInfo = createAsyncThunk<
  void,
  { username: string; email: string },
  { dispatch: AppDispatch }
>("user/updateUserInfo", (data, { dispatch }) => {
  Api.patch(`users`, data)
    .then((res) => {
      const { email, username } = res.data;
      dispatch(setUserInfoSuccess(true));
      setTimeout(() => dispatch(setUserInfoSuccess(false)), 2000);
      dispatch(updateUserData({ email, username }));
    })
    .catch((error) => {
      dispatch(setUserInfoError(error.response.data.message));
      setTimeout(() => dispatch(setUserInfoError(false)), 2000);
    });
});

export const setPassword = createAsyncThunk<
  void,
  SetPasswordFieldValues,
  { state: RootState; dispatch: AppDispatch }
>("user/setPassword", (data, { dispatch }) => {
  Api.patch(`users/update-password`, data)
    .then(() => {
      dispatch(setPasswordSuccess(true));
      dispatch(setPasswordError(""));
    })
    .catch((error) => {
      dispatch(setPasswordError(error.response.data.message));
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
>("user/signUp", async (data, { rejectWithValue }) => {
  return await Api.post(`users/sign-up`, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return rejectWithValue(error.response.data.message);
    });
});

export const logIn = createAsyncThunk<
  LoginResponse,
  LogInFormValues,
  { rejectValue: string }
>("user/logIn", async (data, { rejectWithValue }) => {
  return await Api.post(`users/sign-in`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return rejectWithValue(error.response.data.message);
    });
});
