import React from "react";
import clsx from "clsx";
import styles from "./Input.module.css";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  width?: number | string;
  height?: number | string;
  center?: boolean;
  mt?: number | string;
  mb?: number | string;
  ml?: number | string;
  mr?: number | string;
}

const DEFAULT_WIDTH = 280;
const DEFAULT_HEIGHT = 44;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, width, height, style, center, mt, mb, ml, mr, ...props },
    ref
  ) => {

    const customStyle: React.CSSProperties = {
      width: typeof width === "number" ? `${width}px` : DEFAULT_WIDTH,
      height: typeof height === "number" ? `${height}px` : DEFAULT_HEIGHT,
      marginTop: mt !== undefined ? (typeof mt === "number" ? `${mt}px` : mt) : undefined,
      marginBottom: mb !== undefined ? (typeof mb === "number" ? `${mb}px` : mb) : undefined,
      marginLeft: ml !== undefined ? (typeof ml === "number" ? `${ml}px` : ml) : undefined,
      marginRight: mr !== undefined ? (typeof mr === "number" ? `${mr}px` : mr) : undefined,
      display: center ? "block" : undefined,
      marginInline: center ? "auto" : undefined,
      ...style,
    };

    return (
      <input
        ref={ref}
        className={clsx(
          "form-control",
          styles.inputCustom,
          className
        )}
        style={customStyle}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";