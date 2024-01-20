import { Checkbox as AntdCheckbox } from 'antd';
import { FC, useCallback, memo, useEffect, useState } from 'react';
import { DATA_SEPARATOR } from 'utils/constants';
import { IInputProps } from './type';

const Checkbox: FC<IInputProps> = memo(
    ({ value, onChange, options, ...props }) => {
        const [currentValue, setCurrentValue] = useState([]);

        useEffect(() => {
            let newValue: any = [];
            if (value) {
                newValue = `${value}`.split(DATA_SEPARATOR);
            }
            setCurrentValue(newValue);
        }, [value]);

        const handleChange = useCallback(
            (e: any) => {
                let targetValue = e.target.value;
                let selectedValues: any = [...currentValue];
                if (e.target.checked) {
                    if (!selectedValues.some((v: any) => v === targetValue)) {
                        selectedValues = [...selectedValues, targetValue];
                    }
                } else {
                    selectedValues = selectedValues.filter(
                        (v: any) => v !== targetValue
                    );
                }
                setCurrentValue(selectedValues);
                if (onChange) {
                    const valueString = selectedValues.join(DATA_SEPARATOR);
                    onChange(valueString);
                }
            },
            [onChange, currentValue]
        );

        return (
            <>
                {options?.map((option: any, idx) => {
                    const isChecked = currentValue.some(
                        v => `${v}`.trim() === option.value
                    );
                    return (
                        <div key={idx}>
                            <AntdCheckbox
                                {...props}
                                value={option.value}
                                checked={isChecked}
                                onChange={handleChange}
                            >
                                {option.label && (
                                    <span className="checkbox-label">
                                        {option.label}
                                    </span>
                                )}
                            </AntdCheckbox>
                        </div>
                    );
                })}
            </>
        );
    }
);

export default Checkbox;
