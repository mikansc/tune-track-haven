
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Plus, ListMusic, Album, Clock, Search } from 'lucide-react';
import { playlists, recentlyPlayed } from '@/data/mockData';
import SongListItem from '@/components/SongListItem';
import { useAudio } from '@/contexts/AudioContext';

const Library = () => {
  const navigate = useNavigate();
  const { playSong, currentSong } = useAudio();
  const [activeTab, setActiveTab] = useState<'playlists' | 'songs'>('playlists');
  
  const handlePlaylistClick = (playlistId: string) => {
    navigate(`/playlist/${playlistId}`);
  };
  
  const handleSongPlay = (song: any) => {
    playSong(song);
  };
  
  return (
    <div className="min-h-screen pb-28">
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="px-4">
          <Header title="Your Library" showSettings>
            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-2">
                <Button 
                  variant={activeTab === 'playlists' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setActiveTab('playlists')}
                  className={activeTab === 'playlists' ? 'bg-music-primary hover:bg-music-primary/90' : 'border-gray-700'}
                >
                  <ListMusic size={16} className="mr-2" />
                  Playlists
                </Button>
                
                <Button 
                  variant={activeTab === 'songs' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setActiveTab('songs')}
                  className={activeTab === 'songs' ? 'bg-music-primary hover:bg-music-primary/90' : 'border-gray-700'}
                >
                  <Album size={16} className="mr-2" />
                  Songs
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="text-music-text-secondary">
                  <Search size={20} />
                </Button>
                
                <Button variant="ghost" size="icon" className="text-music-text-secondary">
                  <Plus size={20} />
                </Button>
              </div>
            </div>
          </Header>
          
          {activeTab === 'playlists' ? (
            <div className="mt-6 space-y-4">
              <h3 className="text-sm font-semibold text-music-text-secondary mb-2">Your Playlists</h3>
              
              {playlists.map((playlist) => (
                <div 
                  key={playlist.id}
                  className="flex items-center space-x-4 p-2 hover:bg-music-card/60 rounded-md transition-colors cursor-pointer"
                  onClick={() => handlePlaylistClick(playlist.id)}
                >
                  <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={playlist.coverImage} 
                      alt={playlist.title} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{playlist.title}</h4>
                    <p className="text-music-text-secondary text-sm truncate">
                      Playlist • {playlist.createdBy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6">
              <div className="flex items-center space-x-2 mb-4">
                <Clock size={16} className="text-music-text-secondary" />
                <h3 className="text-sm font-semibold text-music-text-secondary">Recently Played</h3>
              </div>
              
              {recentlyPlayed.map((song) => (
                <SongListItem
                  key={song.id}
                  song={song}
                  onPlay={() => handleSongPlay(song)}
                  active={currentSong?.id === song.id}
                />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
      
      <BottomNavigation />
    </div>
  );
};

export default Library;
