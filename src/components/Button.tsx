// src/components/Button.tsx
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  color?: 'yellow' | 'blue' | 'red' | 'green' | 'gray'; // Add more colors as needed
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  color = 'gray',
  className,
  disabled,
}) => {
  const baseClasses =
    'text-white p-2 rounded-md transition duration-300 ease-in-out transform';
  const colorClasses = {
    gray: 'bg-gray-500 hover:bg-gray-600 active:bg-gray-700',
    yellow: 'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700',
    blue: 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700',
    red: 'bg-red-500 hover:bg-red-600 active:bg-red-700',
    green: 'bg-green-500 hover-bg-green-600 active:bg-green-700',
  };
  const disabledClasses = 'opacity-50 cursor-not-allowed';

  return (
    <button
      disabled={disabled}
      className={`${baseClasses} ${colorClasses[color]} ${disabled ? disabledClasses : 'hover:scale-105 active:scale-95'} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
