import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      "home": "Home",
      "demo": "Demo",
      "admin": "Admin",
      
      // Hero Section
      "hero.title": "Smart Crop Advisory",
      "hero.subtitle": "AI-powered crop disease detection and farming guidance for small farmers",
      "hero.cta": "Try Demo",
      "hero.features": "Voice-enabled • Multilingual • Offline capable",
      
      // Demo Form
      "demo.title": "Crop Analysis",
      "demo.upload": "Upload Crop Image",
      "demo.location": "Select Location",
      "demo.cropType": "Crop Type",
      "demo.farmSize": "Farm Size (acres)",
      "demo.symptoms": "Describe Symptoms",
      "demo.analyze": "Analyze Crop",
      "demo.analyzing": "Analyzing...",
      
      // Voice
      "voice.start": "Start Voice",
      "voice.stop": "Stop Recording", 
      "voice.test": "Test Voice",
      "voice.testMessage": "Welcome to Smart Crop Advisory. How can I help you today?",
      "voice.notSupported": "Voice features are not supported in this browser",
      
      // Results
      "results.title": "Analysis Results",
      "results.confidence": "Confidence",
      "results.disease": "Disease Detected",
      "results.treatment": "Treatment",
      "results.uncertain": "Uncertain — consult extension officer",
      "results.newAnalysis": "New Analysis",
      
      // Feedback
      "feedback.question": "Was this analysis helpful?",
      "feedback.yes": "Yes, helpful",
      "feedback.no": "No, not helpful",
      "feedback.thanks": "Thank you for your feedback!",
      
      // Common
      "loading": "Loading...",
      "error": "Something went wrong",
      "offline": "Offline - using cached data",
      "back": "Back"
    }
  },
  hi: {
    translation: {
      "home": "होम",
      "demo": "डेमो",
      "admin": "एडमिन",
      
      "hero.title": "स्मार्ट फसल सलाह",
      "hero.subtitle": "छोटे किसानों के लिए AI-संचालित फसल रोग की पहचान और कृषि मार्गदर्शन",
      "hero.cta": "डेमो आजमाएं",
      "hero.features": "आवाज सक्षम • बहुभाषी • ऑफलाइन सक्षम",
      
      "demo.title": "फसल विश्लेषण",
      "demo.upload": "फसल की तस्वीर अपलोड करें",
      "demo.location": "स्थान चुनें",
      "demo.cropType": "फसल का प्रकार",
      "demo.farmSize": "खेत का आकार (एकड़)",
      "demo.symptoms": "लक्षणों का वर्णन करें",
      "demo.analyze": "फसल का विश्लेषण करें",
      "demo.analyzing": "विश्लेषण हो रहा है...",
      
      "voice.start": "आवाज शुरू करें",
      "voice.stop": "रिकॉर्डिंग रोकें",
      "voice.test": "आवाज परखें",
      "voice.testMessage": "स्मार्ट फसल सलाह में आपका स्वागत है। आज मैं आपकी कैसे सहायता कर सकता हूं?",
      "voice.notSupported": "इस ब्राउज़र में आवाज सुविधाएं समर्थित नहीं हैं",
      
      "results.title": "विश्लेषण परिणाम",
      "results.confidence": "विश्वास",
      "results.disease": "रोग का पता चला",
      "results.treatment": "इलाज",
      "results.uncertain": "अनिश्चित — विस्तार अधिकारी से सलाह लें",
      "results.newAnalysis": "नया विश्लेषण",
      
      "feedback.question": "क्या यह विश्लेषण सहायक था?",
      "feedback.yes": "हाँ, सहायक",
      "feedback.no": "नहीं, सहायक नहीं",
      "feedback.thanks": "आपकी प्रतिक्रिया के लिए धन्यवाद!",
      
      "loading": "लोड हो रहा है...",
      "error": "कुछ गलत हुआ",
      "offline": "ऑफलाइन - कैश्ड डेटा का उपयोग",
      "back": "वापस"
    }
  },
  mr: {
    translation: {
      "home": "होम",
      "demo": "डेमो", 
      "admin": "अॅडमिन",
      
      "hero.title": "स्मार्ट पीक सल्ला",
      "hero.subtitle": "लहान शेतकऱ्यांसाठी AI-चालित पीक रोग ओळख आणि शेती मार्गदर्शन",
      "hero.cta": "डेमो वापरून पहा",
      "hero.features": "आवाज सक्षम • बहुभाषी • ऑफलाइन सक्षम",
      
      "demo.title": "पीक विश्लेषण",
      "demo.upload": "पिकाचा फोटो अपलोड करा",
      "demo.location": "स्थान निवडा",
      "demo.cropType": "पिकाचा प्रकार",
      "demo.farmSize": "शेताचे क्षेत्रफळ (एकर)",
      "demo.symptoms": "लक्षणांचे वर्णन करा",
      "demo.analyze": "पिकाचे विश्लेषण करा",
      "demo.analyzing": "विश्लेषण होत आहे...",
      
      "voice.start": "आवाज सुरू करा",
      "voice.stop": "रेकॉर्डिंग थांबवा",
      "voice.test": "आवाज तपासा",
      "voice.testMessage": "स्मार्ट पीक सल्ल्यामध्ये आपले स्वागत आहे। आज मी आपली कशी मदत करू शकतो?",
      "voice.notSupported": "या ब्राउझरमध्ये आवाज वैशिष्ट्ये समर्थित नाहीत",
      
      "results.title": "विश्लेषण परिणाम",
      "results.confidence": "विश्वास",
      "results.disease": "रोगाची ओळख",
      "results.treatment": "उपचार",
      "results.uncertain": "अनिश्चित — विस्तार अधिकाऱ्याचा सल्ला घ्या",
      "results.newAnalysis": "नवीन विश्लेषण",
      
      "feedback.question": "हे विश्लेषण उपयुक्त होते का?",
      "feedback.yes": "होय, उपयुक्त",
      "feedback.no": "नाही, उपयुक्त नाही",
      "feedback.thanks": "आपल्या फीडबॅकबद्दल धन्यवाद!",
      
      "loading": "लोड होत आहे...",
      "error": "काहीतरी चूक झाली",
      "offline": "ऑफलाइन - कॅश्ड डेटा वापरत आहे",
      "back": "परत"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;