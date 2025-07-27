import React from 'react';
import clsx from 'clsx';

export const Avatar = ({ src, alt = '', className = '' }) => (
  <img
    src={src || '/avatar.png'}
    alt={alt}
    className={clsx(
      "w-16 h-16 rounded-full border-2 border-green-200 shadow",
      className
    )}
  />
);