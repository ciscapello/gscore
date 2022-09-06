import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../pages";
import { Code, Subscribe } from "../../types";

interface InitialState {
  products: Subscribe[] | [];
  loading: boolean;
  error: boolean;
}

const initialState: InitialState = {
  products: [],
  loading: false,
  error: false,
};

interface GetSubscribes {
  token: string;
}

export const getSubscribes = createAsyncThunk<
  Subscribe[],
  string,
  { rejectValue: string }
>("products/getSubscribes", async (token, { rejectWithValue }) => {
  const res = await axios(`${BASE_URL}/subscribe/self`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.data) {
    return rejectWithValue("Error");
  }
  return res.data;
});

export const activateCode = createAsyncThunk<
  Code,
  Code,
  { rejectValue: string }
>("products/activateCode", async (code, { rejectWithValue }) => {
  const res = await axios.post(`${BASE_URL}/code/activate`, {
    code: code.code,
  });

  if (!res.data) return rejectWithValue("Server error");

  return res.data;
});

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSubscribes: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubscribes.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getSubscribes.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(activateCode.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(activateCode.fulfilled, (state, action) => {
        state.loading = false;
        console.log("payload", action.payload);
        const subscribeIndex = state.products.findIndex(
          (elem) => elem.id === action.payload.subscribeId
        );
        const codeIndex = state.products[subscribeIndex].codes.findIndex(
          (elem) => elem.id === action.payload.id
        );
        state.products[subscribeIndex].codes[codeIndex] = action.payload;
      });
  },
});

export default productsSlice.reducer;
