import React from 'react';
import clsx from 'clsx';

export const Button = ({
  children,
  className = '',
  ...props
}) => (
  <button
    className={clsx(
      "px-5 py-2 rounded-2xl bg-green-500 text-white font-semibold",
      "shadow hover:bg-green-600 transition-all focus:outline-none focus:ring-2 focus:ring-green-400",
      className
    )}
    {...props}
  >
    {children}
  </button>
);