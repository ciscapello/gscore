import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Subscribe } from "../../types";
import { activateCode, changeProduct, getSubscribes } from "./actions";

interface InitialState {
  subscribes: Subscribe[] | [];
  isLoading: boolean;
  error: boolean;
  currentCardIndex: number | null;
  selectedSubcribeId: number | null;
  selectedProductForBuy: number;
}

const initialState: InitialState = {
  subscribes: [],
  isLoading: false,
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
      state.isLoading = action.payload;
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
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getSubscribes.fulfilled, (state, action) => {
        state.subscribes = action.payload;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(activateCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(activateCode.fulfilled, (state, action) => {
        state.isLoading = false;
        const subscribeIndex = state.subscribes.findIndex(
          (elem) => elem._id === action.payload.subscribeId
        );
        const codeIndex = state.subscribes[subscribeIndex].codes.findIndex(
          (elem) => elem._id === action.payload._id
        );
        state.subscribes[subscribeIndex].codes[codeIndex] = action.payload;
      })
      .addCase(activateCode.rejected, (state) => {
        state.error = true;
      })
      .addCase(changeProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeProduct.fulfilled, (state) => {
        state.isLoading = false;
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
