import { memo } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import RouteElement from 'route/RouteElement';
import routes from 'route/routes';

const renderRoute = route => {
    const { name, path, Component, authorization, redirect, childRoutes } =
        route;
    return (
        <Route
            key={name}
            path={path}
            element={
                <RouteElement authorization={authorization} redirect={redirect}>
                    {Component && <Component />}
                </RouteElement>
            }
        >
            {childRoutes && childRoutes.map(renderRoute)}
        </Route>
    );
};

const RouteController = memo(() => {
    return (
        <HashRouter>
            <Routes>{routes.map(renderRoute)}</Routes>
        </HashRouter>
    );
});

export default RouteController;
