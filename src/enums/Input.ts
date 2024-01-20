export enum Input {
    TEXT = 'TEXT',
    TEXTAREA = 'TEXTAREA',
    SELECT = 'SELECT',
    RADIO = 'RADIO',
    CHECKBOX = 'CHECKBOX',
    DATE = 'DATE',
    DATETIME = 'DATETIME',
    TIME = 'TIME',
    FILE = 'FILE',
    IMAGE = 'IMAGE',
    PASSWORD = 'PASSWORD',
    NUMBER = 'NUMBER',
    EMAIL = 'EMAIL',
}

export type InputType =
    | Input.TEXT
    | Input.TEXTAREA
    | Input.SELECT
    | Input.RADIO
    | Input.CHECKBOX
    | Input.DATE
    | Input.DATETIME
    | Input.TIME
    | Input.FILE
    | Input.IMAGE
    | Input.PASSWORD
    | Input.NUMBER
    | Input.EMAIL;
