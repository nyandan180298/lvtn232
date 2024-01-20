import profileReducer from "reducers/profile"
import settingReducer from "reducers/setting"
import localeReducer from "reducers/locale"
import tokenReducer from "reducers/token"

const reducers = {
   profile: profileReducer,
   setting: settingReducer,
   locale: localeReducer,
   token: tokenReducer
}

export default reducers;