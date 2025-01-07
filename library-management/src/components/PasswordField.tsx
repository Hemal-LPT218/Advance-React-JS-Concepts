import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React, { memo, useCallback, useState } from "react";

interface IPasswordFieldProps {
  id?: string | undefined;
  label?: React.ReactNode;
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
}

const PasswordField: React.FC<IPasswordFieldProps> = ({
  id,
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  helperText,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = useCallback(
    () => setShowPassword((show) => !show),
    []
  );

  const handleMouseDownPassword = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    },
    []
  );

  const handleMouseUpPassword = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    },
    []
  );

  return (
    <div>
      <FormControl variant="outlined" className="w-full">
        <InputLabel htmlFor={id} error={error}>
          {label}
        </InputLabel>
        <OutlinedInput
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          label={label}
        />
        <FormHelperText error={error}>{helperText}</FormHelperText>
      </FormControl>
    </div>
  );
};

export default memo(PasswordField);
