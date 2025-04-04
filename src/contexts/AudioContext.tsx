
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

// Define types for songs and audio state
export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverImage: string;
  audioSrc: string;
  duration: number;
}

interface AudioContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  volume: number;
  playSong: (song: Song) => void;
  pauseSong: () => void;
  togglePlayPause: () => void;
  setProgress: (value: number) => void;
  setVolume: (value: number) => void;
  nextSong: () => void;
  prevSong: () => void;
  queue: Song[];
  addToQueue: (song: Song) => void;
  clearQueue: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [queue, setQueue] = useState<Song[]>([]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    audioRef.current = new Audio();
    
    // Set initial volume
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  useEffect(() => {
    if (!audioRef.current) return;
    
    // Update volume when it changes
    audioRef.current.volume = volume;
  }, [volume]);
  
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    
    // Update audio source when song changes
    audioRef.current.src = currentSong.audioSrc;
    audioRef.current.load();
    
    if (isPlaying) {
      audioRef.current.play().catch(err => {
        console.error('Error playing audio:', err);
        setIsPlaying(false);
      });
    }
    
    // Set up event listeners
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(isNaN(currentProgress) ? 0 : currentProgress);
      }
    };
    
    const handleEnded = () => {
      nextSong();
    };
    
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('ended', handleEnded);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('ended', handleEnded);
      }
    };
  }, [currentSong]);
  
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(err => {
        console.error('Error playing audio:', err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);
  
  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };
  
  const pauseSong = () => {
    setIsPlaying(false);
  };
  
  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  };
  
  const updateProgress = (value: number) => {
    setProgress(value);
    if (audioRef.current && currentSong) {
      audioRef.current.currentTime = (value / 100) * audioRef.current.duration;
    }
  };
  
  const nextSong = () => {
    if (queue.length > 0) {
      const nextSong = queue[0];
      const newQueue = queue.slice(1);
      
      setCurrentSong(nextSong);
      setQueue(newQueue);
      setIsPlaying(true);
    }
  };
  
  const prevSong = () => {
    // This is a simplified version - normally you'd have a history queue
    // This implementation just restarts the current song
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setProgress(0);
    }
  };
  
  const addToQueue = (song: Song) => {
    setQueue(prevQueue => [...prevQueue, song]);
  };
  
  const clearQueue = () => {
    setQueue([]);
  };
  
  const value = {
    currentSong,
    isPlaying,
    progress,
    volume,
    playSong,
    pauseSong,
    togglePlayPause,
    setProgress: updateProgress,
    setVolume,
    nextSong,
    prevSong,
    queue,
    addToQueue,
    clearQueue,
  };
  
  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};
