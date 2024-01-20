import ApiBase from 'modules/apis/apiBase';

const _FORM_BUILDER_PATH = '/forms/builder';
class FormBuilderService extends ApiBase {
    /**
     * detail form builder
     * @param {string} name
     * @returns
     */
    detail = (name, options = {}) => {
        const url = `${_FORM_BUILDER_PATH}/details/${name}`;
        const res = this.get(url, options);
        return res;
    };
}

export default new FormBuilderService();
