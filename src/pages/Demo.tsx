import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CropDemoForm } from '@/components/CropDemoForm';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface FormData {
  image: File | null;
  location: string;
  cropType: string;
  farmSize: string;
  symptoms: string;
}

const Demo = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en-US');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (formData: FormData) => {
    setIsAnalyzing(true);
    
    // Simulate API call
    toast({
      title: "Analyzing crop image...",
      description: "Please wait while our AI analyzes your crop.",
    });

    // Simulate processing delay
    setTimeout(() => {
      setIsAnalyzing(false);
      
      // Navigate to results with mock data
      navigate('/results', { 
        state: { 
          analysisData: {
            disease: {
              name: "Leaf Blight",
              confidence: 92,
              severity: "medium"
            },
            treatment: {
              chemical: "Copper Hydroxide 77% WP",
              organic: "Neem Oil + Baking Soda Solution",
              dosage: {
                perAcre: "2.5 kg in 500L water",
                frequency: "Every 7 days for 3 applications"
              }
            },
            marketPrice: {
              current: 2850,
              trend: "up",
              forecast: "Prices expected to rise by 8% next month"
            },
            preventive: [
              "Ensure proper drainage in fields",
              "Maintain adequate spacing between plants",
              "Apply preventive fungicide spray during monsoon",
              "Regular monitoring for early symptoms",
              "Use disease-resistant varieties"
            ]
          },
          formData 
        }
      });
    }, 3000);
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
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-xl font-semibold">Smart Crop Analysis</h1>
          </div>
          
          <LanguageSwitcher 
            currentLanguage={currentLanguage}
            onLanguageChange={setCurrentLanguage}
          />
        </div>
      </header>

      {/* Demo Form */}
      <main className="container mx-auto px-4 py-8">
        {isAnalyzing ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <h2 className="text-2xl font-semibold mb-2">Analyzing Your Crop</h2>
            <p className="text-muted-foreground">Our AI is processing the image and generating recommendations...</p>
          </div>
        ) : (
          <CropDemoForm 
            onSubmit={handleFormSubmit}
            currentLanguage={currentLanguage}
          />
        )}
      </main>
    </div>
  );
};

export default Demo;