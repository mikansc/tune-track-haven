
import React from 'react';
import { Play, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Song } from '@/contexts/AudioContext';

interface SongListItemProps {
  song: Song;
  onPlay: () => void;
  active?: boolean;
}

const SongListItem = ({ song, onPlay, active = false }: SongListItemProps) => {
  return (
    <div 
      className={cn(
        "flex items-center p-3 rounded-md group hover:bg-music-card/60 transition-colors",
        active && "bg-music-card/60"
      )}
    >
      <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0 mr-3">
        <img 
          src={song.coverImage} 
          alt={song.title} 
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0 mr-3">
        <h4 className={cn(
          "font-medium text-sm truncate",
          active && "text-music-primary"
        )}>
          {song.title}
        </h4>
        <p className="text-music-text-secondary text-xs truncate">
          {song.artist}
        </p>
      </div>
      
      <div className="flex items-center space-x-3">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onPlay();
          }}
          className="h-8 w-8 rounded-full flex items-center justify-center bg-music-primary/0 text-white group-hover:bg-music-primary transition-colors opacity-0 group-hover:opacity-100"
        >
          <Play size={16} className="ml-0.5" />
        </button>
        
        <button className="text-music-text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal size={20} />
        </button>
      </div>
    </div>
  );
};

export default SongListItem;
