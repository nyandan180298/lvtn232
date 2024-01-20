import { memo } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import routeConstants from 'route/routeConstant';
import UserService from 'services/userService';
import Inner from 'view/Register/Inner';

const Wrapper = memo((props) => {
    const navigate = useNavigate();
    const handleRegister = useCallback(
        async data => {
            const register = await UserService.create(data);
            if (register.isSuccess) {
                navigate(routeConstants.MAIN);
            }
            return register;
        },
        [navigate]
    );

    return <Inner {...props} handleRegister={handleRegister}/>;
});
Wrapper.displayName = 'Register';

const Register = Wrapper;

export default Register;
