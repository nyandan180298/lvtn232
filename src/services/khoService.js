import ApiBase from "modules/apis/apiBase";

const _KHO_PATH = "/kho";
class KhoService extends ApiBase {
  create = (requestBody) => {
    const url = `${_KHO_PATH}/create`;
    const res = this.post(url, requestBody);
    return res;
  };

  detail = (id) => {
    const url = `${_KHO_PATH}/get/${id}`;
    return this.get(url);
  };

  update = (requestBody) => {
    const url = `${_KHO_PATH}/update/${requestBody.id}`;
    return this.post(url, requestBody);
  };
}

// eslint-disable-next-line
export default new KhoService();
