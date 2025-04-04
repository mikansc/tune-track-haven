
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Heart, MoreHorizontal, Shuffle } from 'lucide-react';
import { playlists, getPlaylistSongs } from '@/data/mockData';
import SongListItem from '@/components/SongListItem';
import { useAudio } from '@/contexts/AudioContext';
import MusicPlayer from '@/components/MusicPlayer';

const PlaylistDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { playSong, currentSong } = useAudio();
  const [showFullPlayer, setShowFullPlayer] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Find the playlist
  const playlist = playlists.find(p => p.id === id);
  const playlistSongs = getPlaylistSongs(id || '');
  
  if (!playlist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Playlist not found</h2>
          <Button onClick={() => navigate('/library')}>
            Return to Library
          </Button>
        </div>
      </div>
    );
  }
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleSongPlay = (song: any) => {
    playSong(song);
  };
  
  const handlePlayAll = () => {
    if (playlistSongs.length > 0) {
      playSong(playlistSongs[0]);
    }
  };
  
  return (
    <div className="min-h-screen pb-28">
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div>
          {/* Playlist header */}
          <div 
            className="relative pb-16"
            style={{
              background: `linear-gradient(to bottom, rgba(124, 58, 237, 0.7) 0%, rgba(15, 15, 15, 1) 100%)`,
            }}
          >
            <div className="absolute top-4 left-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleBack}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft size={20} />
              </Button>
            </div>
            
            <div className="pt-16 px-4 flex items-end">
              <div className="h-32 w-32 rounded-lg shadow-lg overflow-hidden flex-shrink-0 mr-4">
                <img 
                  src={playlist.coverImage} 
                  alt={playlist.title} 
                  className="h-full w-full object-cover"
                />
              </div>
              
              <div>
                <h1 className="text-2xl font-bold">{playlist.title}</h1>
                <p className="text-music-text-secondary text-sm mb-1">{playlist.description}</p>
                <p className="text-sm">
                  <span className="text-music-text-secondary">Created by </span> 
                  <span className="text-white">{playlist.createdBy}</span>
                </p>
                <p className="text-sm text-music-text-secondary">
                  {playlistSongs.length} songs
                </p>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="px-4 py-4 flex items-center space-x-4">
            <Button 
              className="bg-music-primary hover:bg-music-primary/90 rounded-full h-12 w-12 p-0"
              onClick={handlePlayAll}
            >
              <Play size={24} className="ml-1" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsFavorite(!isFavorite)}
              className={isFavorite ? "text-music-primary" : "text-music-text-secondary"}
            >
              <Heart size={24} fill={isFavorite ? "currentColor" : "none"} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="text-music-text-secondary"
            >
              <Shuffle size={24} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="text-music-text-secondary"
            >
              <MoreHorizontal size={24} />
            </Button>
          </div>
          
          {/* Song list */}
          <div className="px-4">
            {playlistSongs.length > 0 ? (
              <div className="space-y-1">
                {playlistSongs.map((song, index) => (
                  <SongListItem
                    key={song.id}
                    song={song}
                    onPlay={() => handleSongPlay(song)}
                    active={currentSong?.id === song.id}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-music-text-secondary">This playlist is empty</p>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
      
      <BottomNavigation />
      
      {showFullPlayer && (
        <MusicPlayer onClose={() => setShowFullPlayer(false)} />
      )}
    </div>
  );
};

export default PlaylistDetail;
