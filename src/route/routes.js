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
        name: 'CustomerKho',
        path: routeConstants.CUSTOMERKHO,
        Component: Loadable({
            loading: LoadingScreen,
            loader: () => import('view/customer/CustomerKho'),
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
        name: 'ConfirmEmail',
        path: routeConstants.CONFIRM_EMAIL,
        Component: Loadable({
            loading: LoadingScreen,
            loader: () => import('view/ConfirmEmail'),
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
                name: 'KhoSanPham',
                path: routeConstants.KHOSANPHAM,
                Component: Loadable({
                    loading: LoadingScreen,
                    loader: () => import('view/client/ChonKho'),
                }),
            },
            {
                name: 'Logout',
                path: routeConstants.LOGOUT,
                Component: Loadable({
                    loading: LoadingScreen,
                    loader: () => import('view/Logout'),
                }),
            },
            {
                name: 'KhoSanPham_Detail',
                path: routeConstants.KHOSANPHAM_DETAIL,
                Component: Loadable({
                    loading: LoadingScreen,
                    loader: () => import('view/client/KhoSanPham'),
                }),
            },
            {
                name: 'NguonNhap',
                path: routeConstants.NGUONNHAP,
                Component: Loadable({
                    loading: LoadingScreen,
                    loader: () => import('view/client/NguonNhap'),
                }),
            },
            {
                name: 'Customer',
                path: routeConstants.CUSTOMER,
                Component: Loadable({
                    loading: LoadingScreen,
                    loader: () => import('view/client/Customer'),
                }),
            },
            {
                name: 'Order',
                path: routeConstants.ORDER,
                Component: Loadable({
                    loading: LoadingScreen,
                    loader: () => import('view/client/Order'),
                }),
            },
            {
                name: 'Noti',
                path: routeConstants.NOTI,
                Component: Loadable({
                    loading: LoadingScreen,
                    loader: () => import('view/client/Noti'),
                }),
            },
        ],
    },
];

export default routes;
