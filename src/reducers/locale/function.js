import { storeFunc } from "store/Store";
import { localeActions } from "./reducer";

export const setLanguage = lang => {
   storeFunc.dispatch(localeActions.SET_LANGUAGE, lang);
}

export const getLanguage = () => {
   return storeFunc.getState()?.locale?.language;
};

