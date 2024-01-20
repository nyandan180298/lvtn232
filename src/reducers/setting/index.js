import settingSlice from "reducers/setting/reducer";
// import * as extendedActions from "reducers/setting/actions";

const { actions, reducer } = settingSlice;

export const settingActions = {
   ...actions,
   // ...extendedActions,
}

export default reducer;