import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Subscribe } from "../../types";
import { activateCode, changeProduct, getSubscribes } from "./actions";

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
      .addCase(getSubscribes.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getSubscribes.fulfilled, (state, action) => {
        state.subscribes = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(activateCode.pending, (state) => {
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
      .addCase(changeProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeProduct.fulfilled, (state) => {
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
