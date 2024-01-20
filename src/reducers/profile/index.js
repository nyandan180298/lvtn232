import profileSlice from 'reducers/profile/reducer';
import * as extendedActions from 'reducers/profile/actions';

const { actions, reducer } = profileSlice;

export const profileActions = {
   ...actions,
   ...extendedActions,
};

export default reducer;

