import { memo, useEffect } from 'react';
import { setToken } from 'reducers/token/function';
import UserService from 'services/userService';

const Wrapper = memo(props => {
    useEffect(() => {
        UserService.logout().finally(() => setToken(''));
    }, []);

    return <div> Logout </div>;
});
Wrapper.displayName = 'Logout';

const Logout = Wrapper;

export default Logout;
