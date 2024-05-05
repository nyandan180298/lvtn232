import ApiBase from "modules/apis/apiBase";

const _CUSTOMER_PATH = "/customer";
class CustomerService extends ApiBase {
  create = (requestBody) => {
    const url = `${_CUSTOMER_PATH}/create`;
    const res = this.post(url, requestBody);
    return res;
  };

  detail = (id) => {
    const url = `${_CUSTOMER_PATH}/get/${id}`;
    return this.get(url);
  };

  getAll = (requestBody, options) => {
    const url = `${_CUSTOMER_PATH}/getAll`;
    return this.post(url, requestBody, options);
  };

  update = (requestBody) => {
    const url = `${_CUSTOMER_PATH}/update/${requestBody.id}`;
    return this.post(url, requestBody);
  };
}

// eslint-disable-next-line
export default new CustomerService();
