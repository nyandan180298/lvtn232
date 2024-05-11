import { memo, useState, useCallback, useEffect } from "react";
import Message from "components/Message";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import TextInput from "components/CommonInput/TextInput";
import PasswordInput from "components/CommonInput/PasswordInput";

const errorMessages = {
  WITHOUT_NUMBER_ERROR: "Field password must contain number",
  WITHOUT_CHARACTER_ERROR: "Field password entirely numeric",
  WRONG_INPUT_ERROR: "Your username or password is not correct!",
  USERNAME_REQUIRED_ERROR: "Field username is required",
  PASSWORD_REQUIRED_ERROR: "Field password is required",
};

const Inner = memo(({ handleRegister }) => {
  const [usernameEmpty, setUsernameEmpty] = useState();
  const [emailEmpty, setEmailEmpty] = useState();
  const [passwordEmpty, setPasswordEmpty] = useState();

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();

  const navigate = useNavigate();
  const handleBlurUsername = useCallback((e) => {
    if (e.target.value) {
      setUsernameEmpty(false);
    } else {
      setUsernameEmpty(true);
    }
  }, []);

  const handleBlurEmail = useCallback((e) => {
    if (e.target.value) {
      setEmailEmpty(false);
    } else {
      setEmailEmpty(true);
    }
  }, []);

  const handleBlurPassword = useCallback((e) => {
    if (e.target.value) {
      setPasswordEmpty(false);
    } else {
      setPasswordEmpty(true);
    }
  }, []);

  const handleSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      Message.sendError("Hai lần nhập mật khẩu không khớp");
      return;
    }
    handleRegister({
      username: username,
      password: password,
      email: email,
    }).then((data) => {
      if (data.isSuccess) {
        Message.sendSuccess("Đăng ký thành công");
        navigate("/", { replace: true });
      } else {
        if (
          data.message === errorMessages.WITHOUT_CHARACTER_ERROR ||
          data.message === errorMessages.WITHOUT_NUMBER_ERROR
        ) {
          Message.sendError("Mật khẩu phải chứa số và kí tự!");
        } else if (data.message === errorMessages.WRONG_INPUT_ERROR) {
          Message.sendError("Tên đăng nhập hoặc mật khẩu không chính xác!");
        } else if (data.message === errorMessages.PASSWORD_REQUIRED_ERROR) {
          Message.sendError("Vui lòng điền mật khẩu!");
        } else if (data.message === errorMessages.USERNAME_REQUIRED_ERROR) {
          Message.sendError("Vui lòng điền tên đăng nhập!");
        } else {
          Message.sendError(`Người dùng ${username} đã tồn tại!`);
        }
      }
    });
  }, [handleRegister, navigate, password, passwordCheck, username, email]);

  useEffect(() => {
    var user = document.getElementById("username");
    user.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("login").click();
      }
    });
  }, []);

  useEffect(() => {
    var pass = document.getElementById("password");
    pass.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("login").click();
      }
    });
  }, []);

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
          <div className="register-title">Đăng ký</div>
          <div className="login-semi-title">Tên tài khoản</div>
          <TextInput
            className="register-text-input"
            placeholder="Tên đăng nhập"
            onBlur={handleBlurUsername}
            onChange={(e) => setUsername(e)}
            name="username"
            required
            id="username"
          />
          {usernameEmpty && (
            <div className="invalid-feedback">
              <span>Please enter username</span>
            </div>
          )}
          <div className="login-semi-title">Mật khẩu</div>
          <PasswordInput
            className="password-input"
            onBlur={handleBlurPassword}
            onChange={(e) => setPassword(e)}
            name="password"
            id="password"
          />
          {passwordEmpty && (
            <div className="invalid-feedback">
              <span>Please enter password</span>
            </div>
          )}
          <div className="login-semi-title">Nhập lại Mật khẩu</div>
          <PasswordInput
            className="password-input"
            onBlur={handleBlurPassword}
            onChange={(e) => setPasswordCheck(e)}
          />
          {passwordEmpty && (
            <div className="invalid-feedback">
              <span>Please enter password</span>
            </div>
          )}
          <div className="login-semi-title">Địa chỉ Email</div>
          <TextInput
            className="register-text-input"
            placeholder="Email"
            onBlur={handleBlurEmail}
            onChange={(e) => setEmail(e)}
            name="email"
            required
            id="email"
          />
          {emailEmpty && (
            <div className="invalid-feedback">
              <span>Please enter email</span>
            </div>
          )}
          <Button
            type="primary"
            className="login-button"
            onClick={handleSubmit}
            id="login"
          >
            Đăng ký
          </Button>
          <Button className="return-button" onClick={() => navigate(-1)}>
            Quay lại
          </Button>
        </div>
      </div>
      <div className="login-picture-container">
        <img
          src={"login-removebg.png"}
          alt="Web Logo"
          height={790}
        />
      </div>
    </div>
  );
});

export default Inner;
