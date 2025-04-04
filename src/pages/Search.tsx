
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import Header from '@/components/Header';
import SectionHeader from '@/components/SectionHeader';
import AlbumCover from '@/components/AlbumCover';
import SongListItem from '@/components/SongListItem';
import BottomNavigation from '@/components/BottomNavigation';
import { Search as SearchIcon } from 'lucide-react';
import { useAudio } from '@/contexts/AudioContext';
import { playlists, categories, searchSongs } from '@/data/mockData';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { playSong, currentSong } = useAudio();
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    // Search for songs
    const results = searchSongs(query);
    setSearchResults(results);
  };
  
  const handleSongPlay = (song: any) => {
    playSong(song);
  };
  
  return (
    <div className="min-h-screen pb-28">
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="px-4">
          <Header title="Search">
            <div className="relative mt-4">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-music-text-secondary" size={18} />
              <Input
                type="text"
                placeholder="What do you want to listen to?"
                className="pl-10 bg-music-card border-gray-700 focus:border-music-primary"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </Header>
          
          {searchQuery.trim() === '' ? (
            <>
              <SectionHeader title="Browse all" className="mt-6" />
              <div className="grid grid-cols-2 gap-3 mb-8">
                {categories.map((category) => (
                  <div 
                    key={category.id}
                    className="relative rounded-lg overflow-hidden h-28 music-card group"
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
              
              <SectionHeader title="Popular playlists" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {playlists.slice(0, 4).map((playlist) => (
                  <AlbumCover
                    key={playlist.id}
                    imageUrl={playlist.coverImage}
                    title={playlist.title}
                    subtitle={playlist.createdBy}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-4">Search Results</h2>
              
              {searchResults.length > 0 ? (
                <div className="space-y-1">
                  {searchResults.map((song) => (
                    <SongListItem
                      key={song.id}
                      song={song}
                      onPlay={() => handleSongPlay(song)}
                      active={currentSong?.id === song.id}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-music-text-secondary">No results found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          )}
        </div>
      </ScrollArea>
      
      <BottomNavigation />
    </div>
  );
};

export default Search;
