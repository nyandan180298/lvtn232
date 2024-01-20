import { KeyboardEventHandler, ReactElement } from 'react';
import { generateId } from 'utils/function';

export interface ICommonProps {
    className?: string;
    indent?: number;
    addonBefore?: Array<Base> | ReactElement;
    addonAfter?: Array<Base> | ReactElement;
    disabled?: boolean;
    readOnly?: boolean;
    prefix?: any;
    suffix?: any;
    onKeyDown?: KeyboardEventHandler;
}

interface IRuleCommon {}

export interface IBaseProps {
    // _name: string;
    // _id: string;
    code?: string;
    props?: ICommonProps;
    rules?: IRuleCommon[];
    children?: Array<Base>;
}

export interface IBaseRequiredProps {
    _name: string;
    code?: string;
    props?: ICommonProps;
    rules?: IRuleCommon[];
    children?: Array<Base>;
}

export interface IBase {
    _id?: string;
    _name?: string;
    code?: string;
    props?: ICommonProps;
    rules?: IRuleCommon[];
    children?: Array<Base>;
}

class Base {
    _id: string;
    _name: string;
    props: ICommonProps;
    rules: IRuleCommon[];
    children: Array<Base>;
    code?: string;
    options?: any;

    constructor(props: IBaseRequiredProps) {
        this._id = generateId();
        this._name = props._name;
        this.props = props.props || {};
        this.rules = props.rules || [];
        this.children = props.children || [];
        this.code = props.code;
    }
}

export default Base;
