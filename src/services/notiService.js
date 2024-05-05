import ApiBase from "modules/apis/apiBase";

const _NOTI_PATH = "/noti";
class NotiService extends ApiBase {
  create = (requestBody) => {
    const url = `${_NOTI_PATH}/create`;
    const res = this.post(url, requestBody);
    return res;
  };

  detail = (id) => {
    const url = `${_NOTI_PATH}/get/${id}`;
    return this.get(url);
  };

  getAll = (requestBody, options) => {
    const url = `${_NOTI_PATH}/getAll`;
    return this.post(url, requestBody, options);
  };

  update = (requestBody) => {
    const url = `${_NOTI_PATH}/update/${requestBody.id}`;
    return this.post(url, requestBody);
  };

  remove = (id) => {
    const url = `${_NOTI_PATH}/delete/${id}`;
    return this.delete(url);
  };
}

// eslint-disable-next-line
export default new NotiService();
