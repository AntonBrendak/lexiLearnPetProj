import React from "react";
import clsx from "clsx";
import styles from "./BaseForm.module.css";

export interface BaseFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  center?: boolean;
  mt?: number | string;
  mb?: number | string;
  ml?: number | string;
  mr?: number | string;
  width?: number | string;
  height?: number | string;
  gap?: number | string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const DEFAULT_WIDTH = "100vw";
const DEFAULT_HEIGHT = "100vh";
const DEFAULT_GAP = 16;

export const BaseForm: React.FC<BaseFormProps> = ({
  center = true,
  mt,
  mb,
  ml,
  mr,
  width,
  height,
  gap,
  className,
  style,
  children,
  ...props
}) => {
  const customStyle: React.CSSProperties = {
    width: width ?? DEFAULT_WIDTH,
    height: height ?? DEFAULT_HEIGHT,
    marginTop: mt !== undefined ? (typeof mt === "number" ? `${mt}px` : mt) : undefined,
    marginBottom: mb !== undefined ? (typeof mb === "number" ? `${mb}px` : mb) : undefined,
    marginLeft: ml !== undefined ? (typeof ml === "number" ? `${ml}px` : ml) : undefined,
    marginRight: mr !== undefined ? (typeof mr === "number" ? `${mr}px` : mr) : undefined,
    display: "flex",
    flexDirection: "column",
    gap: gap !== undefined ? (typeof gap === "number" ? `${gap}px` : gap) : `${DEFAULT_GAP}px`,
    justifyContent: center ? "center" : undefined,
    alignItems: center ? "center" : undefined,
    ...style,
  };

  return (
    <form
      className={clsx(styles.baseForm, className)}
      style={customStyle}
      {...props}
    >
      {children}
    </form>
  );
};