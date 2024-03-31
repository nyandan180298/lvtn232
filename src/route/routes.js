import LoadingScreen from 'view/LoadingScreen/LoadingScreen';
import Loadable from 'react-loadable';
import routeConstants from 'route/routeConstant';

const routes = [
    {
        name: 'Homepage',
        path: routeConstants.HOME,
        Component: Loadable({
            loading: LoadingScreen,
            loader: () => import('view/client/Homepage'),
        }),
    },
    {
        name: 'About',
        path: routeConstants.ABOUT,
        Component: Loadable({
            loading: LoadingScreen,
            loader: () => import('view/client/Homepage'),
        }),
    },
    {
        name: 'Contact',
        path: routeConstants.CONTACT,
        Component: Loadable({
            loading: LoadingScreen,
            loader: () => import('view/client/Homepage'),
        }),
    },
    {
        name: 'Login',
        path: routeConstants.LOGIN,
        Component: Loadable({
            loading: LoadingScreen,
            loader: () => import('view/Login'),
        }),
    },
    {
        name: 'Register',
        path: routeConstants.REGISTER,
        Component: Loadable({
            loading: LoadingScreen,
            loader: () => import('view/Register'),
        }),
    },
    {
        name: 'MainLayout',
        path: routeConstants.MAIN,
        Component: Loadable({
            loading: LoadingScreen,
            loader: () => import('view/client/MainLayout'),
        }),
        authorization: true,
        childRoutes: [
            {
                name: 'Logout',
                path: routeConstants.LOGOUT,
                Component: Loadable({
                    loading: LoadingScreen,
                    loader: () => import('view/Logout'),
                }),
            },
            {
                name: 'KhoSanPham',
                path: routeConstants.KHOSANPHAM,
                Component: Loadable({
                    loading: LoadingScreen,
                    loader: () => import('view/client/KhoSanPham'),
                }),
            },
        ],
    },
];

export default routes;
