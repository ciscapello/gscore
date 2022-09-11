import { RootState } from "../store";

export const selectLoading = (state: RootState) => {
  return state.products.loading;
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