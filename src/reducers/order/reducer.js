import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    SET_ORDER: (state, { payload }) => {
      return { ...state, products: payload };
    },
    UPDATE_PRODUCT: (state, { payload }) => {
      const newData = [...state.products, payload];
      const uniqueData = [
        ...new Set(newData.map((item) => JSON.stringify(item))),
      ].map((item) => JSON.parse(item));
      return { ...state, products: uniqueData };
    },
    REMOVE_PRODUCT: (state, { payload }) => {
        return {...state, products: state.products.filter((product) => product!== payload) };
      },
    RESET_ORDER: () => {
      return initialState;
    },
  },
});

export default orderSlice;
