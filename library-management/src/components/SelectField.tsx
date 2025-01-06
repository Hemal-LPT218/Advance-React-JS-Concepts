import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import React, { memo } from "react";

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
}

const SelectInput: React.FC<IInputFieldProps> = ({
  id,
  label,
  name,
  value,
  onChange,
  onBlur,
  menuList,
}) => {
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id={id}>{label}</InputLabel>
        <Select
          labelId={id}
          id={id}
          name={name}
          label={label}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="text-left"
        >
          {menuList?.map((menu) => (
            <MenuItem key={menu.value} value={menu.value}>
              {menu.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default memo(SelectInput);
