
import React from 'react';
import { Play, Pause, SkipForward } from 'lucide-react';
import { useAudio } from '@/contexts/AudioContext';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const MiniPlayer = () => {
  const { currentSong, isPlaying, togglePlayPause, nextSong, progress } = useAudio();
  
  if (!currentSong) return null;
  
  return (
    <div className="bg-music-card rounded-t-lg p-3 shadow-lg animate-slide-up border-t border-l border-r border-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0">
            <img 
              src={currentSong.coverImage} 
              alt={currentSong.title} 
              className="h-full w-full object-cover"
            />
          </div>
          
          <div className="truncate">
            <h4 className="font-medium text-sm truncate">{currentSong.title}</h4>
            <p className="text-music-text-secondary text-xs truncate">{currentSong.artist}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={togglePlayPause}
            className="h-8 w-8 rounded-full flex items-center justify-center bg-music-primary text-white hover:bg-music-primary/80 transition-colors"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          
          <button 
            onClick={nextSong}
            className="text-music-text-secondary hover:text-music-text transition-colors"
          >
            <SkipForward size={20} />
          </button>
        </div>
      </div>
      
      <Progress
        value={progress} 
        className="h-1 mt-2"
      />
    </div>
  );
};

export default MiniPlayer;
