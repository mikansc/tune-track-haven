
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SectionHeaderProps {
  title: string;
  linkTo?: string;
  className?: string;
}

const SectionHeader = ({ title, linkTo, className }: SectionHeaderProps) => {
  return (
    <div className={cn("flex justify-between items-center mb-4", className)}>
      <h2 className="text-xl font-bold">{title}</h2>
      
      {linkTo && (
        <Link 
          to={linkTo} 
          className="flex items-center text-sm text-music-text-secondary hover:text-music-primary transition-colors"
        >
          See all
          <ChevronRight size={16} />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
