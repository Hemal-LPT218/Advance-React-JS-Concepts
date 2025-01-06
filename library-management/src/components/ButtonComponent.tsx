import { Button } from "@mui/material";
import React, { memo } from "react";

interface IButtonComponentProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  type?: "button" | "submit" | "reset" | undefined;
}

const ButtonComponent: React.FC<IButtonComponentProps> = ({
  children,
  onClick,
  type,
}) => {
  return (
    <Button
      type={type}
      variant="contained"
      className="!normal-case !text-xl"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default memo(ButtonComponent);
