import React from 'react';
import clsx from 'clsx';

export const Select = ({ className = '', ...props }) => (
  <select
    className={clsx(
      "w-full px-4 py-2 border border-gray-200 rounded-xl",
      "focus:outline-none focus:ring-2 focus:ring-green-400 transition",
      "bg-gray-50 text-gray-800",
      className
    )}
    {...props}
  />
);
