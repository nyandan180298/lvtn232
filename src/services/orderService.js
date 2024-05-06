import ApiBase from "modules/apis/apiBase";

const _ORDER_PATH = "/order";
class OrderService extends ApiBase {
  create = (requestBody) => {
    const url = `${_ORDER_PATH}/create`;
    const res = this.post(url, requestBody);
    return res;
  };

  detail = (id) => {
    const url = `${_ORDER_PATH}/get/${id}`;
    return this.get(url);
  };

  getAll = (requestBody, options) => {
    const url = `${_ORDER_PATH}/getAll`;
    return this.post(url, requestBody, options);
  };

  update = (requestBody) => {
    const url = `${_ORDER_PATH}/update/${requestBody.id}`;
    return this.post(url, requestBody);
  };

  complete = (requestBody) => {
    const url = `${_ORDER_PATH}/complete/${requestBody.id}`;
    return this.post(url, requestBody);
  };  

  cancel = (requestBody) => {
    const url = `${_ORDER_PATH}/cancel/${requestBody.id}`;
    return this.post(url, requestBody);
  };

  remove = (id) => {
    const url = `${_ORDER_PATH}/delete/${id}`;
    return this.delete(url);
  };
}

// eslint-disable-next-line
export default new OrderService();
