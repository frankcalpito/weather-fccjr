import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
  type = "button",
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg ${className}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
