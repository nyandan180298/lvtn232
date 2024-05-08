import orderSlice from "reducers/order/reducer";

const { actions, reducer } = orderSlice;

export const orderActions = {
   ...actions,
}

export default reducer;