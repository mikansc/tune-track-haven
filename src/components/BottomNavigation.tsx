
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, BookOpen, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import MiniPlayer from './MiniPlayer';
import { useAudio } from '@/contexts/AudioContext';

const BottomNavigation = () => {
  const location = useLocation();
  const { currentSong } = useAudio();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="fixed bottom-0 w-full z-10">
      {currentSong && (
        <div className="px-4 w-full">
          <MiniPlayer />
        </div>
      )}
      
      <nav className="bg-music-card border-t border-gray-800 px-8 py-3">
        <div className="flex justify-between items-center">
          <NavItem 
            to="/home" 
            icon={<Home size={24} />} 
            label="Home" 
            isActive={isActive('/home')} 
          />
          <NavItem 
            to="/search" 
            icon={<Search size={24} />} 
            label="Search" 
            isActive={isActive('/search')} 
          />
          <NavItem 
            to="/library" 
            icon={<BookOpen size={24} />} 
            label="Library" 
            isActive={isActive('/library')} 
          />
          <NavItem 
            to="/profile" 
            icon={<User size={24} />} 
            label="Profile" 
            isActive={isActive('/profile')} 
          />
        </div>
      </nav>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem = ({ to, icon, label, isActive }: NavItemProps) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex flex-col items-center space-y-1",
        isActive 
          ? "text-music-primary" 
          : "text-music-text-secondary hover:text-music-text transition-colors"
      )}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
};

export default BottomNavigation;
