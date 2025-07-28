import React from "react";
import clsx from "clsx";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "danger" | "secondary" | "outline";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width?: number | string;
  height?: number | string;
  center?: boolean;
  mt?: number | string;
  mb?: number | string;
  ml?: number | string;
  mr?: number | string;
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}
  const DEFAULT_WIDTH = 280;
  const DEFAULT_HEIGHT = 44;
  
export const Button: React.FC<ButtonProps> = ({
  width,
  height,
  center,
  mt,
  mb,
  ml,
  mr,
  variant = "primary",
  className,
  style,
  children,
  ...props
}) => {

  const customStyle: React.CSSProperties = {
    width: width ? (typeof width === "number" ? `${width}px` : width) : `${DEFAULT_WIDTH}px`,
    height: height ? (typeof height === "number" ? `${height}px` : height) : `${DEFAULT_HEIGHT}px`,
    marginTop: mt !== undefined ? (typeof mt === "number" ? `${mt}px` : mt) : undefined,
    marginBottom: mb !== undefined ? (typeof mb === "number" ? `${mb}px` : mb) : undefined,
    marginLeft: ml !== undefined ? (typeof ml === "number" ? `${ml}px` : ml) : undefined,
    marginRight: mr !== undefined ? (typeof mr === "number" ? `${mr}px` : mr) : undefined,
    display: center ? "block" : undefined,
    marginInline: center ? "auto" : undefined,
    ...style,
  };

  return (
    <button
      type={props.type ?? "button"}
      className={clsx(
        styles.button,
        styles[variant],
        className
      )}
      style={customStyle}
      {...props}
    >
      {children}
    </button>
  );
};