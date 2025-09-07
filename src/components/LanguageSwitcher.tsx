import React from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  className?: string;
}

export const languages = [
  { code: 'en-US', name: 'English', native: 'English' },
  { code: 'hi-IN', name: 'Hindi', native: 'हिंदी' },
  { code: 'mr-IN', name: 'Marathi', native: 'मराठी' },
];

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLanguage,
  onLanguageChange,
  className
}) => {
  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Globe className="h-4 w-4 text-muted-foreground" />
      <Select value={currentLanguage} onValueChange={onLanguageChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((language) => (
            <SelectItem key={language.code} value={language.code}>
              <span className="font-medium">{language.native}</span>
              <span className="text-sm text-muted-foreground ml-2">({language.name})</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

// Translation hook (simplified version)
export const useTranslation = (language: string) => {
  const translations = {
    'en-US': {
      title: 'Smart Crop Advisory',
      subtitle: 'AI-powered farming guidance for small and marginal farmers',
      uploadImage: 'Upload Crop Image',
      selectLocation: 'Select Location',
      selectCrop: 'Select Crop Type',
      getAdvice: 'Get Advisory',
      recording: 'Recording...',
      results: 'Analysis Results',
      disease: 'Disease Detected',
      remedy: 'Recommended Treatment',
      dosage: 'Dosage Calculator',
      marketPrice: 'Market Prices',
    },
    'hi-IN': {
      title: 'स्मार्ट फसल सलाहकार',
      subtitle: 'छोटे और सीमांत किसानों के लिए AI-संचालित कृषि मार्गदर्शन',
      uploadImage: 'फसल की तस्वीर अपलोड करें',
      selectLocation: 'स्थान चुनें',
      selectCrop: 'फसल का प्रकार चुनें',
      getAdvice: 'सलाह प्राप्त करें',
      recording: 'रिकॉर्डिंग...',
      results: 'विश्लेषण परिणाम',
      disease: 'रोग का पता चला',
      remedy: 'अनुशंसित उपचार',
      dosage: 'खुराक कैलकुलेटर',
      marketPrice: 'बाजार मूल्य',
    },
    'mr-IN': {
      title: 'स्मार्ट पीक सल्लागार',
      subtitle: 'लहान आणि सीमांत शेतकऱ्यांसाठी AI-चालित शेती मार्गदर्शन',
      uploadImage: 'पिकाचा फोटो अपलोड करा',
      selectLocation: 'स्थान निवडा',
      selectCrop: 'पिकाचा प्रकार निवडा',
      getAdvice: 'सल्ला घ्या',
      recording: 'रेकॉर्डिंग...',
      results: 'विश्लेषण परिणाम',
      disease: 'रोग आढळला',
      remedy: 'शिफारस केलेला उपचार',
      dosage: 'डोस कॅल्क्युलेटर',
      marketPrice: 'बाजार किंमती',
    },
  };

  const t = (key: string) => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations['en-US']] || key;
  };

  return { t };
};