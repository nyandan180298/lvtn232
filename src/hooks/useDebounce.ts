import { useState, useEffect } from 'react';

interface IOptionDebounce {
    delay?: number;
    callback?: (value: any) => void;
}

const useDebounce = (value: any, option: IOptionDebounce = {}) => {
    const { delay = 500, callback } = option;
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
            callback && callback(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay, callback]);
    return debouncedValue;
};

export default useDebounce;
