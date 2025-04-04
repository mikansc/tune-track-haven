
import React from 'react';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';

interface AlbumCoverProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  className?: string;
  onClick?: () => void;
  playable?: boolean;
}

const AlbumCover = ({ 
  imageUrl, 
  title, 
  subtitle, 
  className,
  onClick,
  playable = false
}: AlbumCoverProps) => {
  return (
    <div 
      className={cn("music-card group", className)}
      onClick={onClick}
    >
      <div className="playlist-cover relative mb-2">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        
        {playable && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-music-primary flex items-center justify-center text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <Play size={24} className="ml-1" />
            </div>
          </div>
        )}
      </div>
      
      <h3 className="font-medium text-sm truncate">{title}</h3>
      {subtitle && (
        <p className="text-music-text-secondary text-xs truncate">{subtitle}</p>
      )}
    </div>
  );
};

export default AlbumCover;
