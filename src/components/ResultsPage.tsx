import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, TrendingUp, Droplets, Calculator } from "lucide-react";
import { useTranslation } from "./LanguageSwitcher";

interface ResultsPageProps {
  results: AnalysisResults;
  currentLanguage: string;
  onNewAnalysis: () => void;
  className?: string;
}

interface AnalysisResults {
  disease: {
    name: string;
    confidence: number;
    severity: 'low' | 'medium' | 'high';
  };
  treatment: {
    chemical: string;
    organic: string;
    dosage: {
      perAcre: string;
      frequency: string;
    };
  };
  marketPrice: {
    current: number;
    trend: 'up' | 'down' | 'stable';
    forecast: string;
  };
  preventive: string[];
}

export const ResultsPage: React.FC<ResultsPageProps> = ({
  results,
  currentLanguage,
  onNewAnalysis,
  className
}) => {
  const { t } = useTranslation(currentLanguage);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-success';
      case 'medium': return 'bg-warning';
      case 'high': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-success" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-destructive rotate-180" />;
      default: return <TrendingUp className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className={`space-y-6 max-w-4xl mx-auto ${className}`}>
      
      {/* Disease Detection Results */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            {t('disease')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <h3 className="text-xl font-semibold">{results.disease.name}</h3>
            <Badge className={getSeverityColor(results.disease.severity)}>
              {results.disease.confidence}% confidence
            </Badge>
            <Badge variant="outline">
              {results.disease.severity.toUpperCase()} severity
            </Badge>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              AI analysis detected {results.disease.name} with {results.disease.confidence}% confidence.
              This is a {results.disease.severity} severity case requiring immediate attention.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Treatment Recommendations */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-primary" />
            {t('remedy')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Chemical Treatment */}
            <div className="space-y-3">
              <h4 className="font-semibold text-destructive">Chemical Treatment</h4>
              <div className="bg-gradient-card p-4 rounded-lg">
                <p className="font-medium">{results.treatment.chemical}</p>
                <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <p>Dosage: {results.treatment.dosage.perAcre}</p>
                  <p>Frequency: {results.treatment.dosage.frequency}</p>
                </div>
              </div>
            </div>

            {/* Organic Treatment */}
            <div className="space-y-3">
              <h4 className="font-semibold text-success">Organic Alternative</h4>
              <div className="bg-gradient-card p-4 rounded-lg">
                <p className="font-medium">{results.treatment.organic}</p>
                <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <p>Safer for environment</p>
                  <p>Cost-effective option</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dosage Calculator */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-accent" />
            {t('dosage')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-accent/10 p-4 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-accent">2.5L</p>
                <p className="text-sm text-muted-foreground">Per Acre</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">3x</p>
                <p className="text-sm text-muted-foreground">Applications</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">7 days</p>
                <p className="text-sm text-muted-foreground">Interval</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">₹450</p>
                <p className="text-sm text-muted-foreground">Total Cost</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Prices */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getTrendIcon(results.marketPrice.trend)}
            {t('marketPrice')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-primary">₹{results.marketPrice.current}/quintal</p>
              <p className="text-sm text-muted-foreground">{results.marketPrice.forecast}</p>
            </div>
            <Badge variant={results.marketPrice.trend === 'up' ? 'default' : 'destructive'}>
              {results.marketPrice.trend.toUpperCase()}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Preventive Measures */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            Preventive Measures
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {results.preventive.map((measure, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <span className="text-sm">{measure}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button onClick={onNewAnalysis} size="lg" className="bg-gradient-primary">
          New Analysis
        </Button>
        <Button variant="outline" size="lg">
          Save Report
        </Button>
        <Button variant="outline" size="lg">
          Share Results
        </Button>
      </div>
    </div>
  );
};