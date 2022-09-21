import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPI } from "../../../api";
import { LogInFormValues } from "../../../components/forms/loginForm/logInForm";
import { SetPasswordFieldValues } from "../../../components/forms/passwordForm/passwordForm";
import { SignUpFormValues } from "../../../components/forms/signUpForm/signUpForm";
import { AppDispatch, RootState } from "../../store";
import { LoginResponse } from "../types";
import {
  setPasswordError,
  setPasswordSuccess,
  setSignInError,
  setUserInfoError,
  setUserInfoSuccess,
  signIn,
  updateUserData,
} from "../userSlice";

export const updateUserInfo = createAsyncThunk<
  void,
  { username: string; email: string },
  { state: RootState; dispatch: AppDispatch }
>("user/updateUserInfo", (data, { getState, dispatch }) => {
  const { token } = getState().user;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  axiosAPI
    .patch(`users`, data, {
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
  axiosAPI
    .patch(`users/update-password`, data, {
      headers: headers,
    })
    .then(() => {
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
>("user/signUp", async (data) => {
  const res = await axiosAPI.post(`users/sign-up`, data);
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
    res = await axiosAPI.post(`users/sign-in`, data);
    dispatch(signIn(res.data));
    dispatch(setSignInError(false));
  } catch {
    dispatch(setSignInError(true));
    return rejectWithValue("Error");
  }
  return res.data;
});
