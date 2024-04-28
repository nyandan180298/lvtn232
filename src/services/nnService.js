import ApiBase from "modules/apis/apiBase";

const _NN_PATH = "/nguon-nhap";
class NnService extends ApiBase {
  create = (requestBody) => {
    const url = `${_NN_PATH}/create`;
    const res = this.post(url, requestBody);
    return res;
  };

  update = (requestBody) => {
    const url = `${_NN_PATH}/update/${requestBody.id}`;
    return this.post(url, requestBody);
  };

  detail = (id) => {
    const url = `${_NN_PATH}/get/${id}`;
    return this.get(url);
  };

  getAll = (requestBody, options) => {
    const url = `${_NN_PATH}/getAll`;
    return this.post(url, requestBody, options);
  };

  remove = (id) => {
    const url = `${_NN_PATH}/delete/${id}`;
    return this.delete(url);
  };
}

// eslint-disable-next-line
export default new NnService();
