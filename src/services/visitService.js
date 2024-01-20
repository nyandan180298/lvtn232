import ApiBase from 'modules/apis/apiBase';
import { BodyType } from 'modules/apis/config';

const _VISIT_PATH = '/visits';
class VisitService extends ApiBase {
    create = requestBody => {
        const url = `${_VISIT_PATH}/create`;
        const res = this.post(url, requestBody);
        return res;
    };

    detail = uid => {
        const url = `${_VISIT_PATH}/get`;
        return this.get(url, { params: { uid } });
    };

    matrix = requestBody => {
        const url = `${_VISIT_PATH}/matrix`;
        return this.post(url, requestBody);
    };

    update = requestBody => {
        const url = `${_VISIT_PATH}/update`;
        return this.post(url, requestBody);
    };

    attachments = requestBody => {
        const url = `${_VISIT_PATH}/attachments`;
        return this.post(url, requestBody, { bodyType: BodyType.FORM_DATA });
    };
}
export default new VisitService();
