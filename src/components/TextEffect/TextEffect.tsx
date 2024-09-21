import React, { HTMLAttributes } from "react";
import "./TextEffect.css";

interface TextEffect extends HTMLAttributes<HTMLHeadingElement> {
  type?: "fade-up" | "fade-down" | "typewriter";
}

const TextEffect = ({
  className,
  children,
  type = "fade-up",
  ...props
}: TextEffect) => {
  const text: React.ReactNode | string = children || "";

  const textToRender = typeof text === "string" ? text : "";

  return (
    <h1 className={`text-reveal ${type} ${className}`} {...props}>
      {textToRender.match(/./g)!.map((char: string, index: number) => (
        <span
          key={`${char}-${index}`}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
};

export default TextEffect;
