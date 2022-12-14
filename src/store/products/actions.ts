import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { Code, Subscribe } from "../../types";
import { AppDispatch, RootState } from "../store";
import { ChangeProductRes } from "./types";
import Api from "../../api";

export const buyProduct = createAsyncThunk<
  void,
  undefined,
  { state: RootState }
>("user/buyProduct", async (_, { getState }) => {
  const { selectedProductForBuy } = getState().products;
  const res = await Api.post(`payments/buy`, {
    priceId: selectedProductForBuy,
  });
  console.log(res);
});

export const activateHoldedCodes = createAsyncThunk<
  void,
  { selectedCodes: number[]; subscribeId: number },
  { dispatch: AppDispatch }
>("products/activateHoldedCodes", async (args, { dispatch }) => {
  let res;
  const payload = {
    codeIds: args.selectedCodes,
    subscribeId: args.subscribeId,
  };
  try {
    res = await Api.put(`code/manage`, payload);
    console.log(res);
    dispatch(getSubscribes());
  } catch (error) {
    console.log(error);
  }
});

export const getSubscribes = createAsyncThunk<
  Subscribe[],
  undefined,
  { rejectValue: string }
>("products/getSubscribes", async (_, { rejectWithValue }) => {
  const res: AxiosResponse<{ data: Subscribe[] }> = await Api.get(
    `subscribe/self`
  );
  if (!res.data) {
    return rejectWithValue("Error");
  }
  const sortedData = res.data.data.sort((a, b) => a._id - b._id);
  return sortedData;
});

export const activateCode = createAsyncThunk<
  Code,
  Code,
  { rejectValue: string }
>("products/activateCode", async (code, { rejectWithValue }) => {
  try {
    const res = await Api.post(`code/activate`, {
      code: code.code,
    });
    if (!res.data) {
      throw new Error("Server error");
    }
    return res.data.data;
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
  const { selectedSubcribeId, selectedProductForBuy } = getState().products;
  try {
    const res = await Api.post(`subscribe/change-product`, {
      productId: selectedProductForBuy,
      subscribeId: selectedSubcribeId,
    });
    return res.data;
  } catch {
    return rejectWithValue("Server error");
  }
});
