import { RootState } from "../store";

export const selectIsLogin = (state: RootState) => {
  return state.user.isLogin;
};

export const selectUserInfoError = (state: RootState) => {
  return state.user.userInfoError;
};

export const selectUserInfoSuccess = (state: RootState) => {
  return state.user.userInfoSuccess;
};

export const selectSignInError = (state: RootState) => {
  return state.user.signInError;
};

export const selectPasswordError = (state: RootState) => {
  return state.user.passwordError;
};

export const selectPasswordSuccess = (state: RootState) => {
  return state.user.passwordSuccess;
};

export const selectUsername = (state: RootState) => {
  return state.user.username;
};

export const selectProductForBuy = (state: RootState) => {
  return state.user.selectedProductForBuy;
};

export const selectSignUpError = (state: RootState) => {
  return state.user.singUpError;
};
