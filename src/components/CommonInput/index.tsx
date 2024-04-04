import { Input } from "enums/Input";
import { FC, memo, useMemo } from "react";
import { ICommonInputProps } from "components/CommonInput/type";
import TextInput from "components/CommonInput/TextInput";
import Textarea from "components/CommonInput/Textarea";
import Checkbox from "components/CommonInput/Checkbox";
import Select from "./Select";
import DateTimeInput from "./DateTimeInput";

const CommonInput: FC<ICommonInputProps> = memo(
  ({ type, value, onChange, className, ...props }) => {
    const Component = useMemo(() => {
      switch (type) {
        case Input.TEXT:
          return TextInput;
        case Input.TEXTAREA:
          return Textarea;
        case Input.CHECKBOX:
          return Checkbox;
        case Input.DATETIME:
          return DateTimeInput;
        case Input.SELECT:
          return Select;
        default:
          return TextInput;
      }
    }, [type]);

    return (
      <div className={`common-input--wrapper ${className ?? ""}`}>
        <Component value={value} onChange={onChange} {...props} />
      </div>
    );
  }
);

export default CommonInput;
