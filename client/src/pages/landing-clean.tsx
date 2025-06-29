import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SparklesIcon, UserIcon, LogOutIcon, PaperclipIcon, MicIcon, EditIcon, FolderIcon } from 'lucide-react';
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
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col">
      {/* Top Header - Mobile Style */}
      <div className="flex justify-between items-center p-4 bg-[#161b22] border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">ZO</span>
          </div>
          <span className="text-gray-300 text-sm">zoravir's workspace</span>
        </div>
        
        <div className="flex items-center space-x-2">
          {user ? (
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <LogOutIcon className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={() => setShowAuthModal(true)}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <UserIcon className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Main Content - Centered Mobile Design */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 max-w-2xl mx-auto w-full">
        
        {/* Greeting */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-normal text-white mb-2">
            Hi {user?.name || 'zoravir'},
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light">
            what do you want to make?
          </p>
        </div>

        {/* Input Area */}
        <div className="w-full max-w-lg space-y-4">
          <div className="relative">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe a website or app you want to make..."
              className="w-full bg-[#161b22] border border-gray-700 text-white placeholder-gray-400 rounded-lg p-4 min-h-[120px] resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            
            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-3">
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <PaperclipIcon className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <MicIcon className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <EditIcon className="w-4 h-4" />
                </Button>
              </div>
              
              <Button
                onClick={handleSubmit}
                disabled={!inputValue.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Start chat
              </Button>
            </div>
          </div>

          {/* Suggestion Pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                variant="outline"
                size="sm"
                className="bg-[#161b22] border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white rounded-full px-4 py-2 text-sm"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-12 text-center text-gray-400">
          <p className="text-sm">Start creating for free</p>
          <Button variant="link" className="text-blue-400 hover:text-blue-300 text-sm p-0">
            Join Replit Core to unlock more usage
          </Button>
        </div>
        
        {/* Bottom Navigation - Mobile Only */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#161b22] border-t border-gray-800 p-4 md:hidden">
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <FolderIcon className="w-5 h-5 mx-auto text-gray-400" />
              <span className="text-xs text-gray-400 mt-1 block">My Apps</span>
            </div>
            <div className="text-center">
              <Button className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-lg p-0">
                <SparklesIcon className="w-4 h-4" />
              </Button>
              <span className="text-xs text-white mt-1 block">Create</span>
            </div>
            <div className="text-center">
              <UserIcon className="w-5 h-5 mx-auto text-gray-400" />
              <span className="text-xs text-gray-400 mt-1 block">Account</span>
            </div>
          </div>
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