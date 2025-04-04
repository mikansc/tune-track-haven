
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

// Types
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Friend {
  id: string;
  name: string;
  profileImage: string;
  isOnline: boolean;
  currentSong?: {
    title: string;
    artist: string;
  };
}

interface SocialContextType {
  friends: Friend[];
  messages: Message[];
  unreadCount: number;
  activeChat: Friend | null;
  sendMessage: (to: string, content: string) => void;
  setActiveChat: (friend: Friend | null) => void;
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
  markMessagesAsRead: (friendId: string) => void;
}

const SocialContext = createContext<SocialContextType | undefined>(undefined);

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (context === undefined) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
};

// Mock data for friends with current songs
const initialFriends: Friend[] = [
  {
    id: "1",
    name: "Alex Johnson",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    isOnline: true,
    currentSong: {
      title: "Blinding Lights",
      artist: "The Weeknd"
    }
  },
  {
    id: "2",
    name: "Emma Williams",
    profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
    isOnline: false,
    currentSong: {
      title: "As It Was",
      artist: "Harry Styles"
    }
  },
  {
    id: "3",
    name: "Jason Smith",
    profileImage: "https://randomuser.me/api/portraits/men/47.jpg",
    isOnline: true,
    currentSong: {
      title: "Cruel Summer",
      artist: "Taylor Swift"
    }
  },
  {
    id: "4",
    name: "Sofia Garcia",
    profileImage: "https://randomuser.me/api/portraits/women/63.jpg",
    isOnline: true
  }
];

// Mock initial messages
const initialMessages: Message[] = [
  {
    id: "m1",
    senderId: "1",
    receiverId: "current-user",
    content: "Hey, how's it going?",
    timestamp: new Date(Date.now() - 3600000),
    read: false
  },
  {
    id: "m2",
    senderId: "current-user",
    receiverId: "1",
    content: "I'm good! Just listening to some new music.",
    timestamp: new Date(Date.now() - 3500000),
    read: true
  },
  {
    id: "m3",
    senderId: "2",
    receiverId: "current-user",
    content: "Have you heard the new album yet?",
    timestamp: new Date(Date.now() - 86400000),
    read: false
  },
  {
    id: "m4",
    senderId: "3",
    receiverId: "current-user",
    content: "Check out this playlist I made!",
    timestamp: new Date(Date.now() - 172800000),
    read: true
  }
];

export const SocialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [friends, setFriends] = useState<Friend[]>(initialFriends);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [activeChat, setActiveChat] = useState<Friend | null>(null);
  const { toast } = useToast();

  // Calculate unread messages count
  const unreadCount = messages.filter(msg => msg.receiverId === "current-user" && !msg.read).length;

  // Send a new message
  const sendMessage = (to: string, content: string) => {
    if (!content.trim()) return;
    
    const newMessage: Message = {
      id: `m${Date.now()}`,
      senderId: "current-user",
      receiverId: to,
      content,
      timestamp: new Date(),
      read: true
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate response after delay
    if (Math.random() > 0.3) {
      setTimeout(() => {
        const recipient = friends.find(f => f.id === to);
        const responseContent = [
          `Yeah, I've been listening to ${recipient?.currentSong?.title || "some great music"} lately!`,
          "Cool! What are you up to?",
          "I'll check it out!",
          "Have you heard this new song?"
        ];
        
        const responseMsg: Message = {
          id: `m${Date.now() + 1}`,
          senderId: to,
          receiverId: "current-user",
          content: responseContent[Math.floor(Math.random() * responseContent.length)],
          timestamp: new Date(),
          read: false
        };
        
        setMessages(prev => [...prev, responseMsg]);
        
        toast({
          title: `New message from ${recipient?.name}`,
          description: responseMsg.content.substring(0, 30) + (responseMsg.content.length > 30 ? '...' : ''),
        });
      }, 2000 + Math.random() * 3000);
    }
  };

  // Mark messages from a friend as read
  const markMessagesAsRead = (friendId: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.senderId === friendId && msg.receiverId === "current-user" && !msg.read
          ? { ...msg, read: true }
          : msg
      )
    );
  };

  // Follow a new user
  const followUser = (userId: string) => {
    // In a real app, this would make an API call
    toast({
      title: "User followed",
      description: "You are now following this user"
    });
  };

  // Unfollow a user
  const unfollowUser = (userId: string) => {
    // In a real app, this would make an API call
    toast({
      title: "User unfollowed",
      description: "You are no longer following this user"
    });
  };

  // Simulate friends' currently playing songs changing
  useEffect(() => {
    const interval = setInterval(() => {
      const songPool = [
        { title: "Blinding Lights", artist: "The Weeknd" },
        { title: "As It Was", artist: "Harry Styles" },
        { title: "Cruel Summer", artist: "Taylor Swift" },
        { title: "Bad Guy", artist: "Billie Eilish" },
        { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars" },
        { title: "Shape of You", artist: "Ed Sheeran" },
        { title: "Levitating", artist: "Dua Lipa" },
        { title: "Stay", artist: "The Kid LAROI & Justin Bieber" }
      ];
      
      setFriends(prev => 
        prev.map(friend => ({
          ...friend,
          currentSong: Math.random() > 0.3 
            ? songPool[Math.floor(Math.random() * songPool.length)]
            : friend.currentSong
        }))
      );
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <SocialContext.Provider value={{
      friends,
      messages,
      unreadCount,
      activeChat,
      sendMessage,
      setActiveChat,
      followUser,
      unfollowUser,
      markMessagesAsRead
    }}>
      {children}
    </SocialContext.Provider>
  );
};
