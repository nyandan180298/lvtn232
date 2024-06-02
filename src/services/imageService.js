import ApiBase from "modules/apis/apiBase";

const _IMG_PATH = "/image";
class ImageService extends ApiBase {
  remove = (filepath) => {
    const url = `${_IMG_PATH}/delete/${filepath}`;
    return this.delete(url);
  };
}
// eslint-disable-next-line
export default new ImageService();
