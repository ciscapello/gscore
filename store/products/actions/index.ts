import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPI } from "../../../api";
import { Code, Subscribe } from "../../../types";
import { AppDispatch, RootState } from "../../store";
import { ChangeProductRes } from "../types";

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
  const res = await axiosAPI.post(
    `payments/buy`,
    { priceId: selectedProductForBuy },
    { headers: headers }
  );
  console.log(res);
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
  const res = await axiosAPI.put(
    `code/manage`,
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

  const res = await axiosAPI.get<Subscribe[]>(`subscribe/self`, {
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
    const res = await axiosAPI.post(`code/activate`, {
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
    const res = await axiosAPI.post(
      `subscribe/change-product`,
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
