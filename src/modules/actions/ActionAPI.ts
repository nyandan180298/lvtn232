import { IResponse } from 'modules/apis/Response';
import { success, pending, fail, rejected } from 'store/common';

interface IActionAPI {
    action: string;
    reducer: string;
}

class ActionAPI {
    action: string;
    reducer: string;

    constructor({ action, reducer }: IActionAPI) {
        this.action = action;
        this.reducer = reducer;
    }

    public static create = (props: IActionAPI) => {
        return new ActionAPI(props);
    };

    getName = () => {
        return `${this.reducer}/${this.action}`;
    };

    createSuccessAction = (response: IResponse) => {
        return {
            type: success(this.getName()),
            payload: response,
        };
    };

    createPendingAction = () => {
        return {
            type: pending(this.getName()),
        };
    };

    createFailAction = (error: IResponse) => {
        return {
            type: fail(this.getName()),
            payload: error,
        };
    };

    createRejectedAction = (error: IResponse) => {
        return {
            type: rejected(this.getName()),
            payload: error,
        };
    };
}

export default ActionAPI;
