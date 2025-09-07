import localforage from 'localforage';

export interface Advisory {
  id: string;
  timestamp: number;
  imageUrl?: string;
  prediction: any;
  location: string;
  cropType: string;
  symptoms: string;
}

export interface Feedback {
  id: string;
  advisoryId: string;
  isUseful: boolean;
  timestamp: number;
  synced: boolean;
}

class OfflineService {
  private advisoryStore: LocalForage;
  private feedbackStore: LocalForage;
  private assetStore: LocalForage;

  constructor() {
    this.advisoryStore = localforage.createInstance({
      name: 'crop-advisory',
      storeName: 'advisories'
    });

    this.feedbackStore = localforage.createInstance({
      name: 'crop-advisory', 
      storeName: 'feedback'
    });

    this.assetStore = localforage.createInstance({
      name: 'crop-advisory',
      storeName: 'assets'
    });
  }

  async saveAdvisory(advisory: Advisory): Promise<void> {
    const advisories = await this.getAdvisories();
    const updated = [advisory, ...advisories].slice(0, 5); // Keep last 5
    
    await this.advisoryStore.setItem('recent', updated);
    console.log('Advisory saved offline');
  }

  async getAdvisories(): Promise<Advisory[]> {
    return (await this.advisoryStore.getItem('recent')) || [];
  }

  async saveFeedback(feedback: Feedback): Promise<void> {
    const key = `feedback_${feedback.id}`;
    await this.feedbackStore.setItem(key, feedback);
    console.log('Feedback saved locally');
  }

  async getPendingFeedback(): Promise<Feedback[]> {
    const keys = await this.feedbackStore.keys();
    const feedback: Feedback[] = [];
    
    for (const key of keys) {
      const item = await this.feedbackStore.getItem<Feedback>(key);
      if (item && !item.synced) {
        feedback.push(item);
      }
    }
    
    return feedback;
  }

  async markFeedbackSynced(feedbackId: string): Promise<void> {
    const key = `feedback_${feedbackId}`;
    const feedback = await this.feedbackStore.getItem<Feedback>(key);
    if (feedback) {
      feedback.synced = true;
      await this.feedbackStore.setItem(key, feedback);
    }
  }

  async cacheAsset(url: string, data: Blob): Promise<void> {
    await this.assetStore.setItem(url, data);
  }

  async getCachedAsset(url: string): Promise<Blob | null> {
    return await this.assetStore.getItem(url);
  }

  async syncFeedback(): Promise<void> {
    if (!navigator.onLine) return;

    const pendingFeedback = await this.getPendingFeedback();
    
    for (const feedback of pendingFeedback) {
      try {
        // In production, send to backend API
        await fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(feedback)
        });
        
        await this.markFeedbackSynced(feedback.id);
        console.log('Feedback synced:', feedback.id);
      } catch (error) {
        console.error('Failed to sync feedback:', error);
      }
    }
  }
}

export const offlineService = new OfflineService();