
import { Song } from '@/contexts/AudioContext';

// Mock data for albums/playlists
export const playlists = [
  {
    id: '1',
    title: 'Chill Vibes',
    description: 'Relaxing beats to help you unwind',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1074&auto=format&fit=crop',
    createdBy: 'Tune Track',
    songs: ['song1', 'song2', 'song3', 'song4', 'song5']
  },
  {
    id: '2',
    title: 'Workout Hits',
    description: 'High energy tracks to fuel your workout',
    coverImage: 'https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?q=80&w=1170&auto=format&fit=crop',
    createdBy: 'Tune Track',
    songs: ['song6', 'song7', 'song8', 'song9']
  },
  {
    id: '3',
    title: 'Focus Flow',
    description: 'Ambient music to help you concentrate',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1170&auto=format&fit=crop',
    createdBy: 'Tune Track',
    songs: ['song10', 'song11', 'song12']
  },
  {
    id: '4',
    title: 'Throwback Classics',
    description: 'Nostalgic hits from the past decades',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1170&auto=format&fit=crop',
    createdBy: 'Tune Track',
    songs: ['song13', 'song14', 'song15', 'song16']
  },
  {
    id: '5',
    title: 'New Releases',
    description: 'The latest and greatest music',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1170&auto=format&fit=crop',
    createdBy: 'Tune Track',
    songs: ['song17', 'song18', 'song19']
  },
  {
    id: '6',
    title: 'Indie Discoveries',
    description: 'Emerging artists and indie tracks',
    coverImage: 'https://images.unsplash.com/photo-1499415479124-43c32433a620?q=80&w=1032&auto=format&fit=crop',
    createdBy: 'Tune Track',
    songs: ['song20', 'song21', 'song22', 'song23']
  }
];

// Mock data for categories
export const categories = [
  {
    id: 'cat1',
    name: 'Pop',
    coverImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1170&auto=format&fit=crop'
  },
  {
    id: 'cat2',
    name: 'Hip-Hop',
    coverImage: 'https://images.unsplash.com/photo-1526328828355-69b01701ca6a?q=80&w=1087&auto=format&fit=crop'
  },
  {
    id: 'cat3',
    name: 'Rock',
    coverImage: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=1170&auto=format&fit=crop'
  },
  {
    id: 'cat4',
    name: 'Electronic',
    coverImage: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?q=80&w=1170&auto=format&fit=crop'
  }
];

// Mock data for songs
export const songs: Record<string, Song> = {
  'song1': {
    id: 'song1',
    title: 'Sunset Dreams',
    artist: 'Chill Wave',
    album: 'Chill Vibes',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1074&auto=format&fit=crop',
    audioSrc: 'https://actions.google.com/sounds/v1/ambiences/mountain_view.ogg',
    duration: 182
  },
  'song2': {
    id: 'song2',
    title: 'Ocean Breeze',
    artist: 'Ambient Flow',
    album: 'Chill Vibes',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1074&auto=format&fit=crop',
    audioSrc: 'https://actions.google.com/sounds/v1/ambiences/quiet_seashore.ogg',
    duration: 210
  },
  'song3': {
    id: 'song3',
    title: 'Moonlight Sonata',
    artist: 'Piano Master',
    album: 'Chill Vibes',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1074&auto=format&fit=crop',
    audioSrc: 'https://actions.google.com/sounds/v1/ambiences/nighttime_crickets.ogg',
    duration: 195
  },
  'song4': {
    id: 'song4',
    title: 'Gentle Rain',
    artist: 'Nature Sounds',
    album: 'Chill Vibes',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1074&auto=format&fit=crop',
    audioSrc: 'https://actions.google.com/sounds/v1/weather/heavy_rain.ogg',
    duration: 178
  },
  'song5': {
    id: 'song5',
    title: 'Forest Whispers',
    artist: 'Zen Masters',
    album: 'Chill Vibes',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1074&auto=format&fit=crop',
    audioSrc: 'https://actions.google.com/sounds/v1/ambiences/forest.ogg',
    duration: 220
  },
  'song6': {
    id: 'song6',
    title: 'Power Up',
    artist: 'Fitness Beats',
    album: 'Workout Hits',
    coverImage: 'https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?q=80&w=1170&auto=format&fit=crop',
    audioSrc: 'https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg',
    duration: 158
  },
  'song7': {
    id: 'song7',
    title: 'Run Faster',
    artist: 'Cardio Kings',
    album: 'Workout Hits',
    coverImage: 'https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?q=80&w=1170&auto=format&fit=crop',
    audioSrc: 'https://actions.google.com/sounds/v1/sports/basketball_bounce_and_sneaker_squeak.ogg',
    duration: 175
  },
  'song8': {
    id: 'song8',
    title: 'Lift Heavy',
    artist: 'Gym Heroes',
    album: 'Workout Hits',
    coverImage: 'https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?q=80&w=1170&auto=format&fit=crop',
    audioSrc: 'https://actions.google.com/sounds/v1/sports/force_impact.ogg',
    duration: 190
  },
  'song9': {
    id: 'song9',
    title: 'Final Sprint',
    artist: 'Endurance',
    album: 'Workout Hits',
    coverImage: 'https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?q=80&w=1170&auto=format&fit=crop',
    audioSrc: 'https://actions.google.com/sounds/v1/transportation/propeller_plane_smooth.ogg',
    duration: 202
  },
  'song10': {
    id: 'song10',
    title: 'Deep Focus',
    artist: 'Concentration',
    album: 'Focus Flow',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1170&auto=format&fit=crop',
    audioSrc: 'https://actions.google.com/sounds/v1/ambiences/piano_melody.ogg',
    duration: 232
  },
  'song11': {
    id: 'song11',
    title: 'Productive Mind',
    artist: 'Brain Waves',
    album: 'Focus Flow',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1170&auto=format&fit=crop',
    audioSrc: 'https://actions.google.com/sounds/v1/ambiences/office.ogg',
    duration: 186
  },
  'song12': {
    id: 'song12',
    title: 'Clear Thoughts',
    artist: 'Mind Master',
    album: 'Focus Flow',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1170&auto=format&fit=crop',
    audioSrc: 'https://actions.google.com/sounds/v1/ambiences/ambient_hum.ogg',
    duration: 215
  },
};

// Function to get songs for a playlist
export const getPlaylistSongs = (playlistId: string) => {
  const playlist = playlists.find(p => p.id === playlistId);
  if (!playlist) return [];
  
  return playlist.songs.map(songId => songs[songId]).filter(Boolean);
};

// Recently played songs (mock data)
export const recentlyPlayed = [
  songs['song1'],
  songs['song6'],
  songs['song10'],
  songs['song3']
];

// New releases (mock data)
export const newReleases = [
  songs['song5'],
  songs['song7'],
  songs['song11'],
  songs['song9']
];

// Function to search songs (mock implementation)
export const searchSongs = (query: string) => {
  if (!query) return [];
  
  const lowercaseQuery = query.toLowerCase();
  return Object.values(songs).filter(song => 
    song.title.toLowerCase().includes(lowercaseQuery) ||
    song.artist.toLowerCase().includes(lowercaseQuery) ||
    song.album.toLowerCase().includes(lowercaseQuery)
  );
};

// For user profile (mock data)
export const userProfile = {
  name: 'Music Lover',
  email: 'user@example.com',
  profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop',
  favorites: [songs['song2'], songs['song7'], songs['song11']],
  recentlyPlayed: [songs['song1'], songs['song6'], songs['song10']],
  createdPlaylists: [playlists[0], playlists[2]]
};
