import { ICommonProps } from './Base';
import { InputType } from 'enums/Input';
import React from 'react';

interface IOption {
    value: string;
    label: string;
    children?: Array<Object>;
}

export interface IInputProps extends ICommonProps {
    value: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    options?: Array<IOption>;
    suffixIcon?: React.ReactNode;
}

export interface ICommonInputProps extends IInputProps {
    className?: string;
    type: InputType;
}
