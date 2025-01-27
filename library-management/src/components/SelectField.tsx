import React, { memo } from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { SelectInputProps } from "@mui/material/Select/SelectInput";

export interface ISelectOption {
  value: string;
  title: string;
}

interface IInputFieldProps {
  id?: string | undefined;
  label?: React.ReactNode;
  type?: React.HTMLInputTypeAttribute | undefined;
  name?: string | undefined;
  value?: unknown;
  onChange?: SelectInputProps<unknown>["onChange"];
  onBlur?:
    | React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  menuList?: ISelectOption[];
  error?: boolean | undefined;
  helperText?: React.ReactNode;
  className?: string | undefined;
}

const SelectField: React.FC<IInputFieldProps> = ({
  id,
  label,
  name,
  value,
  onChange,
  onBlur,
  menuList,
  error,
  helperText,
  className,
}) => {
  return (
    <FormControl fullWidth className={className}>
      <InputLabel id={id} error={error}>
        {label}
      </InputLabel>

      <Select
        labelId={id}
        id={id}
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="text-left"
        error={error}
      >
        {menuList?.map((menu) => (
          <MenuItem key={menu.value} value={menu.value}>
            {menu.title}
          </MenuItem>
        ))}
      </Select>

      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default memo(SelectField);
