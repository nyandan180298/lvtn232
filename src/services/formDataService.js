import ApiBase from 'modules/apis/apiBase';

const _FORM_DATA_PATH = '/forms/data';
class FormDataService extends ApiBase {
    /**
     * insert data to observation
     * @param {string} encounterUid
     * @param {string} formName
     * @param {object} requestBody
     * @returns
     */
    create = (encounterUid, formName, requestBody) => {
        const url = `${_FORM_DATA_PATH}/v2/insert/${encounterUid}/${formName}`;
        const res = this.post(url, requestBody);
        return res;
    };

    /**
     * get form data
     * @param {string} encounterUid
     * @param {string} formName
     * @param {number} ordinal
     * @returns
     */
    detail = (encounterUid, formName, ordinal = 0) => {
        const url = `${_FORM_DATA_PATH}/details/${encounterUid}/${formName}`;
        const options = {
            params: {
                ordinal,
            },
        };
        const res = this.get(url, options);
        return res;
    };

    matrix = (requestBody, options) => {
        const url = `${_FORM_DATA_PATH}/matrix`;
        const res = this.post(url, requestBody, options);
        return res;
    };

    submitV2 = (requestBody, visitId, formName) => {
        const url = `${_FORM_DATA_PATH}/v2/insert/${visitId}/${formName}`;
        return this.post(url, requestBody);
    };
}

export default new FormDataService();
