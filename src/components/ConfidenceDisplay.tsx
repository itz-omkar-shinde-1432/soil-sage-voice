import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { PredictionResult } from '@/services/mlService';

interface ConfidenceDisplayProps {
  prediction: PredictionResult;
  className?: string;
}

export const ConfidenceDisplay: React.FC<ConfidenceDisplayProps> = ({
  prediction,
  className
}) => {
  const { t } = useTranslation();
  
  const getConfidenceColor = (confidence: number, isUncertain: boolean) => {
    if (isUncertain) return 'destructive';
    if (confidence >= 0.9) return 'default';
    if (confidence >= 0.8) return 'secondary';
    return 'outline';
  };

  const getConfidenceIcon = (isUncertain: boolean) => {
    return isUncertain ? (
      <AlertTriangle className="h-4 w-4" />
    ) : (
      <CheckCircle className="h-4 w-4" />
    );
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getConfidenceIcon(prediction.isUncertain)}
          {t('results.confidence')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Confidence Score */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{prediction.label}</span>
          <Badge variant={getConfidenceColor(prediction.confidence, prediction.isUncertain)}>
            {Math.round(prediction.confidence * 100)}%
          </Badge>
        </div>

        {/* Confidence Bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              prediction.isUncertain 
                ? 'bg-destructive' 
                : 'bg-primary'
            }`}
            style={{ width: `${prediction.confidence * 100}%` }}
          />
        </div>

        {/* Uncertainty Warning */}
        {prediction.isUncertain && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-destructive mb-1">
                  {t('results.uncertain')}
                </p>
                <p className="text-muted-foreground">
                  The AI model has low confidence in this prediction. 
                  Please consult a local agricultural extension officer for professional diagnosis.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Heatmap Placeholder */}
        {prediction.heatmap && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Attention Map</h4>
            <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center text-sm text-muted-foreground">
              Heatmap visualization would appear here
            </div>
          </div>
        )}

        {/* Remediation */}
        {prediction.remediation && (
          <div className="mt-4 p-3 bg-primary/5 border border-primary/10 rounded-lg">
            <h4 className="text-sm font-medium mb-2 text-primary">
              Recommended Action
            </h4>
            <p className="text-sm text-muted-foreground">
              {prediction.remediation}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};