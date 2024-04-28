import ApiBase from 'modules/apis/apiBase';
const _OAUTH_PATH = '/user';
const _USER_PATH = '/user';

class UserService extends ApiBase {
    login = requestBody => {
        const url = `${_OAUTH_PATH}/login`;
        const res = this.post(url, requestBody);
        return res;
    };

    logout = () => {
        const url = `${_OAUTH_PATH}/logout`;
        const res = this.post(url);
        return res;
    };

    create = requestBody => {
        const url = `${_USER_PATH}/create`;
        const res = this.post(url, requestBody);
        return res;
    };

    me = () => {
        const url = `${_USER_PATH}/get_me`;
        return this.get(url);
    };

    update_password = requestBody => {
        const url = `${_USER_PATH}/password/update`;
        return this.put(url, requestBody);
    };

    forgot_password = requestBody => {
        const url = `${_OAUTH_PATH}/password/forgot`;
        const res = this.post(url, requestBody);
        // { bodyType: BodyType.FORM_DATA }
        return res;
    };

    reset_password = requestBody => {
        const url = `${_OAUTH_PATH}/password/reset`;
        const res = this.post(url, requestBody);
        return res;
    };
}

// eslint-disable-next-line
export default new UserService();
