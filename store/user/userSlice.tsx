import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { SignUpFormValues } from "../../components/forms/signUpForm/signUpForm";
import { BASE_URL } from "../../pages";
import { LoginAction, UpdateUserData } from "./types";

interface UserState {
  isLogin: boolean;
  username: string;
  email: string;
  token: string;
  selectedProductForBuy: number;
  checkedCodes: number[];
}

const initialState: UserState = {
  isLogin: false,
  username: "",
  email: "",
  token: "",
  selectedProductForBuy: 0,
  checkedCodes: [],
};

export const signUp = createAsyncThunk<
  unknown,
  SignUpFormValues,
  { rejectValue: string }
>("products/activateCode", async (data, { rejectWithValue }) => {
  const res = await axios.post(`${BASE_URL}/users/sign-up`, data);

  if (!res.data) return rejectWithValue("Server error");
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
  },
});

export default userSlice.reducer;

export const { signIn, logout, selectProduct, updateUserData } =
  userSlice.actions;
