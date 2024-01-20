import tokenSlice from "reducers/token/reducer";
// import * as extendedActions from "reducers/setting/actions";

const { actions, reducer } = tokenSlice;

export const tokenActions = {
   ...actions,
   // ...extendedActions,
}

export default reducer;