import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: {},
};

const khoSlice = createSlice({
    name: 'kho',
    initialState,
    reducers: {
        SET_KHO: (state, { payload }) => {
            return {
                data: payload,
            };
        },
        UPDATE_KHO: (state, { payload }) => {
            return {
                ...state,
                ...payload,
            };
        },
        RESET_KHO: () => {
            return initialState;
        },
    },
});

export default khoSlice;
