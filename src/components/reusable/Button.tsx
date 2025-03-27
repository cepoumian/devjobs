import { Link } from "@tanstack/react-router";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  isIcon?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  isLink?: boolean;
  url?: string;
}

const Button = (props: ButtonProps) => {
  const {
    children,
    type = "button",
    onClick,
    disabled,
    isIcon = false,
    isLink = false,
    url,
  } = props;

  if (isLink && url) {
    return (
      <Link
        to={url}
        className={`button button--link ${disabled ? "button--disabled" : ""} ${
          isIcon ? "button--icon" : ""
        }`}
      >
        {children}
      </Link>
    );
  }

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
