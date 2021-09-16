import React from "react";

type ButtonTypes = "filled" | "outline";

interface ButtonProps {
  type: ButtonTypes;
  text: string;
  minWidth?: string;
  onClick?: any;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  type,
  text,
  minWidth,
  onClick,
  children,
  className,
}) => {
  return (
    <button
      style={{ minWidth }}
      onClick={onClick || null}
      className={`button button--${type} ${className}`}>
      {text}
      {children}
    </button>
  );
};
