import React from "react";
import clsx from "clsx";
import styles from "./Icon.module.css";

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number | string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const DEFAULT_SIZE = 1;
const DEFAULT_WIDTH = 40;
const DEFAULT_HEIGHT = 40;

export const Icon: React.FC<IconProps> = ({
  size,
  width,
  height,
  className,
  style,
  children,
  ...props
}) => (
  <span
    className={clsx(styles.icon, className)}
    style={{
      width: width ?? (typeof size === "number" ? `${size}px` : DEFAULT_WIDTH),
      height: height ?? (typeof size === "number" ? `${size}px` : DEFAULT_HEIGHT),
      fontSize: typeof size === "number" ? `${size * 0.66}px` : `${DEFAULT_SIZE * 1.6}em`,
      ...style,
    }}
    {...props}
  >
    {children}
  </span>
);
