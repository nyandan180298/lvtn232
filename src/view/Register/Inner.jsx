import { memo, useState, useCallback, useEffect } from "react";
import Message from "components/Message";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import TextInput from "components/CommonInput/TextInput";
import PasswordInput from "components/CommonInput/PasswordInput";

const Inner = memo(({ handleRegister }) => {
  const [usernameEmpty, setUsernameEmpty] = useState();
  const [emailEmpty, setEmailEmpty] = useState();
  const [passwordEmpty, setPasswordEmpty] = useState();
  const [firstNameEmpty, setFirstNameEmpty] = useState();
  const [lastNameEmpty, setLastNameEmpty] = useState();

  const [username, setUsername] = useState();
  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();
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

  const handleBlurFirstName = useCallback((e) => {
    if (e.target.value) {
      setFirstNameEmpty(false);
    } else {
      setFirstNameEmpty(true);
    }
  }, []);

  const handleBlurLastName = useCallback((e) => {
    if (e.target.value) {
      setLastNameEmpty(false);
    } else {
      setLastNameEmpty(true);
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
      uid: username,
      username: username,
      password: password,
      confirm_password: password,
      email: email,
      first_name: firstname,
      last_name: lastname,
    }).then((data) => {
      if (data.isSuccess) {
        Message.sendSuccess("Đăng ký thành công");
        navigate("/", { replace: true });
      } else {
        Message.sendError(`${data.message}`);
      }
    });
  }, [
    handleRegister,
    navigate,
    password,
    passwordCheck,
    username,
    email,
    lastname,
    firstname,
  ]);

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
              <span>Vui lòng nhập username</span>
            </div>
          )}
          <div className="login-semi-title">Họ và tên</div>
          <div className="ho-ten-div">
            <div className="ho-div">
              <TextInput
                className="register-text-input"
                placeholder="Họ"
                onBlur={handleBlurFirstName}
                onChange={(e) => setFirstName(e)}
                name="first_name"
                required
                id="first_name"
              />
              {firstNameEmpty && (
                <div className="invalid-feedback">
                  <span>Vui lòng nhập họ</span>
                </div>
              )}
            </div>
            <div className="ten-div">
              <TextInput
                className="register-text-input"
                placeholder="Tên"
                onBlur={handleBlurLastName}
                onChange={(e) => setLastName(e)}
                name="last_name"
                required
                id="last_name"
              />
              {lastNameEmpty && (
                <div className="invalid-feedback">
                  <span>Vui lòng nhập tên</span>
                </div>
              )}
            </div>
          </div>

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
              <span>Vui lòng nhập password</span>
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
              <span>Vui lòng nhập password</span>
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
              <span>Vui lòng nhập email</span>
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
        <img src={"login-removebg.png"} alt="Web Logo" height={790} />
      </div>
    </div>
  );
});

export default Inner;
