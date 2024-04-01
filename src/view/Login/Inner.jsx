import { memo, useState, useCallback, useMemo, useEffect } from 'react';
import Message from 'components/Message';
import { Button } from 'antd';
import { useNavigate, NavLink } from 'react-router-dom';
import TextInput from 'components/CommonInput/TextInput';
import PasswordInput from 'components/CommonInput/PasswordInput';
import Checkbox from 'components/CommonInput/Checkbox';
import routeConstants from 'route/routeConstant';
import Logo from 'assets/Logo';
import LoginPicture from 'assets/LoginPicture';

const errorMessages = {
    WITHOUT_NUMBER_ERROR: 'Field password must contain number',
    WITHOUT_CHARACTER_ERROR: 'Field password entirely numeric',
    WRONG_INPUT_ERROR: 'Your username or password is not correct!',
    USERNAME_REQUIRED_ERROR: 'Field username is required',
    PASSWORD_REQUIRED_ERROR: 'Field password is required',
};

const Inner = memo(({ handleLogin }) => {
    const [usernameEmpty, setUsernameEmpty] = useState();
    const [passwordEmpty, setPasswordEmpty] = useState();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();
    const handleBlurUsername = useCallback((e) => {
        if (e.target.value) {
            setUsernameEmpty(false);
        } else {
            setUsernameEmpty(true);
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
        handleLogin({
            username: username,
            password: password,
        }).then((data) => {
            if (data.isSuccess) {
                Message.sendSuccess('Đăng nhập thành công');
                navigate('/chonkho', { replace: true });
            } else {
                if (
                    data.message === errorMessages.WITHOUT_CHARACTER_ERROR ||
                    data.message === errorMessages.WITHOUT_NUMBER_ERROR
                ) {
                    Message.sendError('Mật khẩu phải chứa số và kí tự!');
                } else if (data.message === errorMessages.WRONG_INPUT_ERROR) {
                    Message.sendError(
                        'Tên đăng nhập hoặc mật khẩu không chính xác!'
                    );
                } else if (
                    data.message === errorMessages.PASSWORD_REQUIRED_ERROR
                ) {
                    Message.sendError('Vui lòng điền mật khẩu!');
                } else if (
                    data.message === errorMessages.USERNAME_REQUIRED_ERROR
                ) {
                    Message.sendError('Vui lòng điền tên đăng nhập!');
                } else {
                    Message.sendError(`Người dùng ${username} không tồn tại!`);
                }
            }
        });
    }, [handleLogin, navigate, password, username]);

    const options = useMemo(
        () => [
            {
                label: 'Ghi nhớ',
                value: 'Nhớ mật khẩu',
                children: [],
            },
        ],
        []
    );

    useEffect(() => {
        var user = document.getElementById('username');
        user.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                document.getElementById('login').click();
            }
        });
    }, []);

    useEffect(() => {
        var pass = document.getElementById('password');
        pass.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                document.getElementById('login').click();
            }
        });
    }, []);

    return (
        <div className="login-container">
            <div className="login-input-background">
                <div className="login-input-container">
                    <div className="logo-container">
                        <Logo width={400} height={100} />
                    </div>
                    <div className="login-title">Đăng nhập</div>
                    <div className="login-semi-title">Tên tài khoản</div>
                    <TextInput
                        className="username-input"
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
                    <div className="checkbox-container">
                        <Checkbox
                            options={options}
                            style={{ display: 'none' }}
                        />
                        <NavLink
                            to={routeConstants.FORGOT_PASSWORD}
                            className="forgot-password-link"
                        >
                            Quên mật khẩu
                        </NavLink>
                    </div>
                    <Button
                        type="primary"
                        className="login-button"
                        onClick={handleSubmit}
                        id="login"
                    >
                        Đăng nhập
                    </Button>
                    <div className="login-register">
                        Bạn chưa có tài khoản? 
                        <NavLink
                            to={routeConstants.REGISTER}
                            className="register-link"
                        >
                            Đăng ký
                        </NavLink>
                    </div>
                    <Button
                        className="return-button"
                        onClick={() => navigate('/home')}
                    >
                        Trở về trang chủ
                    </Button>
                </div>
            </div>
            <div className="login-picture-container">
                <LoginPicture />
            </div>
        </div>
    );
});

export default Inner;
