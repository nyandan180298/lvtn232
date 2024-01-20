import { useSelector } from 'react-redux';
import { storeFunc } from 'store/Store';
import { tokenActions } from 'reducers/token';

export const setToken = token => {
    storeFunc.dispatch(tokenActions.SET_TOKEN, token);
};

export const getToken = () => {
    return storeFunc.getState()?.token?.access_token;
};

export const useToken = () => {
    return useSelector(state => state?.token?.access_token);
};
