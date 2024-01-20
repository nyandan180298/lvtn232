import { createSlice } from '@reduxjs/toolkit';
import { pending, success } from 'store/common';
import { LOGIN } from 'reducers/profile/actions';
import { profileName } from 'reducers/constant';

const initialState = {};

const profileSlice = createSlice({
    name: profileName,
    initialState,
    reducers: {
        SET_PROFILE: (state, { payload }) => {
            return payload;
        },
        UPDATE_PROFILE: (state, { payload }) => {
            return {
                ...state,
                ...payload,
            };
        },
        RESET_PROFILE: () => {
            return initialState;
        },
        [success(LOGIN.action)]: (state, { payload }) => {
            return {
                ...state,
                ...payload,
            };
        },
        [pending(LOGIN.action)]: state => {
            state.loading = true;
        },
    },
});

export default profileSlice;
