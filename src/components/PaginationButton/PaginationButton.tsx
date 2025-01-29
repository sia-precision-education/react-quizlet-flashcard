import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface PaginationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  disabled?: boolean;
}


export const PaginationButtonLeft = forwardRef<HTMLButtonElement, PaginationButtonProps>(
  ({ onClick, disabled = false, className }, ref) => {
    return   (    <button
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        className={twMerge(
          'bg-gray-500/50 hover:bg-blue-700 hover:cursor-pointer text-white py-1 px-1 rounded-l-md disabled:opacity-50 disabled:cursor-not-allowed transform transition-transform hover:animate-pulse',
          className
        )}
      >
        &#8592;
      </button>)
  }
);

PaginationButtonLeft.displayName = 'PaginationButtonLeft';

export const PaginationButtonRight = forwardRef<HTMLButtonElement, PaginationButtonProps>(
  ({ onClick, disabled = false, className }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        className={twMerge(
          'bg-gray-500/50 hover:bg-blue-700 hover:cursor-pointer text-white py-1 px-1 rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed transform transition-transform hover:animate-pulse',
          className
        )}
      >
        &#8594;
      </button>
    )
  }
);

PaginationButtonRight.displayName = 'PaginationButtonRight';