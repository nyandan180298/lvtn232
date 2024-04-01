import { useSelector } from 'react-redux';
import { storeFunc } from 'store/Store';
import { khoActions } from '.';

export const setKho = kho => {
    storeFunc.dispatch(khoActions.SET_KHO, kho);
};

export const getKho = () => {
    return storeFunc.getState()?.kho?.data;
};

export const useKho = () => {
    return useSelector(state => state?.kho?.data);
};
