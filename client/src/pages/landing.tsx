import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SparklesIcon, UserIcon, LogOutIcon, PaperclipIcon, MicIcon, EditIcon, FolderIcon, MoreVerticalIcon, PlusIcon } from 'lucide-react';
import { AuthModal } from '@/components/auth-modal';

interface User {
  id: string;
  name: string;
  email: string;
}

interface LandingPageProps {
  onCreateApp: (prompt: string, type: string) => void;
}

export function LandingPage({ onCreateApp }: LandingPageProps) {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const suggestions = [
    'Statistical significance calculator',
    'Media player app',
    'Todo list with categories',
    'Weather dashboard',
    'Recipe finder',
    'Expense tracker'
  ];

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.user) {
          setUser(data.user);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  };

  const handleAuth = (userData: User) => {
    setUser(userData);
    setShowAuthModal(false);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/viraaj/logout', { method: 'POST' });
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleSubmit = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (!inputValue.trim()) return;

    onCreateApp(inputValue, 'general');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1d23] text-white flex flex-col">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-2 text-white text-sm font-medium bg-[#1a1d23]">
        <div className="flex items-center space-x-1">
          <span>1:18</span>
          <SparklesIcon className="w-3 h-3" />
        </div>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-3 bg-white opacity-40 rounded-sm"></div>
            <div className="w-1 h-3 bg-white opacity-60 rounded-sm"></div>
            <div className="w-1 h-3 bg-white opacity-80 rounded-sm"></div>
            <div className="w-1 h-3 bg-white rounded-sm"></div>
          </div>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 7H21L19 9H5L3 7ZM1 13V11H23V13H1ZM5 15H19L21 17H3L5 15Z"/>
          </svg>
          <div className="bg-green-500 text-black px-1.5 py-0.5 rounded text-xs font-bold">76</div>
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 bg-[#242830]">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#3d4148] rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">ZO</span>
          </div>
          <span className="text-white text-base">zoravir's workspace</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white p-2"
          >
            <MoreVerticalIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-4 pb-24">
        
        {/* Greeting - Centered */}
        <div className="text-center mb-12">
          <h1 className="text-2xl font-normal text-white mb-2">
            Hi zoravir,
          </h1>
          <p className="text-xl text-gray-300 font-light">
            what do you want to make?
          </p>
        </div>

        {/* Input Section */}
        <div className="space-y-6">
          <div className="relative">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe a website or app you want to make..."
              className="w-full bg-[#242830] border border-[#3d4148] text-white placeholder-gray-400 rounded-xl p-4 min-h-[120px] resize-none focus:border-blue-500 focus:ring-0 text-base"
              style={{
                fontSize: '16px',
                lineHeight: '1.5'
              }}
            />
            
            {/* Bottom toolbar */}
            <div className="flex justify-between items-center mt-4">
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L13.09 8.26L19.35 7L17 13.74L21 19L14.74 17L8.26 21L7 14.74L1 13L7.26 12L2 7L8.26 9L12 2Z"/>
                  </svg>
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <PaperclipIcon className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <MicIcon className="w-5 h-5" />
                </Button>
              </div>
              
              <Button
                onClick={handleSubmit}
                disabled={!inputValue.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z"/>
                </svg>
                <span>Start chat</span>
              </Button>
            </div>
          </div>

          {/* Suggestion Pills */}
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
            {suggestions.slice(0, 2).map((suggestion, index) => (
              <Button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                variant="outline"
                className="bg-transparent border border-[#3d4148] text-gray-300 hover:bg-[#3d4148] hover:text-white rounded-full px-4 py-2 text-sm whitespace-nowrap flex-shrink-0"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>

        {/* Bottom Content */}
        <div className="mt-16 text-center space-y-2">
          <p className="text-gray-400 text-sm">Start creating for free</p>
          <Button variant="link" className="text-blue-400 hover:text-blue-300 text-sm p-0 underline">
            Join Replit Core to unlock more usage
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#242830] border-t border-[#3d4148] pb-4">
        <div className="flex justify-around items-center py-3">
          <div className="text-center">
            <FolderIcon className="w-6 h-6 mx-auto text-gray-400 mb-1" />
            <span className="text-xs text-gray-400">My Apps</span>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mx-auto mb-1">
              <PlusIcon className="w-5 h-5 text-black" />
            </div>
            <span className="text-xs text-white">Create</span>
          </div>
          <div className="text-center">
            <UserIcon className="w-6 h-6 mx-auto text-gray-400 mb-1" />
            <span className="text-xs text-gray-400">Account</span>
          </div>
        </div>
        
        {/* Home indicator */}
        <div className="flex justify-center pt-2">
          <div className="w-32 h-1 bg-white rounded-full"></div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuth}
      />
    </div>
  );
}