import khoSlice from "reducers/kho/reducer";

const { actions, reducer } = khoSlice;

export const khoActions = {
   ...actions,
}

export default reducer;