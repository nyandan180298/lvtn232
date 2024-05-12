import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import routeConstants from "route/routeConstant";
import userService from "services/userService";
import Inner from "view/ConfirmEmail/Inner";

const Wrapper = memo((props) => {
  const navigate = useNavigate();
  const handleConfirmEmail = useCallback(
    async (data) => {
      const confirm_email = await userService.confirm_email(data);
      if (confirm_email.isSuccess) {
        navigate(routeConstants.LOGIN);
      }
      return confirm_email;
    },
    [navigate]
  );
  return <Inner {...props} handleConfirmEmail={handleConfirmEmail} />;
});
Wrapper.displayName = "ConfirmEmail";

const ConfirmEmail = Wrapper;

export default ConfirmEmail;
