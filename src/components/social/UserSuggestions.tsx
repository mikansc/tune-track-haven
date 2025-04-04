
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserPlus, MessageSquare } from "lucide-react";
import { useSocial } from '@/contexts/SocialContext';

const UserSuggestions = () => {
  const { followUser, setActiveChat, friends } = useSocial();
  
  // Mock suggestions - in a real app this would come from an API
  const suggestions = [
    {
      id: "s1",
      name: "Michael Brown",
      profileImage: "https://randomuser.me/api/portraits/men/22.jpg",
      mutualFriends: 3
    },
    {
      id: "s2",
      name: "Olivia Chen",
      profileImage: "https://randomuser.me/api/portraits/women/29.jpg",
      mutualFriends: 1
    },
    {
      id: "s3",
      name: "David Wilson",
      profileImage: "https://randomuser.me/api/portraits/men/53.jpg",
      mutualFriends: 5
    }
  ];
  
  const handleMessage = (friendId: string) => {
    const friend = friends.find(f => f.id === friendId);
    if (friend) {
      setActiveChat(friend);
    }
  };
  
  return (
    <div className="bg-music-card rounded-lg p-4 mb-8">
      <h3 className="text-lg font-semibold mb-4">Suggested for you</h3>
      
      <div className="space-y-4">
        {suggestions.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.profileImage} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium">{user.name}</h4>
                <p className="text-xs text-music-text-secondary">
                  {user.mutualFriends} mutual {user.mutualFriends === 1 ? 'friend' : 'friends'}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 border-gray-700 px-2"
                onClick={() => handleMessage(user.id)}
              >
                <MessageSquare size={14} />
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className="h-8"
                onClick={() => followUser(user.id)}
              >
                <UserPlus size={14} className="mr-1" />
                Follow
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSuggestions;
