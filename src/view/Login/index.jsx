import { memo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, setToken } from 'reducers/token/function';
import routeConstants from 'route/routeConstant';
import UserService from 'services/userService';
import Inner from 'view/Login/Inner';

const Wrapper = memo(props => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = getToken();
        if (token) {
            navigate(routeConstants.MAIN, { replace: true });
        }
    }, [navigate]);
    const handleLogin = useCallback(
        async data => {
            const login = await UserService.login(data);
            if (login.isSuccess) {
                setToken(login.data.token.accessToken);
                navigate(routeConstants.MAIN);
            }
            return login;
        },
        [navigate]
    );

    return <Inner {...props} handleLogin={handleLogin} />;
});
Wrapper.displayName = 'Login';

const Login = Wrapper;

export default Login;
