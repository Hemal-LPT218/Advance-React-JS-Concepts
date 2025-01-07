import {
  Button,
  ButtonPropsColorOverrides,
  ButtonPropsVariantOverrides,
} from "@mui/material";
import React, { memo } from "react";
import { OverridableStringUnion } from "@mui/types";

interface IButtonComponentProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  type?: "button" | "submit" | "reset" | undefined;
  variant?:
    | OverridableStringUnion<
        "text" | "contained" | "outlined",
        ButtonPropsVariantOverrides
      >
    | undefined;
  className?: string | undefined;
  color?:
    | OverridableStringUnion<
        | "inherit"
        | "primary"
        | "secondary"
        | "success"
        | "error"
        | "info"
        | "warning",
        ButtonPropsColorOverrides
      >
    | undefined;
}

const ButtonComponent: React.FC<IButtonComponentProps> = ({
  children,
  onClick,
  type,
  variant = "contained",
  className,
  color,
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      className={`!normal-case !text-xl ${className}`}
      onClick={onClick}
      color={color}
    >
      {children}
    </Button>
  );
};

export default memo(ButtonComponent);
