import ApiBase from "modules/apis/apiBase";

const _PRODUCT_PATH = "/product";
class ProductService extends ApiBase {
  create = (requestBody) => {
    const url = `${_PRODUCT_PATH}/create`;
    const res = this.post(url, requestBody);
    return res;
  };

  detail = (id) => {
    const url = `${_PRODUCT_PATH}/get/${id}`;
    return this.get(url);
  };

  getAll = (requestBody, options) => {
    const url = `${_PRODUCT_PATH}/getAll`;
    return this.post(url, requestBody, options);
  };

  update = (requestBody) => {
    const url = `${_PRODUCT_PATH}/update/${requestBody.id}`;
    return this.post(url, requestBody);
  };
}

export default new ProductService();
