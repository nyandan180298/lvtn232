import { useSelector } from 'react-redux';
import { storeFunc } from 'store/Store';
import { orderActions } from '.';

export const setOrder = order => {
    storeFunc.dispatch(orderActions.SET_ORDER, order);
};

export const updateOrderProduct = order => {
    storeFunc.dispatch(orderActions.UPDATE_PRODUCT, order);
};

export const removeOrderProduct = order => {
    storeFunc.dispatch(orderActions.REMOVE_PRODUCT, order);
};

export const resetOrder = order => {
    storeFunc.dispatch(orderActions.RESET_ORDER, order);
};

export const getOrder = () => {
    return storeFunc.getState()?.order?.products;
};

export const useOrder = () => {
    return useSelector(state => state?.order?.products);
};
