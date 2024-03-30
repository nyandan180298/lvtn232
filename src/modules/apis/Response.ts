import { forEach, isArray, isObject } from 'lodash';
import ActionAPI from 'modules/actions/ActionAPI';
import { AppDispatch } from 'store/type';
import { toCamelCase } from 'utils/function';

export interface IResponse {
    isSuccess: boolean;
    errorCode?: number;
    message?: string;
    data?: any;
    total?: number;
    page?: number;
    totalPage?: number;
}

class ResponseModel implements IResponse {
    isSuccess = false;
    errorCode = 0;
    message = '';
    data = null;
    total = 0;
    page = 0;
    totalPage= 0;
}

const prepareResponse = (response: any): any => {
    let result = null as any;
    if (isArray(response)) {
        result = response.map((item: any) => prepareResponse(item));
    } else if (isObject(response)) {
        result = {};
        forEach(response, (value: any, key: string) => {
            result[toCamelCase(key)] = prepareResponse(value);
        });
    } else {
        result = response;
    }
    return result;
};

export const getResponse = (
    responseBody: any,
    error?: Error | string
): IResponse => {
    let response = new ResponseModel();
    response.isSuccess = responseBody?.error_code === 0;
    response.errorCode = responseBody?.error_code || 0;
    response.message = responseBody?.message || '';
    response.data = prepareResponse(responseBody?.data);
    response.page = responseBody?.page;
    response.total = responseBody?.total;
    response.totalPage = responseBody?.totalPage;
    if (error) {
        response.message = String(error);
    }
    return response;
};

class Response {
    public static catchError = (
        dispatch: AppDispatch,
        action: ActionAPI,
        error: Error
    ) => {
        dispatch(Response.onError(action)(getResponse(error)));
    };

    // public static dispatchError = (
    //     dispatch: AppDispatch,
    //     action: string,
    // ) => (res: IResponse) => {
    //     dispatch(Response.onError(action)(res));
    // }

    public static dispatchResponse =
        (dispatch: AppDispatch, action: ActionAPI) => (res: IResponse) => {
            if (res.isSuccess) {
                dispatch(Response.onSuccess(action)(res));
            } else {
                dispatch(Response.onFail(action)(res));
            }
        };

    private static onSuccess = (action: ActionAPI) => (res: IResponse) => {
        return action.createSuccessAction(res);
    };

    private static onFail = (action: ActionAPI) => (res: IResponse) => {
        return action.createFailAction(res);
    };

    private static onError = (action: ActionAPI) => (res: IResponse) => {
        return action.createRejectedAction(res);
    };
}

export default Response;
