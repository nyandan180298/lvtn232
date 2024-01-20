import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   resource: {},
   namespace: "",
};

const localeSlice = createSlice({
   name: "locale",
   initialState,
   reducers: {
      STORE_LOCALE_DATA: (state, { payload }) => {
         return {
            ...state,
            ...payload,
         };
      },
      RESET_LOCALE_DATA: (state) => {
         return {
            ...state,
         };
      },
      SET_LANGUAGE: (state, { payload }) => {
         return {
            ...state,
            language: payload,
         };
      },
   }
});

export default localeSlice;
