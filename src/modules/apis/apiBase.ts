import { forEach, isArray, isObject } from 'lodash';
import { BodyType, DEFAULT_BODY_TYPE } from 'modules/apis/config';
import { getResponse, IResponse } from 'modules/apis/Response';
import { getToken } from 'reducers/token/function';
import { toSnakeCase } from 'utils/function';

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
                result[toSnakeCase(key)] = prepareData(value);
            }
        });
    } else {
        result = response;
    }
    return result;
};

class ApiBase {
    private _baseUrl = 'http://13.215.104.66:16001';

    get(url: string, options: any = {}) {
        return this.call(url, {
            ...options,
            method: 'GET',
        });
    }

    post = (url: string, body: any, options: any = {}) => {
        const _body = this.createBody(body, options.bodyType || DEFAULT_BODY_TYPE);
        return this.call(url, {
            ...options,
            body: _body ? _body : undefined,
            method: 'POST',
        });
    };

    put = (url: string, body: any, options: any = {}) => {
        const _body = this.createBody(body, options.bodyType || DEFAULT_BODY_TYPE);
        return this.call(url, {
            ...options,
            body: _body ? _body : undefined,
            method: 'PUT',
        });
    };

    delete = (url: string, options: any = {}) => {
        return this.call(url, {
            ...options,
            method: 'DELETE',
        });
    };

    call = async (pathUrl: string, rawOptions: any) => {
        let url = this._baseUrl + pathUrl;
        if (rawOptions.params) {
            const paramsString = new URLSearchParams(
                rawOptions.params
            ).toString();
            url = url + '?' + paramsString;
        }
        try {
            const options = this.createHeader(rawOptions);
            let response = await fetch(url, {
                ...options,
            });
            const jsonData = await response.json();
            const data: IResponse = getResponse(jsonData);
            if (!data.isSuccess) {
                return this.handleError(data);
            }
            return data;
        } catch (error) {
            const response = getResponse(error);
            return this.handleError(response);
        }
    };

    createBody = (data: any, type: string) => {
        let formattedData = prepareData(data);
        switch (type) {
            case BodyType.JSON:
                return JSON.stringify(formattedData);
            case BodyType.FORM_DATA: {
                // eslint-disable-next-line no-case-declarations
                let formData = new FormData();
                Object.keys(formattedData).forEach((key: string) => {
                    formData.append(key, formattedData[key] || '');
                });
                return formData;
            }
            default:
                return data;
        }
    };

    createHeader = (options: any) => {
        if (!options.headers) {
            options.headers = { 'Content-Type': 'application/json' };
        }
        const token = getToken();
        if (token) {
            options.headers.Authorization = `Bearer ${token}`;
        }
        return options;
    };

    handleError = (error: IResponse) => {
        return error;
    };
}

export default ApiBase;
