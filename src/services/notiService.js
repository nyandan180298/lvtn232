import ApiBase from "modules/apis/apiBase";

const _NOTI_PATH = "/notification";
class NotiService extends ApiBase {
  getAll = (requestBody, options) => {
    const url = `${_NOTI_PATH}/getAll`;
    return this.post(url, requestBody, options);
  };

  read = (requestBody) => {
    const url = `${_NOTI_PATH}/read/${requestBody.id}`;
    return this.post(url, requestBody);
  };

  readAll = (requestBody) => {
    const url = `${_NOTI_PATH}/readAll/`;
    return this.post(url, requestBody);
  };
}

// eslint-disable-next-line
export default new NotiService();
