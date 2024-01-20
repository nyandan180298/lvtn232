import { AppDispatch } from 'store/type';
import { getResponse, IResponse } from 'modules/apis/Response';
import { dispatch } from 'store/Store';
import { forEach, isObject, isArray, get, snakeCase } from 'lodash';
import { BodyType, DEFAULT_BODY_TYPE } from 'modules/apis/config';

export type FetchMethod =
    | 'get'
    | 'GET'
    | 'delete'
    | 'DELETE'
    | 'head'
    | 'HEAD'
    | 'options'
    | 'OPTIONS'
    | 'post'
    | 'POST'
    | 'put'
    | 'PUT'
    | 'patch'
    | 'PATCH'
    | 'purge'
    | 'PURGE'
    | 'link'
    | 'LINK'
    | 'unlink'
    | 'UNLINK';

export type HandleErrorType = (res: any, config?: any) => boolean;

const ROOT_API = 'http://13.215.104.66:13001';

const _commonErrorHandler = (response: IResponse, options: any) => {
    switch (response.errorCode) {
        default:
            return false;
    }
};

const handleFetch = async (
    url: string,
    options: any,
    customErrorHandler?: (res: any, config?: any) => boolean
): Promise<IResponse> => {
    try {
        let response = await fetch(url, options);
        let jsonData = await response.json();
        let body = getResponse(jsonData);
        if (customErrorHandler && !body.isSuccess) {
            const notHasError = customErrorHandler(body, options);
            if (notHasError) {
                return body;
            }
        }
        _commonErrorHandler(body, options);
        return body;
    } catch (error) {
        let response = getResponse(error);
        _commonErrorHandler(response, options);
        return response;
    }
};

const createParams = (data: Object) => {
    let array = [] as string[];
    Object.keys(data).forEach((key: string) => {
        array.push(`${key}=${get(data, key, '')}`);
    });
    if (array.length) {
        return '?' + array.join('&');
    }
    return '';
};

const prepareData = (response: any): any => {
    let result = null as any;
    if (isArray(response)) {
        result = response.map((item: any) => prepareData(item));
    } else if (isObject(response)) {
        result = {};
        forEach(response, (value, key) => {
            if (key === 'file') {
                result[key] = value;
            } else {
                result[snakeCase(key)] = prepareData(value);
            }
        });
    } else {
        result = response;
    }
    return result;
};

const createBody = (data: Object, type: string = DEFAULT_BODY_TYPE) => {
    switch (type) {
        case BodyType.JSON:
            return JSON.stringify(data);
        case BodyType.FORM_DATA:
            let formData = new FormData();
            Object.keys(data).forEach((key: string) => {
                formData.append(key, get(data, key, ''));
            });
            return formData;
        default:
            return data;
    }
};

const create = (
    method: string,
    options: any,
    customErrorHandler?: HandleErrorType
) => {
    const { url, data = {}, authorization, bodyType, ...restOptions } = options;

    const abortController = new AbortController();
    restOptions.signal = abortController.signal;
    restOptions.method = method;
    if (authorization) {
        restOptions.headers = {
            ...restOptions.headers,
            // Authorization: `Bearer ${tokenUtil.getAccessToken()}`,
        };
    }

    if (bodyType === BodyType.JSON) {
        restOptions.headers = {
            ...restOptions.headers,
            'Content-Type': 'application/json',
        };
    }

    let params = '';
    let preparedData = prepareData(data);

    switch (method) {
        case 'POST':
        case 'post':
        case 'PUT':
        case 'put':
            restOptions.body = createBody(preparedData, bodyType);
            break;
        case 'DELETE':
        case 'delete':
        case 'GET':
        case 'get':
            params = data ? createParams(preparedData) : '';
            break;
        default:
            break;
    }
    const caller = () =>
        handleFetch(ROOT_API + url + params, restOptions, customErrorHandler);
    const canceler = () => abortController.abort();
    return { caller, canceler };
};

const send = (request: Function, dispatcher: AppDispatch = dispatch) => {
    return request(dispatcher);
};

export const api = {
    create,
    send,
};
