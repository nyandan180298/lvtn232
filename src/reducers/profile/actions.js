import ActionAPI from "modules/actions/ActionAPI";
import { profileName } from "reducers/constant";

export const LOGIN = ActionAPI.create({
   action: "LOGIN",
   reducer: profileName,
});