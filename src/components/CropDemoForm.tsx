import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Camera, MapPin, Wheat } from "lucide-react";
import { VoiceRecorder } from "./VoiceRecorder";
import { useTranslation } from "./LanguageSwitcher";

interface CropDemoFormProps {
  onSubmit: (data: FormData) => void;
  currentLanguage: string;
  className?: string;
}

interface FormData {
  image: File | null;
  location: string;
  cropType: string;
  farmSize: string;
  symptoms: string;
}

const cropTypes = [
  'Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Maize', 'Tomato', 'Potato', 'Onion', 'Soybean', 'Mustard'
];

const locations = [
  'Maharashtra', 'Punjab', 'Uttar Pradesh', 'Haryana', 'Karnataka', 'Tamil Nadu', 'Gujarat', 'Rajasthan'
];

export const CropDemoForm: React.FC<CropDemoFormProps> = ({
  onSubmit,
  currentLanguage,
  className
}) => {
  const { t } = useTranslation(currentLanguage);
  const [formData, setFormData] = useState<FormData>({
    image: null,
    location: '',
    cropType: '',
    farmSize: '',
    symptoms: ''
  });
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVoiceTranscript = (text: string) => {
    setFormData(prev => ({ ...prev, symptoms: text }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className={`w-full max-w-2xl mx-auto ${className}`}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl bg-gradient-hero bg-clip-text text-transparent">
          {t('title')} Demo
        </CardTitle>
        <p className="text-muted-foreground">{t('subtitle')}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-base font-medium flex items-center gap-2">
              <Camera className="h-4 w-4" />
              {t('uploadImage')}
            </Label>
            <div 
              className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
              ) : (
                <div className="space-y-2">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">Click to upload crop image</p>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Location & Crop Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-base font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {t('selectLocation')}
              </Label>
              <Select value={formData.location} onValueChange={(value) => 
                setFormData(prev => ({ ...prev, location: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose state" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-base font-medium flex items-center gap-2">
                <Wheat className="h-4 w-4" />
                {t('selectCrop')}
              </Label>
              <Select value={formData.cropType} onValueChange={(value) => 
                setFormData(prev => ({ ...prev, cropType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose crop" />
                </SelectTrigger>
                <SelectContent>
                  {cropTypes.map((crop) => (
                    <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Farm Size */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Farm Size (acres)</Label>
            <Input
              type="number"
              placeholder="Enter farm size"
              value={formData.farmSize}
              onChange={(e) => setFormData(prev => ({ ...prev, farmSize: e.target.value }))}
            />
          </div>

          {/* Voice Input for Symptoms */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Describe Symptoms (Voice or Text)</Label>
            <div className="space-y-3">
              <VoiceRecorder 
                onTranscript={handleVoiceTranscript}
                currentLanguage={currentLanguage}
              />
              <Input
                placeholder="Or type symptoms here..."
                value={formData.symptoms}
                onChange={(e) => setFormData(prev => ({ ...prev, symptoms: e.target.value }))}
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            size="lg" 
            className="w-full bg-gradient-primary hover:shadow-lg transition-all duration-300"
            disabled={!formData.image || !formData.location || !formData.cropType}
          >
            {t('getAdvice')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};