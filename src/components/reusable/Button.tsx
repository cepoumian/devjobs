import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const { children, onClick, disabled } = props;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`button ${disabled ? "button--disabled" : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
