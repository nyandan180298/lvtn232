import { DatePicker } from "antd";
import { FC, useCallback, memo, useMemo } from "react";
import { IInputProps } from "./type";
import dayjs from "dayjs";

//const displayFormat = 'DD/MM/YYYY HH:mm:ss';
const displayFormat = "DD/MM/YYYY";
const valueFormat = "YYYY-MM-DD";

const DateTimeInput: FC<IInputProps> = memo(({ value, onChange, ...props }) => {
  const handleChange = useCallback(
    (_: any, dateValue: any) => {
      onChange &&
        onChange(
          dateValue ? dayjs(dateValue, displayFormat).format(valueFormat) : ""
        );
    },
    [onChange]
  );

  const dateValue = useMemo(() => {
    if (value) {
      return dayjs(value, valueFormat);
    }
    return null;
  }, [value]);

  return (
    <DatePicker
      {...props}
      placeholder={props.placeholder || "Chọn ngày"}
      popupClassName="ems-picker-dropdown"
      allowClear={true}
      value={dateValue}
      format={displayFormat}
      onChange={handleChange}
    />
  );
});

export default DateTimeInput;
