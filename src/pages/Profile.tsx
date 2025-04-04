
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Settings, LogOut, Heart, Clock, Music, 
  Volume2, PlaySquare, Headphones, Bell
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { userProfile } from '@/data/mockData';
import SongListItem from '@/components/SongListItem';
import { useAudio } from '@/contexts/AudioContext';
import { Separator } from '@/components/ui/separator';

const Profile = () => {
  const navigate = useNavigate();
  const { playSong, currentSong } = useAudio();
  
  const handleSongPlay = (song: any) => {
    playSong(song);
  };
  
  const handleLogout = () => {
    navigate('/');
  };
  
  return (
    <div className="min-h-screen pb-28">
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="px-4">
          <Header title="Profile" />
          
          <div className="flex flex-col items-center mt-4 mb-8">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={userProfile.profileImage} alt={userProfile.name} />
              <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <h2 className="text-xl font-bold">{userProfile.name}</h2>
            <p className="text-music-text-secondary">{userProfile.email}</p>
            
            <div className="flex space-x-4 mt-6">
              <Button variant="outline" size="sm" className="border-gray-700">
                <Settings size={16} className="mr-2" />
                Edit Profile
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-700 text-music-text-secondary"
                onClick={handleLogout}
              >
                <LogOut size={16} className="mr-2" />
                Log out
              </Button>
            </div>
          </div>
          
          <Separator className="bg-gray-800 my-6" />
          
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Heart size={16} className="text-music-primary" />
              <h3 className="text-lg font-semibold">Favorite Songs</h3>
            </div>
            
            {userProfile.favorites.map((song) => (
              <SongListItem
                key={song.id}
                song={song}
                onPlay={() => handleSongPlay(song)}
                active={currentSong?.id === song.id}
              />
            ))}
          </div>
          
          <Separator className="bg-gray-800 my-6" />
          
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Clock size={16} className="text-music-primary" />
              <h3 className="text-lg font-semibold">Recently Played</h3>
            </div>
            
            {userProfile.recentlyPlayed.map((song) => (
              <SongListItem
                key={song.id}
                song={song}
                onPlay={() => handleSongPlay(song)}
                active={currentSong?.id === song.id}
              />
            ))}
          </div>
          
          <Separator className="bg-gray-800 my-6" />
          
          {/* Settings options */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold mb-4">Settings</h3>
            
            <div className="space-y-4">
              <Button variant="ghost" className="w-full justify-start text-music-text">
                <Headphones size={18} className="mr-3 text-music-primary" />
                Audio Quality
              </Button>
              
              <Button variant="ghost" className="w-full justify-start text-music-text">
                <Volume2 size={18} className="mr-3 text-music-primary" />
                Equalizer
              </Button>
              
              <Button variant="ghost" className="w-full justify-start text-music-text">
                <PlaySquare size={18} className="mr-3 text-music-primary" />
                Playback
              </Button>
              
              <Button variant="ghost" className="w-full justify-start text-music-text">
                <Bell size={18} className="mr-3 text-music-primary" />
                Notifications
              </Button>
              
              <Button variant="ghost" className="w-full justify-start text-music-text">
                <Music size={18} className="mr-3 text-music-primary" />
                About
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
      
      <BottomNavigation />
    </div>
  );
};

export default Profile;
