
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Music } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Welcome = () => {
  useEffect(() => {
    // Simulating a loading time
    const timer = setTimeout(() => {
      const logoElement = document.querySelector('.logo-animation');
      if (logoElement) {
        logoElement.classList.add('scale-100', 'opacity-100');
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-music-background">
      <div className="w-full max-w-md mx-auto text-center">
        <div className="mb-12">
          <div className="logo-animation transform scale-90 opacity-0 transition-all duration-1000 mb-8">
            <div className="h-24 w-24 music-gradient rounded-full mx-auto flex items-center justify-center shadow-lg">
              <Music size={48} className="text-white" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">Tune Track Haven</h1>
          <p className="text-music-text-secondary mb-12">Your personal music paradise</p>
          
          <div className="flex flex-col gap-4">
            <Button asChild className="bg-music-primary hover:bg-music-primary/90 text-white py-6">
              <Link to="/login">Login</Link>
            </Button>
            
            <Button asChild variant="outline" className="border-music-primary text-music-primary hover:bg-music-primary/10 py-6">
              <Link to="/signup">Sign Up</Link>
            </Button>
            
            <Button asChild variant="ghost" className="text-music-text-secondary hover:text-music-text py-6">
              <Link to="/home">Continue as Guest</Link>
            </Button>
          </div>
        </div>
        
        <p className="text-xs text-music-text-secondary mt-8">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Welcome;
