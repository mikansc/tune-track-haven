
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@/components/BottomNavigation';
import Header from '@/components/Header';
import SectionHeader from '@/components/SectionHeader';
import AlbumCover from '@/components/AlbumCover';
import MusicPlayer from '@/components/MusicPlayer';
import { playlists, categories, recentlyPlayed, newReleases } from '@/data/mockData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAudio } from '@/contexts/AudioContext';

const Home = () => {
  const navigate = useNavigate();
  const { playSong } = useAudio();
  const [showFullPlayer, setShowFullPlayer] = useState(false);
  
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
          <Header title="Good evening" />
          
          {/* Recently played */}
          <SectionHeader title="Recently played" linkTo="/library" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {recentlyPlayed.map((song) => (
              <AlbumCover
                key={song.id}
                imageUrl={song.coverImage}
                title={song.title}
                subtitle={song.artist}
                playable
                onClick={() => handleSongPlay(song)}
              />
            ))}
          </div>
          
          {/* Featured playlists */}
          <SectionHeader title="Featured playlists" />
          <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4 hide-scrollbar mb-8">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="w-36 flex-shrink-0">
                <AlbumCover
                  imageUrl={playlist.coverImage}
                  title={playlist.title}
                  subtitle={playlist.description.length > 20 
                    ? `${playlist.description.substring(0, 20)}...` 
                    : playlist.description}
                  onClick={() => handlePlaylistClick(playlist.id)}
                  playable
                />
              </div>
            ))}
          </div>
          
          {/* Categories */}
          <SectionHeader title="Browse by category" />
          <div className="grid grid-cols-2 gap-3 mb-8">
            {categories.map((category) => (
              <div 
                key={category.id}
                className="relative rounded-lg overflow-hidden h-28 music-card group"
                onClick={() => {}}
              >
                <img 
                  src={category.coverImage} 
                  alt={category.name} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute bottom-0 left-0 p-3">
                  <h3 className="font-bold text-xl">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
          
          {/* New releases */}
          <SectionHeader title="New releases" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {newReleases.map((song) => (
              <AlbumCover
                key={song.id}
                imageUrl={song.coverImage}
                title={song.title}
                subtitle={song.artist}
                playable
                onClick={() => handleSongPlay(song)}
              />
            ))}
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

export default Home;
