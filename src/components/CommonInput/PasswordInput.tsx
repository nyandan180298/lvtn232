import { Input } from 'antd';
import { FC, useCallback, memo } from 'react';
import { IInputProps } from './type';

const PasswordInput: FC<IInputProps> = memo(
    ({ value, onChange, options, ...props }) => {
        const handleChange = useCallback(
            (e: any) => {
                onChange && onChange(e.target.value);
            },
            [onChange]
        );

        return (
            <Input.Password
                {...props}
                placeholder="Mật khẩu"
                value={value}
                addonAfter={null}
                addonBefore={null}
                onChange={handleChange}
                required={true}
            />
        );
    }
);

export default PasswordInput;
