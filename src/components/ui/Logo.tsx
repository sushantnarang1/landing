import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', showText = true }) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
      >
        {/* Orange Shape */}
        <circle cx="12" cy="12" r="10" fill="#FF8C00" />
        {/* Leaf */}
        <path 
          d="M12 2C12 2 13 0 15 0C17 0 18 2 18 2C18 4 15 4 12 2Z" 
          fill="#4CAF50" 
        />
      </svg>
      {showText && (
        <span className="text-lg font-semibold tracking-tight text-inherit">
          Narang<span className="font-bold">OS</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
