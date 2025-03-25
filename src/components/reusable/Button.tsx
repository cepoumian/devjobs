import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  isIcon?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const {
    children,
    type = "button",
    onClick,
    disabled,
    isIcon = false,
  } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`button ${disabled ? "button--disabled" : ""} ${isIcon ? "button--icon" : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
