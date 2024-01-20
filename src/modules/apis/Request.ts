import ActionAPI from 'modules/actions/ActionAPI';
import { api, FetchMethod, HandleErrorType } from 'modules/apis/api';
import Response from 'modules/apis/Response';

interface IRequestConfig {
    url: string;
    method?: string;
}

class Request {
    public static post = (
        action: ActionAPI,
        config: IRequestConfig,
        customErrorHandler?: HandleErrorType
    ) => {
        return Request.init('POST', action, config, customErrorHandler);
    };

    public static get = (
        action: ActionAPI,
        config: IRequestConfig,
        customErrorHandler?: HandleErrorType
    ) => {
        return Request.init('GET', action, config, customErrorHandler);
    };

    public static delete = (
        action: ActionAPI,
        config: IRequestConfig,
        customErrorHandler?: HandleErrorType
    ) => {
        return Request.init('DELETE', action, config, customErrorHandler);
    };

    public static put = (
        action: ActionAPI,
        config: IRequestConfig,
        customErrorHandler?: HandleErrorType
    ) => {
        return Request.init('PUT', action, config, customErrorHandler);
    };

    static init = (
        method: FetchMethod,
        action: ActionAPI,
        config: IRequestConfig,
        customErrorHandler?: HandleErrorType
    ) => {
        const { caller, canceler } = api.create(
            method,
            config,
            customErrorHandler
        );

        return (dispatch: any): any => {
            dispatch(Request.onPending(action));

            try {
                caller().then(Response.dispatchResponse(dispatch, action));
            } catch (err: any) {
                Response.catchError(dispatch, action, err);
            }
            return canceler;
        };
    };

    private static onPending = (action: ActionAPI) => {
        return action.createPendingAction();
    };
}

export default Request;
