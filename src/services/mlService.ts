import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js for browser use
env.allowLocalModels = false;
env.useBrowserCache = true;

export interface PredictionResult {
  label: string;
  confidence: number;
  heatmap?: ImageData;
  isUncertain: boolean;
  remediation?: string;
}

class MLService {
  private classifier: any = null;
  private readonly CONFIDENCE_THRESHOLD = 0.70;
  private readonly MODEL_NAME = 'Xenova/vit-base-patch16-224'; // Lightweight vision transformer

  async initialize() {
    try {
      console.log('Loading ML model...');
      this.classifier = await pipeline(
        'image-classification',
        this.MODEL_NAME,
        { device: 'webgpu' }
      );
      console.log('ML model loaded successfully');
    } catch (error) {
      console.warn('WebGPU not available, falling back to CPU');
      this.classifier = await pipeline(
        'image-classification',
        this.MODEL_NAME
      );
    }
  }

  async predict(imageFile: File): Promise<PredictionResult> {
    if (!this.classifier) {
      await this.initialize();
    }

    try {
      const imageUrl = URL.createObjectURL(imageFile);
      const results = await this.classifier(imageUrl);
      
      const topResult = results[0];
      const confidence = topResult.score;
      const isUncertain = confidence < this.CONFIDENCE_THRESHOLD;

      // Map generic labels to crop diseases (this would be replaced with actual crop disease model)
      const diseaseMapping: Record<string, string> = {
        'Egyptian cat': 'Leaf Blight',
        'tabby cat': 'Powdery Mildew', 
        'tiger cat': 'Rust Disease',
        'Persian cat': 'Bacterial Wilt',
        'Siamese cat': 'Mosaic Virus'
      };

      const remediation = this.getRemediation(topResult.label);

      URL.revokeObjectURL(imageUrl);

      return {
        label: diseaseMapping[topResult.label] || 'Unknown Disease',
        confidence,
        isUncertain,
        remediation,
        // heatmap would be generated using Grad-CAM in production
        heatmap: undefined
      };
    } catch (error) {
      console.error('ML prediction error:', error);
      throw new Error('Failed to analyze crop image');
    }
  }

  private getRemediation(disease: string): string {
    const remediations: Record<string, string> = {
      'Leaf Blight': 'Apply copper-based fungicide. Improve drainage and air circulation.',
      'Powdery Mildew': 'Use sulfur-based spray. Reduce humidity around plants.',
      'Rust Disease': 'Apply systemic fungicide. Remove infected leaves immediately.',
      'Bacterial Wilt': 'No chemical cure. Remove infected plants to prevent spread.',
      'Mosaic Virus': 'Control aphid vectors. Remove infected plants.'
    };
    
    return remediations[disease] || 'Consult local agricultural extension officer for proper diagnosis and treatment.';
  }

  async generateHeatmap(imageFile: File): Promise<ImageData | null> {
    // Placeholder for Grad-CAM implementation
    // In production, this would use attention maps from the model
    return null;
  }
}

export const mlService = new MLService();