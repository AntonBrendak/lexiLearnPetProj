import React from 'react';
import clsx from 'clsx';

export const Badge = ({ children, color = 'green', className = '' }) => (
  <span
    className={clsx(
      "rounded-xl px-3 py-1 text-xs font-semibold",
      color === 'green' && 'bg-green-100 text-green-700',
      color === 'blue' && 'bg-blue-100 text-blue-700',
      color === 'gray' && 'bg-gray-100 text-gray-600',
      className
    )}
  >
    {children}
  </span>
);