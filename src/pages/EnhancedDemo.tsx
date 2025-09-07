import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CropDemoForm } from '@/components/CropDemoForm';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ConfidenceDisplay } from '@/components/ConfidenceDisplay';
import { FeedbackWidget } from '@/components/FeedbackWidget';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Wifi, WifiOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { mlService } from '@/services/mlService';
import { offlineService } from '@/services/offlineService';

const EnhancedDemo = () => {
  const { t } = useTranslation();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const navigate = useNavigate();

  const handleFormSubmit = async (formData: any) => {
    setIsAnalyzing(true);
    
    try {
      toast({
        title: t('demo.analyzing'),
        description: "AI processing crop image...",
      });

      // Use ML service for prediction
      const prediction = await mlService.predict(formData.image);
      
      // Save advisory offline
      const advisory = {
        id: `adv_${Date.now()}`,
        timestamp: Date.now(),
        prediction,
        location: formData.location,
        cropType: formData.cropType,
        symptoms: formData.symptoms
      };
      
      await offlineService.saveAdvisory(advisory);
      setAnalysisResult({ prediction, advisoryId: advisory.id });
      
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('back')}
            </Button>
            <h1 className="text-xl font-semibold">{t('demo.title')}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {isOffline ? <WifiOff className="h-4 w-4 text-muted-foreground" /> : <Wifi className="h-4 w-4 text-primary" />}
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-6">
        {isAnalyzing ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <h2 className="text-2xl font-semibold mb-2">{t('demo.analyzing')}</h2>
            <p className="text-muted-foreground">AI model processing...</p>
          </div>
        ) : analysisResult ? (
          <div className="space-y-6">
            <ConfidenceDisplay prediction={analysisResult.prediction} />
            <FeedbackWidget advisoryId={analysisResult.advisoryId} />
            <Button onClick={() => setAnalysisResult(null)} className="w-full">
              {t('results.newAnalysis')}
            </Button>
          </div>
        ) : (
          <CropDemoForm onSubmit={handleFormSubmit} />
        )}
      </main>
    </div>
  );
};

export default EnhancedDemo;