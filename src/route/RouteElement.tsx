import React from 'react';
import { IResponse } from 'modules/apis/Response';
import { FC, memo, ReactComponentElement, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { setToken, useToken } from 'reducers/token/function';
import userService from 'services/userService';
import routeConstants from './routeConstant';
import { setKho } from 'reducers/kho/function';

interface IProps {
    children: ReactComponentElement<any>;
    authorization?: boolean;
    redirect?: string;
}

const RouteElement: FC<IProps> = memo(
    ({ children, authorization, redirect }) => {
        const [authorized, setAuthorized] = useState(false);
        const navigateFunc = useNavigate();
        const token = useToken();
        useEffect(() => {
            if (authorization) {
                if (token) {
                    userService.me().then((res: IResponse) => {
                        if (res.isSuccess) {
                            setKho(res.data.kho)
                            setAuthorized(true);
                        } else {
                            setToken('');
                            setAuthorized(false);
                            navigateFunc(routeConstants.LOGIN);
                        }
                    });
                } else {
                    setAuthorized(false);
                    navigateFunc(routeConstants.LOGIN);
                }
            } else {
                setAuthorized(true);
            }
        }, [authorization, navigateFunc, token]);

        if (redirect) {
            return <Navigate to={redirect} />;
        }
        return authorized ? children : null;
    }
);

export default RouteElement;
