import { RootState } from "../store";

export const selectLoading = (state: RootState) => {
  return state.products.isLoading || state.user.isLoading;
};

export const selectCurrentCardIndex = (state: RootState) => {
  return state.products.currentCardIndex;
};

export const selectAllSubscribes = (state: RootState) => {
  return state.products.subscribes;
};

export const selectSubscribeId = (state: RootState) => {
  return state.products.selectedSubcribeId;
};

export const selectProductForBuy = (state: RootState) => {
  return state.products.selectedProductForBuy;
};
