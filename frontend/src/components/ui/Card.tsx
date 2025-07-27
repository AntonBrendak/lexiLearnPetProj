import React from 'react';
import clsx from 'clsx';

export const Card = ({ children, className = '' }) => (
  <div
    className={clsx(
      "bg-white rounded-2xl shadow-lg p-6 border border-gray-100",
      "transition-all duration-200 hover:shadow-2xl",
      className
    )}
  >
    {children}
  </div>
);