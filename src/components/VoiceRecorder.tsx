import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceRecorderProps {
  onTranscript?: (text: string) => void;
  onLanguageChange?: (lang: string) => void;
  currentLanguage?: string;
  className?: string;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  onTranscript,
  onLanguageChange,
  currentLanguage = 'en-US',
  className
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Check for speech recognition support
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = currentLanguage;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onTranscript?.(transcript);
        setIsRecording(false);
      };

      recognitionRef.current.onerror = () => {
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, [currentLanguage, onTranscript]);

  const startRecording = () => {
    if (recognitionRef.current && !isRecording) {
      recognitionRef.current.lang = currentLanguage;
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage;
      speechSynthesis.speak(utterance);
    }
  };

  if (!isSupported) {
    return (
      <div className={cn("text-center p-4 bg-muted rounded-lg", className)}>
        <p className="text-sm text-muted-foreground">
          Voice features are not supported in this browser
        </p>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Button
        variant={isRecording ? "destructive" : "default"}
        size="lg"
        onClick={isRecording ? stopRecording : startRecording}
        className={cn(
          "min-w-[140px] transition-all duration-300",
          isRecording && "animate-pulse shadow-voice"
        )}
      >
        {isRecording ? (
          <>
            <MicOff className="mr-2 h-5 w-5" />
            Stop Recording
          </>
        ) : (
          <>
            <Mic className="mr-2 h-5 w-5" />
            Start Voice
          </>
        )}
      </Button>

      <Button
        variant="outline"
        size="lg"
        onClick={() => speak("Welcome to Smart Crop Advisory. How can I help you today?")}
        className="min-w-[120px]"
      >
        <Volume2 className="mr-2 h-4 w-4" />
        Test Voice
      </Button>
    </div>
  );
};