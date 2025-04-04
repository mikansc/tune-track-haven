
import React from 'react';
import { cn } from '@/lib/utils';
import { Settings } from 'lucide-react';

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
  showSettings?: boolean;
  onSettingsClick?: () => void;
}

const Header = ({ 
  title, 
  children, 
  className,
  showSettings = false,
  onSettingsClick
}: HeaderProps) => {
  return (
    <div className={cn("pt-6 pb-4 sticky top-0 bg-music-background z-10", className)}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        
        {showSettings && (
          <button 
            onClick={onSettingsClick}
            className="p-2 text-music-text-secondary hover:text-music-text transition-colors"
          >
            <Settings size={20} />
          </button>
        )}
      </div>
      
      {children}
    </div>
  );
};

export default Header;
