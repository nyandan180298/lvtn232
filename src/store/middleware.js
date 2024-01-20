const commonMiddleware = _store => next => action => {
    // handle storage middleware here
    // set token / remove token ...
    return next(action);
};

const middleware = [commonMiddleware];

export default middleware;
