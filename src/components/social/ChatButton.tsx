
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { useSocial } from '@/contexts/SocialContext';

interface ChatButtonProps {
  onClick: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  const { unreadCount } = useSocial();
  
  return (
    <div className="fixed bottom-24 right-4 z-40">
      <Button 
        className="h-14 w-14 rounded-full shadow-lg bg-music-primary hover:bg-music-primary/90"
        onClick={onClick}
      >
        <MessageSquare size={20} />
        {unreadCount > 0 && (
          <span className={cn(
            "absolute -top-1 -right-1 bg-red-500 text-white",
            "rounded-full text-xs font-bold h-5 min-w-[20px] flex items-center justify-center px-1"
          )}>
            {unreadCount}
          </span>
        )}
      </Button>
    </div>
  );
};

export default ChatButton;
