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
}

// eslint-disable-next-line
export default new NnService();
