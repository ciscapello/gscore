import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../pages";
import { Code, Subscribe } from "../../types";

interface InitialState {
  subscribes: Subscribe[] | [];
  loading: boolean;
  error: boolean;
  currentCardIndex: number | null;
  selectedSubcribeId: number | null;
}

const initialState: InitialState = {
  subscribes: [],
  loading: false,
  error: false,
  currentCardIndex: null,
  selectedSubcribeId: null,
};

interface ChangeProductRes {
  id: number;
  userId: number;
  productId: number;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  status: string;
}

interface ChangeProductsArgs {
  token: string;
  selectedProductForBuy: number;
  selectedSubcribeId: number;
}

export const getSubscribes = createAsyncThunk<
  Subscribe[],
  string,
  { rejectValue: string }
>("products/getSubscribes", async (token, { rejectWithValue }) => {
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
  const res = await axios.post(`${BASE_URL}/code/activate`, {
    code: code.code,
  });

  if (!res.data) return rejectWithValue("Server error");

  return res.data;
});

export const changeProduct = createAsyncThunk<
  ChangeProductRes,
  ChangeProductsArgs,
  { rejectValue: string }
>(
  "products/changeProduct",
  async (
    { token, selectedProductForBuy, selectedSubcribeId },
    { rejectWithValue }
  ) => {
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
    if (!res.data) return rejectWithValue("Server error");

    console.log(res.data);
    return res.data;
  }
);

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
      .addCase(changeProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(changeProduct.fulfilled, (state, action) => {
        state.loading = false;
        // state.subscribes[subscribeIndex].status
      });
  },
});

export default productsSlice.reducer;

export const { setLoading, setCurrentCardIndex, setSelectedSubcribeId } =
  productsSlice.actions;
