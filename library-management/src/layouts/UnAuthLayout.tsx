import { memo } from "react";

const UnAuthLayout: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <div className="flex flex-col gap-10 m-auto py-10 max-w-2xl text-center">
      {children}
    </div>
  );
};

export default memo(UnAuthLayout);
