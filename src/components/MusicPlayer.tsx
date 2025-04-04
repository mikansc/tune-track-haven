
import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { useAudio } from '@/contexts/AudioContext';
import { cn } from '@/lib/utils';

interface MusicPlayerProps {
  onClose: () => void;
}

const MusicPlayer = ({ onClose }: MusicPlayerProps) => {
  const { 
    currentSong, 
    isPlaying, 
    togglePlayPause, 
    nextSong, 
    prevSong, 
    progress, 
    setProgress,
    volume,
    setVolume 
  } = useAudio();
  
  const [isFavorite, setIsFavorite] = useState(false);
  
  if (!currentSong) return null;
  
  // Format time from seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Current time based on progress
  const currentTime = currentSong ? (progress / 100) * currentSong.duration : 0;
  
  return (
    <div className="fixed inset-0 bg-music-background z-50 p-5 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <button onClick={onClose} className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
        <span className="text-lg font-semibold">Now Playing</span>
        <div className="w-6"></div> {/* Placeholder for balance */}
      </div>
      
      {/* Album Art */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-64 h-64 md:w-80 md:h-80 shadow-2xl rounded-lg overflow-hidden">
          <img 
            src={currentSong.coverImage} 
            alt={currentSong.album} 
            className="w-full h-full object-cover"
          />
          
          {/* Audio Visualizer (decorative) */}
          {isPlaying && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center items-end h-6">
              <div className="visualizer-bar h-1 animate-wave-1"></div>
              <div className="visualizer-bar h-3 animate-wave-2"></div>
              <div className="visualizer-bar h-5 animate-wave-1"></div>
              <div className="visualizer-bar h-4 animate-wave-3"></div>
              <div className="visualizer-bar h-2 animate-wave-2"></div>
            </div>
          )}
        </div>
      </div>
      
      {/* Song Info */}
      <div className="text-center mt-8 mb-4">
        <h2 className="text-xl font-bold">{currentSong.title}</h2>
        <p className="text-music-text-secondary">{currentSong.artist}</p>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-4">
        <Slider
          value={[progress]}
          max={100}
          step={0.1}
          onValueChange={(value) => setProgress(value[0])}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-music-text-secondary">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(currentSong.duration)}</span>
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className={cn(
            "p-2 rounded-full transition-colors",
            isFavorite ? "text-red-500" : "text-music-text-secondary hover:text-music-text"
          )}
        >
          <Heart size={24} fill={isFavorite ? "currentColor" : "none"} />
        </button>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={prevSong}
            className="p-2 text-music-text-secondary hover:text-music-text transition-colors"
          >
            <SkipBack size={28} />
          </button>
          
          <button 
            onClick={togglePlayPause}
            className="h-14 w-14 rounded-full flex items-center justify-center bg-music-primary text-white hover:bg-music-primary/80 transition-colors"
          >
            {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
          </button>
          
          <button 
            onClick={nextSong}
            className="p-2 text-music-text-secondary hover:text-music-text transition-colors"
          >
            <SkipForward size={28} />
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Volume2 size={18} className="text-music-text-secondary" />
          <Slider
            value={[volume * 100]}
            max={100}
            onValueChange={(value) => setVolume(value[0] / 100)}
            className="w-16"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
