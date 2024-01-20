import localeSlice from "reducers/locale/reducer";
// import * as extendedActions from "reducers/locale/actions";

const { actions, reducer } = localeSlice;

export const localeActions = {
   ...actions,
   // ...extendedActions,
}

export default reducer;