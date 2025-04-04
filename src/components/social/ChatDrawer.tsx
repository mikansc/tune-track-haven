
import React, { useState, useRef, useEffect } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Music, UserPlus, Send, Plus, Volume2 } from "lucide-react";
import { useSocial, Friend, Message } from "@/contexts/SocialContext";
import { cn } from "@/lib/utils";
import { useAudio } from '@/contexts/AudioContext';

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatDrawer: React.FC<ChatDrawerProps> = ({ isOpen, onClose }) => {
  const { 
    friends, 
    messages, 
    activeChat, 
    setActiveChat, 
    sendMessage, 
    markMessagesAsRead,
    followUser
  } = useSocial();
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentSong } = useAudio();

  // Filter messages for active chat
  const chatMessages = activeChat 
    ? messages.filter(
        msg => 
          (msg.senderId === activeChat.id && msg.receiverId === "current-user") || 
          (msg.senderId === "current-user" && msg.receiverId === activeChat.id)
      ).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
    : [];

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Handle sending message
  const handleSendMessage = () => {
    if (activeChat && messageInput.trim()) {
      sendMessage(activeChat.id, messageInput);
      setMessageInput("");
    }
  };

  // Mark messages as read when chat is opened
  useEffect(() => {
    if (activeChat) {
      markMessagesAsRead(activeChat.id);
    }
  }, [activeChat, markMessagesAsRead]);

  // Scroll to bottom of messages when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[90vh] rounded-t-xl">
        <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
        
        <Tabs defaultValue="chats" className="w-full">
          <DrawerHeader className="px-4">
            <TabsList className="w-full">
              <TabsTrigger value="chats" className="flex-1">Chats</TabsTrigger>
              <TabsTrigger value="following" className="flex-1">Following</TabsTrigger>
            </TabsList>
          </DrawerHeader>
          
          <TabsContent value="chats" className="px-4 mt-0">
            {activeChat ? (
              <div className="flex flex-col h-[calc(70vh-10rem)]">
                {/* Active chat header */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={activeChat.profileImage} alt={activeChat.name} />
                      <AvatarFallback>{activeChat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{activeChat.name}</h3>
                      {activeChat.currentSong && (
                        <div className="flex items-center text-xs text-music-text-secondary">
                          <Music size={10} className="mr-1" />
                          <span className="truncate max-w-[150px]">
                            {activeChat.currentSong.title} • {activeChat.currentSong.artist}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setActiveChat(null)}>
                    Back
                  </Button>
                </div>
                
                <Separator className="my-2" />
                
                {/* Messages area */}
                <ScrollArea className="flex-1 pr-4">
                  {chatMessages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-music-text-secondary">
                      <p>No messages yet.</p>
                      <p className="text-sm">Send a message to start chatting!</p>
                    </div>
                  ) : (
                    <div className="space-y-4 py-4">
                      {chatMessages.map((message) => (
                        <div 
                          key={message.id}
                          className={cn(
                            "flex",
                            message.senderId === "current-user" ? "justify-end" : "justify-start"
                          )}
                        >
                          <div 
                            className={cn(
                              "max-w-[75%] rounded-lg px-4 py-2",
                              message.senderId === "current-user" 
                                ? "bg-music-primary text-white" 
                                : "bg-gray-800"
                            )}
                          >
                            <p>{message.content}</p>
                            <p className={cn(
                              "text-xs mt-1",
                              message.senderId === "current-user" 
                                ? "text-white/70" 
                                : "text-music-text-secondary"
                            )}>
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </ScrollArea>
                
                {/* Message input */}
                <div className="flex items-center space-x-2 pt-4">
                  <Input 
                    placeholder="Type a message..." 
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!messageInput.trim()}>
                    <Send size={18} />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Recent</h3>
                  <Button variant="ghost" size="sm">
                    <Plus size={16} className="mr-1" /> New Chat
                  </Button>
                </div>
                
                <ScrollArea className="h-[60vh] pr-4">
                  {friends.map((friend) => {
                    // Get last message with this friend
                    const lastMessage = [...messages]
                      .filter(msg => 
                        (msg.senderId === friend.id && msg.receiverId === "current-user") ||
                        (msg.senderId === "current-user" && msg.receiverId === friend.id)
                      )
                      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];
                    
                    // Count unread messages
                    const unreadCount = messages.filter(
                      msg => msg.senderId === friend.id && 
                      msg.receiverId === "current-user" && 
                      !msg.read
                    ).length;
                    
                    return (
                      <div 
                        key={friend.id}
                        onClick={() => setActiveChat(friend)}
                        className="flex items-center justify-between p-3 rounded-md hover:bg-gray-800 cursor-pointer"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={friend.profileImage} alt={friend.name} />
                              <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {friend.isOnline && (
                              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center">
                              <h4 className="font-medium">{friend.name}</h4>
                              {friend.currentSong && (
                                <div className="ml-2 text-xs bg-music-card px-1.5 py-0.5 rounded-full flex items-center">
                                  <Volume2 size={10} className="mr-1" />
                                  <span className="truncate max-w-[80px]">{friend.currentSong.title}</span>
                                </div>
                              )}
                            </div>
                            {lastMessage && (
                              <p className="text-sm text-music-text-secondary truncate max-w-[200px]">
                                {lastMessage.senderId === "current-user" ? "You: " : ""}
                                {lastMessage.content}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        {unreadCount > 0 && (
                          <Badge variant="default" className="bg-music-primary">
                            {unreadCount}
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                </ScrollArea>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="following" className="px-4 mt-0">
            <div className="py-4">
              <h3 className="text-lg font-semibold mb-4">Following</h3>
              
              <ScrollArea className="h-[60vh] pr-4">
                <div className="space-y-4">
                  {friends.map((friend) => (
                    <div key={friend.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={friend.profileImage} alt={friend.name} />
                          <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{friend.name}</h4>
                          {friend.currentSong ? (
                            <div className="flex items-center text-xs text-music-text-secondary">
                              <Music size={10} className="mr-1" />
                              <span className="truncate max-w-[150px]">
                                {friend.currentSong.title} • {friend.currentSong.artist}
                              </span>
                            </div>
                          ) : (
                            <p className="text-xs text-music-text-secondary">Not playing any music</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="h-8 border-gray-700"
                          onClick={() => setActiveChat(friend)}
                        >
                          Message
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border border-dashed border-gray-700 rounded-md p-4 text-center">
                    <h4 className="font-medium mb-2">Discover More Friends</h4>
                    <p className="text-sm text-music-text-secondary mb-3">
                      Connect with other music enthusiasts
                    </p>
                    <Button variant="default" size="sm" onClick={() => followUser("new")}>
                      <UserPlus size={16} className="mr-2" />
                      Find Friends
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
        
        <DrawerFooter>
          {!activeChat && (
            <div className="px-4 py-2 bg-music-card rounded-md">
              <h4 className="font-medium text-sm">Your listening activity</h4>
              {currentSong ? (
                <div className="flex items-center text-sm text-music-text-secondary mt-1">
                  <Music size={14} className="mr-1 text-music-primary" />
                  <span className="truncate">
                    {currentSong.title} • {currentSong.artist}
                  </span>
                </div>
              ) : (
                <p className="text-sm text-music-text-secondary mt-1">
                  Not playing any music
                </p>
              )}
            </div>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ChatDrawer;
