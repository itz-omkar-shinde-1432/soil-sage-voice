import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ResultsPage } from '@/components/ResultsPage';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Share } from 'lucide-react';

const Results = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en-US');
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get analysis data from navigation state
  const analysisData = location.state?.analysisData || {
    disease: {
      name: "No disease detected",
      confidence: 95,
      severity: "low"
    },
    treatment: {
      chemical: "No treatment required",
      organic: "Continue preventive care",
      dosage: {
        perAcre: "N/A",
        frequency: "N/A"
      }
    },
    marketPrice: {
      current: 2500,
      trend: "stable",
      forecast: "Market stable for next month"
    },
    preventive: [
      "Regular field monitoring",
      "Proper irrigation management",
      "Balanced fertilization"
    ]
  };

  const handleNewAnalysis = () => {
    navigate('/demo');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/demo')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Demo
            </Button>
            <h1 className="text-xl font-semibold">Analysis Results</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <LanguageSwitcher 
              currentLanguage={currentLanguage}
              onLanguageChange={setCurrentLanguage}
            />
          </div>
        </div>
      </header>

      {/* Results */}
      <main className="container mx-auto px-4 py-8">
        <ResultsPage 
          results={analysisData}
          currentLanguage={currentLanguage}
          onNewAnalysis={handleNewAnalysis}
        />
      </main>
    </div>
  );
};

export default Results;