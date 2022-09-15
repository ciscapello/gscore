import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../pages";
import { Code, Subscribe } from "../../types";
import { AppDispatch, RootState } from "../store";
import { ChangeProductRes } from "./types";

interface InitialState {
  subscribes: Subscribe[] | [];
  loading: boolean;
  error: boolean;
  currentCardIndex: number | null;
  selectedSubcribeId: number | null;
  selectedProductForBuy: number;
}

const initialState: InitialState = {
  subscribes: [],
  loading: false,
  error: false,
  currentCardIndex: null,
  selectedSubcribeId: null,
  selectedProductForBuy: 0,
};

export const buyProduct = createAsyncThunk<
  void,
  undefined,
  { state: RootState }
>("user/buyProduct", async (_, { getState }) => {
  const { token } = getState().user;
  const { selectedProductForBuy } = getState().products;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await axios.post(
    `${BASE_URL}/payments/buy`,
    { priceId: selectedProductForBuy },
    { headers: headers }
  );
});

export const activateHoldedCodes = createAsyncThunk<
  void,
  { selectedCodes: number[]; subscribeId: number },
  { state: RootState; dispatch: AppDispatch }
>("products/activateHoldedCodes", async (args, { getState, dispatch }) => {
  const { token } = getState().user;
  console.log(args);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await axios.put(
    `${BASE_URL}/code/manage`,
    {
      codesIds: args.selectedCodes,
      subscribeId: args.subscribeId,
    },
    { headers: headers }
  );
  console.log(res);
  dispatch(getSubscribes());
});

export const getSubscribes = createAsyncThunk<
  Subscribe[],
  undefined,
  { rejectValue: string; state: RootState }
>("products/getSubscribes", async (_, { rejectWithValue, getState }) => {
  console.log(getState().user);
  const { token } = getState().user;

  const res = await axios.get<Subscribe[]>(`${BASE_URL}/subscribe/self`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.data) {
    return rejectWithValue("Error");
  }
  const sortedData = res.data.sort((a, b) => a.id - b.id);
  console.log(sortedData);
  return sortedData;
});

export const activateCode = createAsyncThunk<
  Code,
  Code,
  { rejectValue: string }
>("products/activateCode", async (code, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${BASE_URL}/code/activate`, {
      code: code.code,
    });
    if (!res.data) {
      throw new Error("Server error");
    }
    return res.data;
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    return rejectWithValue(message);
  }
});

export const changeProduct = createAsyncThunk<
  ChangeProductRes,
  undefined,
  { rejectValue: string; state: RootState }
>("products/changeProduct", async (_, { rejectWithValue, getState }) => {
  const { token } = getState().user;
  const { selectedSubcribeId, selectedProductForBuy } = getState().products;
  try {
    const res = await axios.post(
      `${BASE_URL}/subscribe/change-product`,
      {
        productId: selectedProductForBuy,
        subscribeId: selectedSubcribeId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch {
    return rejectWithValue("Server error");
  }
});

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCurrentCardIndex: (state, action: PayloadAction<number | null>) => {
      state.currentCardIndex = action.payload;
    },
    setSelectedSubcribeId: (state, action: PayloadAction<number | null>) => {
      state.selectedSubcribeId = action.payload;
    },
    selectProduct: (state, action: PayloadAction<number>) => {
      state.selectedProductForBuy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubscribes.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getSubscribes.fulfilled, (state, action) => {
        state.subscribes = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(activateCode.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(activateCode.fulfilled, (state, action) => {
        state.loading = false;
        console.log("payload", action.payload);
        const subscribeIndex = state.subscribes.findIndex(
          (elem) => elem.id === action.payload.subscribeId
        );
        const codeIndex = state.subscribes[subscribeIndex].codes.findIndex(
          (elem) => elem.id === action.payload.id
        );
        state.subscribes[subscribeIndex].codes[codeIndex] = action.payload;
      })
      .addCase(activateCode.rejected, (state, action) => {
        state.error = true;
        console.log(action.payload);
      })
      .addCase(changeProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(changeProduct.fulfilled, (state, action) => {
        state.loading = false;
      });
  },
});

export default productsSlice.reducer;

export const {
  setLoading,
  setCurrentCardIndex,
  setSelectedSubcribeId,
  selectProduct,
} = productsSlice.actions;
