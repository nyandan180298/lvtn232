import ApiBase from "modules/apis/apiBase";

const _KHO_PATH = "/kho";
class KhoService extends ApiBase {
  detail = (id) => {
    const url = `${_KHO_PATH}/get/${id}`;
    return this.get(url);
  };
}

export default new KhoService();
