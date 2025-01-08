import React, { memo } from "react";

interface IHeadingTextProps {
  children: React.ReactNode;
}

const HeadingText: React.FC<IHeadingTextProps> = ({ children }) => {
  return (
    <h1 className="text-4xl font-extrabold text-center text-secondary">
      {children}
    </h1>
  );
};

export default memo(HeadingText);
