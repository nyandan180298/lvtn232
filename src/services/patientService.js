import ApiBase from 'modules/apis/apiBase';

const _PATIENT_PATH = '/subjects';
class PatientService extends ApiBase {
    create = requestBody => {
        const url = `${_PATIENT_PATH}/create`;
        const res = this.post(url, requestBody);
        return res;
    };

    detail = uid => {
        const url = `${_PATIENT_PATH}/details/${uid}`;
        return this.get(url);
    };

    matrix = (requestBody, options) => {
        const url = `${_PATIENT_PATH}/matrix`;
        return this.post(url, requestBody, options);
    };

    update = requestBody => {
        const url = `${_PATIENT_PATH}/update/${requestBody.uid}`;
        return this.post(url, requestBody);
    };
}

export default new PatientService();
