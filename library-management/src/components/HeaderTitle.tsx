import React, { memo } from "react";
import { Typography } from "@mui/material";
import enJson from "../locales/en.json";
import IconSvg from "./IconSvg";

interface IHeaderTitleProps {
  onClick?: () => void;
}

const HeaderTitle: React.FC<IHeaderTitleProps> = ({ onClick }) => {
  return (
    <div onClick={onClick} className="flex items-center gap-3 cursor-pointer">
      <IconSvg />
      <Typography
        color="primary"
        className="!text-2xl !font-bold hidden sm:inline-flex"
      >
        {enJson.libraryManagementSystem}
      </Typography>
    </div>
  );
};

export default memo(HeaderTitle);
