import { createSlice } from '@reduxjs/toolkit';
import { tokenName } from 'reducers/constant';

const initialState = {
    access_token: '',
};

const tokenSlice = createSlice({
    name: tokenName,
    initialState,
    reducers: {
        SET_TOKEN: (state, { payload }) => {
            return {
                access_token: payload,
            };
        },
        UPDATE_TOKEN: (state, { payload }) => {
            return {
                ...state,
                ...payload,
            };
        },
        RESET_TOKEN: () => {
            return initialState;
        },
    },
});

export default tokenSlice;
