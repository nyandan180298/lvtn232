import { Select as SelectAntd } from 'antd';
import { FC, useCallback, memo, useState, useEffect } from 'react';
import { IInputProps } from './type';

const { Option } = SelectAntd;

const Select: FC<IInputProps> = memo(
    ({ value, onChange, options, ...props }) => {
        const [inputValue, setInputValue] = useState('');

        useEffect(() => {
            setInputValue(value || '');
        }, [value]);

        const handleChange = useCallback(
            (value: any) => {
                setInputValue(value || '');
                onChange && onChange(value || '');
            },
            [onChange]
        );

        return (
            <SelectAntd
                {...props}
                value={inputValue || void 0}
                // suffixIcon={<IconDown />}
                // clearIcon={<IconClear />}
                // menuItemSelectedIcon={<IconCheckDone />}
                onChange={handleChange}
            >
                {options?.map(option => (
                    <Option
                        value={option.value}
                        key={option.value}
                        disabled={props.disabled || props.readOnly}
                    >
                        {option.label}
                    </Option>
                ))}
            </SelectAntd>
        );
    }
);

export default Select;
