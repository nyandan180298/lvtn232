import React from 'react';
import { FormName, formNameType } from 'enums/FormName';
import _forEach from 'lodash/forEach';
interface IMenuItem {
    id: string;
    label: string;
    children?: IMenuItem[];
    icon?: React.ReactComponentElement<any>;
    name?: formNameType;
}
export const leftMenuDefinitions = [
    {
        id: 'row-1',
        label: `Thông tin`,
        name: FormName.thong_tin,
    },
    {
        id: `row-2`,
        label: 'Thông tin trước nhập viện',
        name: FormName.thong_tin_truoc_nhap_vien,
    },
    {
        id: `row-3`,
        label: 'Dữ liệu khoa cấp cứu',
        name: FormName.du_lieu_khoa_cap_cuu,
    },
] as IMenuItem[];

export const getComponent = (
    path: string,
    arr: IMenuItem[] = leftMenuDefinitions
): IMenuItem | null => {
    let result = null as IMenuItem | null;
    _forEach(arr, value => {
        if (result) return;
        if (value.name === path) {
            result = value;
        } else if (value.children) {
            result = getComponent(path, value.children) || result;
        }
    });
    return result;
};
