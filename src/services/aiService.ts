const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export interface TypingAnalysis {
  wpm: number;
  consistency: number;
  confidence_level: string;
}

export interface SentimentAnalysis {
  sentiment: string;
  confidence: number;
  emotional_intensity: number;
  emoji_analysis: string;
}

export interface ResponseAnalysis {
  response_time: number;
  interpretation: string;
  engagement_level: number;
}

export interface DigitalBodyLanguage {
  confidence_level: string;
  emotional_state: string;
  engagement_level: string;
  overall_assessment: string;
}

export interface AIAnalysisResult {
  typing_analysis: TypingAnalysis;
  sentiment_analysis: SentimentAnalysis;
  response_analysis: ResponseAnalysis;
  compatibility_score: number;
  digital_body_language: DigitalBodyLanguage;
  timestamp: string;
}

export interface RealtimeStats {
  average_wpm: number;
  dominant_sentiment: string;
  average_response_time: number;
  engagement_trend: string;
  typing_consistency: number;
  total_messages_analyzed: number;
  session_duration: number;
  compatibility_score: number;
}

class AIService {
  private static instance: AIService;
  private isBackendAvailable = false;
  private userId: string;

  private constructor() {
    this.userId = this.getUserId();
    this.checkBackendHealth();
  }

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  private getUserId(): string {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('userId', userId);
    }
    return userId;
  }

  private async checkBackendHealth(): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      this.isBackendAvailable = response.ok;
      console.log('🔗 Backend connection:', this.isBackendAvailable ? 'Connected' : 'Disconnected');
    } catch (error) {
      this.isBackendAvailable = false;
      console.log('⚠️ Backend not available, using localStorage data');
    }
  }

  public async analyzeMessage(
    text: string,
    timeTaken: number,
    responseTime: number
  ): Promise<AIAnalysisResult> {
    if (this.isBackendAvailable) {
      try {
        const response = await fetch(`${API_BASE_URL}/analyze`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text,
            time_taken: timeTaken,
            response_time: responseTime,
            user_id: this.userId
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('🧠 AI Analysis Result:', result.digital_body_language.overall_assessment);
          
          // Store in localStorage as backup
          this.storeAnalysisResult(result);
          return result;
        }
      } catch (error) {
        console.error('AI Analysis Error:', error);
      }
    }

    // Fallback to localStorage-based analysis
    return this.getLocalAnalysis(text, timeTaken, responseTime);
  }

  public async getRealtimeStats(): Promise<RealtimeStats> {
    if (this.isBackendAvailable) {
      try {
        const response = await fetch(`${API_BASE_URL}/realtime-stats?user_id=${this.userId}`);
        
        if (response.ok) {
          const stats = await response.json();
          // Store in localStorage as backup
          localStorage.setItem('realtimeStats', JSON.stringify(stats));
          return stats;
        }
      } catch (error) {
        console.error('Stats Error:', error);
      }
    }

    // Fallback to localStorage
    return this.getLocalStats();
  }

  private storeAnalysisResult(result: AIAnalysisResult): void {
    const analyses = this.getStoredAnalyses();
    analyses.push(result);
    
    // Keep only last 100 analyses
    if (analyses.length > 100) {
      analyses.splice(0, analyses.length - 100);
    }
    
    localStorage.setItem('analysisHistory', JSON.stringify(analyses));
  }

  private getStoredAnalyses(): AIAnalysisResult[] {
    const stored = localStorage.getItem('analysisHistory');
    return stored ? JSON.parse(stored) : [];
  }

  private calculateRealTypingSpeed(text: string, timeInSeconds: number): number {
    if (timeInSeconds <= 0) return 0;
    
    const words = text.trim().split(/\s+/).length;
    const wpm = (words / timeInSeconds) * 60;
    
    // Cap at realistic human typing speeds (10-120 WPM)
    return Math.min(Math.max(Math.round(wpm), 10), 120);
  }

  private analyzeSentiment(text: string): string {
    const lowerText = text.toLowerCase();
    
    // Positive indicators
    const positiveWords = ['love', 'great', 'amazing', 'wonderful', 'happy', 'excited', 'fantastic', 'awesome', 'perfect', 'excellent', 'good', 'nice', 'beautiful'];
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    
    // Negative indicators
    const negativeWords = ['hate', 'bad', 'terrible', 'awful', 'sad', 'angry', 'frustrated', 'disappointed', 'upset', 'horrible'];
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
    
    // Question indicators (curious)
    const questionCount = (text.match(/\?/g) || []).length;
    
    // Excitement indicators
    const exclamationCount = (text.match(/!/g) || []).length;
    const excitedEmojis = ['😍', '🥰', '😘', '💕', '❤️', '✨', '🔥', '💖'];
    const hasExcitedEmoji = excitedEmojis.some(emoji => text.includes(emoji));
    
    // Determine sentiment
    if (hasExcitedEmoji || exclamationCount > 1) {
      return 'excited';
    } else if (positiveCount > negativeCount && positiveCount > 0) {
      return 'positive';
    } else if (negativeCount > positiveCount && negativeCount > 0) {
      return 'negative';
    } else if (questionCount > 0) {
      return 'curious';
    } else {
      return 'neutral';
    }
  }

  private getLocalAnalysis(text: string, timeTaken: number, responseTime: number): AIAnalysisResult {
    const wpm = this.calculateRealTypingSpeed(text, timeTaken);
    const sentiment = this.analyzeSentiment(text);
    
    const result: AIAnalysisResult = {
      typing_analysis: {
        wpm: wpm,
        consistency: Math.random() * 0.3 + 0.7,
        confidence_level: wpm > 40 ? 'high' : wpm > 20 ? 'medium' : 'low'
      },
      sentiment_analysis: {
        sentiment,
        confidence: Math.random() * 0.2 + 0.8,
        emotional_intensity: Math.random() * 0.5 + 0.3,
        emoji_analysis: sentiment
      },
      response_analysis: {
        response_time: responseTime,
        interpretation: responseTime < 2 ? 'very_engaged' : responseTime < 5 ? 'engaged' : 'thoughtful',
        engagement_level: Math.random() * 0.4 + 0.6
      },
      compatibility_score: Math.random() * 0.3 + 0.7,
      digital_body_language: {
        confidence_level: wpm > 40 ? 'high' : 'medium',
        emotional_state: sentiment,
        engagement_level: responseTime < 5 ? 'engaged' : 'moderate',
        overall_assessment: this.getAssessment(sentiment, wpm, responseTime)
      },
      timestamp: new Date().toISOString()
    };

    this.storeAnalysisResult(result);
    return result;
  }

  private getLocalStats(): RealtimeStats {
    const stored = localStorage.getItem('realtimeStats');
    if (stored) {
      return JSON.parse(stored);
    }

    const analyses = this.getStoredAnalyses();
    if (analyses.length === 0) {
      return {
        average_wpm: 0,
        dominant_sentiment: 'neutral',
        average_response_time: 0,
        engagement_trend: 'stable',
        typing_consistency: 0.8,
        total_messages_analyzed: 0,
        session_duration: 0,
        compatibility_score: 0.8
      };
    }

    // Calculate real stats from stored analyses
    const totalWpm = analyses.reduce((sum, a) => sum + a.typing_analysis.wpm, 0);
    const averageWpm = Math.round(totalWpm / analyses.length);

    const sentiments = analyses.map(a => a.sentiment_analysis.sentiment);
    const sentimentCounts: { [key: string]: number } = {};
    sentiments.forEach(s => {
      sentimentCounts[s] = (sentimentCounts[s] || 0) + 1;
    });
    const dominantSentiment = Object.keys(sentimentCounts).reduce((a, b) => 
      sentimentCounts[a] > sentimentCounts[b] ? a : b
    );

    const totalResponseTime = analyses.reduce((sum, a) => sum + a.response_analysis.response_time, 0);
    const averageResponseTime = totalResponseTime / analyses.length;

    const totalCompatibility = analyses.reduce((sum, a) => sum + a.compatibility_score, 0);
    const averageCompatibility = totalCompatibility / analyses.length;

    return {
      average_wpm: averageWpm,
      dominant_sentiment: dominantSentiment,
      average_response_time: Math.round(averageResponseTime * 10) / 10,
      engagement_trend: 'stable',
      typing_consistency: 0.85,
      total_messages_analyzed: analyses.length,
      session_duration: Math.round((Date.now() - (analyses[0] ? new Date(analyses[0].timestamp).getTime() : Date.now())) / 60000),
      compatibility_score: Math.round(averageCompatibility * 100) / 100
    };
  }

  private getAssessment(sentiment: string, wpm: number, responseTime: number): string {
    if (sentiment === 'excited' && wpm > 40 && responseTime < 3) {
      return 'Highly Compatible - Strong mutual interest detected';
    } else if (sentiment === 'positive' && wpm > 25) {
      return 'Good Connection - Positive engagement patterns';
    } else if (sentiment === 'curious' || responseTime > 5) {
      return 'Thoughtful Interest - Meaningful connection developing';
    } else {
      return 'Building Rapport - Getting to know each other';
    }
  }

  public async updateUserProfile(profileData: any): Promise<boolean> {
    if (this.isBackendAvailable) {
      try {
        const response = await fetch(`${API_BASE_URL}/user-profile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: this.userId,
            profile: profileData
          }),
        });

        if (response.ok) {
          localStorage.setItem('userProfile', JSON.stringify(profileData));
          return true;
        }
      } catch (error) {
        console.error('Profile update error:', error);
      }
    }

    // Fallback to localStorage
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    return true;
  }

  public getUserProfile(): any {
    const stored = localStorage.getItem('userProfile');
    return stored ? JSON.parse(stored) : null;
  }
}

export default AIService.getInstance();