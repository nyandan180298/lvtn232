import { memo } from "react";
import { Button } from "antd";
import { useParams } from "react-router-dom";

const Inner = memo(({ handleConfirmEmail }) => {
  const { uid } = useParams();

  return (
    <div className="login-container">
      <div className="login-input-background">
        <div className="login-input-container">
          <div className="logo-container">
            <img
              src={"webicon_remove_background.png"}
              alt="Web Logo"
              height={150}
            />
          </div>
          <div className="register-title">Xác nhận email</div>
          <Button
            type="primary"
            className="login-button"
            onClick={() => {
              handleConfirmEmail({ id: uid });
            }}
            id="confirm-email"
          >
            Xác thực email
          </Button>
        </div>
      </div>
      <div className="login-picture-container">
        <img src={"login-removebg.png"} alt="Web Logo" height={790} />
      </div>
    </div>
  );
});

export default Inner;
