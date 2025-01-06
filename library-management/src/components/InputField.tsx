import { InputLabelProps, TextField } from "@mui/material";
import React, { memo } from "react";

interface IInputFieldProps {
  id?: string | undefined;
  label?: React.ReactNode;
  type?: React.HTMLInputTypeAttribute | undefined;
  name?: string | undefined;
  value?: unknown;
  onChange?:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  onBlur?:
    | React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  error?: boolean | undefined;
  helperText?: React.ReactNode;
  InputLabelProps?: Partial<InputLabelProps> | undefined;
}

const InputField: React.FC<IInputFieldProps> = ({
  id,
  label,
  type,
  name,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  InputLabelProps,
}) => {
  return (
    <div>
      <TextField
        id={id}
        label={label}
        variant="outlined"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        helperText={helperText}
        InputLabelProps={InputLabelProps}
        fullWidth
      />
    </div>
  );
};

export default memo(InputField);
