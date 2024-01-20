export enum FormElement {
    ROW = 'row',
    COL = 'col',
    DATAITEM = 'dataitem',
    PAGE = 'page',
    REPEATABLE = 'repeatable',
}

export type FormElementType =
    | FormElement.ROW
    | FormElement.COL
    | FormElement.DATAITEM
    | FormElement.PAGE
    | FormElement.REPEATABLE;
