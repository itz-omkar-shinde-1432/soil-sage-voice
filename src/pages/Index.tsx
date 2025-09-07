import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSection } from '@/components/HeroSection';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

const Index = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en-US');
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/demo');
  };

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold text-white">
            Smart Crop Advisory
          </div>
          
          <div className="flex items-center gap-4">
            <LanguageSwitcher 
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
            />
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/admin')}
              className="text-white hover:bg-white/20"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection 
        onGetStarted={handleGetStarted}
        currentLanguage={currentLanguage}
      />
    </div>
  );
};

export default Index;