import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Shield, TrendingUp, Users } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
  currentLanguage: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted, currentLanguage }) => {
  const features = [
    {
      icon: <Leaf className="h-6 w-6" />,
      title: "AI Disease Detection",
      description: "Advanced image recognition for instant crop disease identification"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Voice-First Interface",
      description: "Multilingual voice support for easy accessibility"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Market Intelligence",
      description: "Real-time crop prices and market forecasts"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Expert Advisory",
      description: "Personalized farming guidance for small farmers"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          
          {/* Hero Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Smart Crop Advisory
              <span className="block text-accent text-3xl md:text-5xl mt-2">
                AI-Powered Farming Guidance
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Empowering small and marginal farmers with instant disease detection, 
              expert advisory, and market intelligence through voice-first AI technology.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={onGetStarted}
              className="group min-w-[200px]"
            >
              Try Demo Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="xl"
              className="min-w-[200px] bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              Watch Video
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">95%</div>
              <div className="text-white/80">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">10K+</div>
              <div className="text-white/80">Farmers Helped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">3</div>
              <div className="text-white/80">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">24/7</div>
              <div className="text-white/80">Support</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/15 transition-all duration-300 hover:scale-105"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent rounded-lg mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-white/80">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};