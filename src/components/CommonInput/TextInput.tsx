import { Input } from 'antd';
import { FC, useCallback, memo } from 'react';
import { IInputProps } from './type';

const TextInput: FC<IInputProps> = memo(
    ({ value, onChange, options, addonBefore, addonAfter, ...props }) => {
        const handleChange = useCallback(
            (e: any) => {
                onChange && onChange(e.target.value);
            },
            [onChange]
        );

        return (
            <Input
                {...props}
                type="text"
                value={value}
                onChange={handleChange}
            />
        );
    }
);

export default TextInput;
