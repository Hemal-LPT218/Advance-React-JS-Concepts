import { memo } from "react";

interface IButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
  children: string;
  type?: "submit" | "reset" | "button" | undefined
  disabled?: boolean | undefined
}

const ButtonComponent: React.FC<IButtonProps> = memo(
  ({ onClick, children, type, disabled }) => {
    return (
      <button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className="bg-sky-600 disabled:bg-gray-200 text-white disabled:text-neutral-800 font-bold p-3 rounded-lg whitespace-nowrap"
      >
        {children}
      </button>
    );
  }
);

export default ButtonComponent;
