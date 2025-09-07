import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, CheckCircle } from 'lucide-react';
import { offlineService, Feedback } from '@/services/offlineService';

interface FeedbackWidgetProps {
  advisoryId: string;
  className?: string;
}

export const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({
  advisoryId,
  className
}) => {
  const { t } = useTranslation();
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFeedback = async (isUseful: boolean) => {
    if (feedbackGiven || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const feedback: Feedback = {
        id: `fb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        advisoryId,
        isUseful,
        timestamp: Date.now(),
        synced: false
      };

      await offlineService.saveFeedback(feedback);
      setFeedbackGiven(true);

      // Try to sync immediately if online
      if (navigator.onLine) {
        setTimeout(() => {
          offlineService.syncFeedback();
        }, 1000);
      }
    } catch (error) {
      console.error('Failed to save feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (feedbackGiven) {
    return (
      <Card className={className}>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-2 text-primary">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm font-medium">
              {t('feedback.thanks')}
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-center text-sm">
          {t('feedback.question')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4 justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFeedback(true)}
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            <ThumbsUp className="h-4 w-4" />
            {t('feedback.yes')}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFeedback(false)}
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            <ThumbsDown className="h-4 w-4" />
            {t('feedback.no')}
          </Button>
        </div>
        
        {!navigator.onLine && (
          <p className="text-xs text-muted-foreground text-center">
            {t('offline')}
          </p>
        )}
      </CardContent>
    </Card>
  );
};