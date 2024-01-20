import { Input } from 'antd';
import { FC, useCallback, memo } from 'react';
import { IInputProps } from './type';

const Textarea: FC<IInputProps> = memo(({ value, onChange, ...props }) => {
    const handleChange = useCallback(
        (e: any) => {
            onChange && onChange(e.target.value);
        },
        [onChange]
    );

    return <Input.TextArea {...props} value={value} onChange={handleChange} />;
});

export default Textarea;
