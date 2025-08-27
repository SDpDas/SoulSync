import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

interface MatchingPreferences {
  ageRange: [number, number];
  location: string;
  interests: string[];
  profession?: string;
  education?: string;
}

interface UserProfile {
  id: number;
  name: string;
  age: number;
  location: string;
  profession: string;
  education: string;
  bio: string;
  interests: string[];
  photos: string[];
  compatibility?: number;
}

class GeminiService {
  private static instance: GeminiService;
  private genAI: GoogleGenerativeAI | null = null;
  private isAvailable = false;

  private constructor() {
    this.initializeGemini();
  }

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  private async initializeGemini(): Promise<void> {
    try {
      if (API_KEY && API_KEY !== '') {
        this.genAI = new GoogleGenerativeAI(API_KEY);
        this.isAvailable = true;
        console.log('🤖 Gemini AI: Connected');
      } else {
        console.log('⚠️ Gemini AI: API key not provided, using intelligent mock matching');
        this.isAvailable = false;
      }
    } catch (error) {
      console.error('Gemini initialization error:', error);
      this.isAvailable = false;
    }
  }

  public async generateMatches(
    userProfile: Partial<UserProfile>,
    preferences: MatchingPreferences,
    existingProfiles: UserProfile[]
  ): Promise<UserProfile[]> {
    if (this.isAvailable && this.genAI) {
      try {
        return await this.getGeminiMatches(userProfile, preferences, existingProfiles);
      } catch (error) {
        console.error('Gemini matching error:', error);
        return this.getIntelligentMatches(userProfile, preferences, existingProfiles);
      }
    }

    return this.getIntelligentMatches(userProfile, preferences, existingProfiles);
  }

  private async getGeminiMatches(
    userProfile: Partial<UserProfile>,
    preferences: MatchingPreferences,
    existingProfiles: UserProfile[]
  ): Promise<UserProfile[]> {
    if (!this.genAI) {
      throw new Error('Gemini AI not initialized');
    }

    const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
    As an AI dating expert, analyze the following user profile and preferences to rank potential matches:

    User Profile:
    - Age: ${userProfile.age}
    - Interests: ${userProfile.interests?.join(', ')}
    - Profession: ${userProfile.profession}
    - Education: ${userProfile.education}

    Preferences:
    - Age Range: ${preferences.ageRange[0]}-${preferences.ageRange[1]}
    - Location: ${preferences.location}
    - Interested in: ${preferences.interests.join(', ')}

    Potential Matches:
    ${existingProfiles.map((profile, index) => `
    ${index + 1}. ${profile.name}, ${profile.age}, ${profile.profession}
    Location: ${profile.location}
    Interests: ${profile.interests.join(', ')}
    Bio: ${profile.bio}
    `).join('\n')}

    Please provide compatibility scores (0-100) for each match based on:
    1. Shared interests and values
    2. Lifestyle compatibility
    3. Communication style compatibility
    4. Long-term relationship potential

    Return only a JSON array with match IDs and scores: [{"id": 1, "score": 85}, {"id": 2, "score": 72}, ...]
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from response
      const jsonMatch = text.match(/\[.*\]/s);
      if (jsonMatch) {
        const scores = JSON.parse(jsonMatch[0]);
        
        // Apply scores to profiles
        const rankedProfiles = existingProfiles
          .map(profile => {
            const scoreData = scores.find((s: any) => s.id === profile.id);
            return {
              ...profile,
              compatibility: scoreData ? scoreData.score / 100 : Math.random() * 0.3 + 0.6
            };
          })
          .sort((a, b) => (b.compatibility || 0) - (a.compatibility || 0));

        return rankedProfiles;
      }
    } catch (error) {
      console.error('Gemini API error:', error);
    }

    // Fallback to intelligent matching
    return this.getIntelligentMatches(userProfile, preferences, existingProfiles);
  }

  public async analyzeCompatibility(
    user1: Partial<UserProfile>,
    user2: UserProfile
  ): Promise<number> {
    if (this.isAvailable && this.genAI) {
      try {
        const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });

        const prompt = `
        Analyze compatibility between these two dating profiles:

        Person 1:
        - Age: ${user1.age}
        - Interests: ${user1.interests?.join(', ')}
        - Profession: ${user1.profession}

        Person 2:
        - Age: ${user2.age}
        - Interests: ${user2.interests.join(', ')}
        - Profession: ${user2.profession}
        - Bio: ${user2.bio}

        Rate compatibility from 0.0 to 1.0 based on:
        1. Shared interests
        2. Age compatibility
        3. Lifestyle alignment
        4. Communication potential

        Return only the numerical score (e.g., 0.85)
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().trim();
        
        const score = parseFloat(text);
        if (!isNaN(score) && score >= 0 && score <= 1) {
          return score;
        }
      } catch (error) {
        console.error('Gemini compatibility analysis error:', error);
      }
    }

    return this.calculateIntelligentCompatibility(user1, user2);
  }

  public async getMatchingInsights(
    userProfile: Partial<UserProfile>,
    matches: UserProfile[]
  ): Promise<string[]> {
    if (this.isAvailable && this.genAI && matches.length > 0) {
      try {
        const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });

        const topMatches = matches.slice(0, 3);
        const prompt = `
        Based on this user profile and their top matches, provide 3 personalized dating insights:

        User Profile:
        - Age: ${userProfile.age}
        - Interests: ${userProfile.interests?.join(', ')}
        - Profession: ${userProfile.profession}

        Top Matches:
        ${topMatches.map(match => `
        - ${match.name}: ${match.profession}, interests: ${match.interests.join(', ')}
        `).join('\n')}

        Provide 3 actionable insights about their dating patterns, compatibility trends, or profile optimization tips.
        Return as a JSON array of strings: ["insight 1", "insight 2", "insight 3"]
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        const jsonMatch = text.match(/\[.*\]/s);
        if (jsonMatch) {
          const insights = JSON.parse(jsonMatch[0]);
          if (Array.isArray(insights)) {
            return insights;
          }
        }
      } catch (error) {
        console.error('Gemini insights error:', error);
      }
    }

    return this.getDefaultInsights(userProfile, matches);
  }

  private getIntelligentMatches(
    userProfile: Partial<UserProfile>,
    preferences: MatchingPreferences,
    existingProfiles: UserProfile[]
  ): UserProfile[] {
    return existingProfiles
      .filter(profile => {
        // Age filter
        if (profile.age < preferences.ageRange[0] || profile.age > preferences.ageRange[1]) {
          return false;
        }

        // Location filter (simplified - check if city matches)
        if (preferences.location) {
          const userCity = preferences.location.split(',')[0].trim().toLowerCase();
          const profileCity = profile.location.split(',')[0].trim().toLowerCase();
          if (!profileCity.includes(userCity) && !userCity.includes(profileCity)) {
            return false;
          }
        }

        return true;
      })
      .map(profile => ({
        ...profile,
        compatibility: this.calculateIntelligentCompatibility(userProfile, profile)
      }))
      .sort((a, b) => (b.compatibility || 0) - (a.compatibility || 0));
  }

  private calculateIntelligentCompatibility(
    user1: Partial<UserProfile>,
    user2: UserProfile
  ): number {
    let score = 0.5; // Base score

    // Interest matching (40% weight)
    if (user1.interests && user2.interests) {
      const commonInterests = user1.interests.filter(interest => 
        user2.interests.some(userInterest => 
          userInterest.toLowerCase().includes(interest.toLowerCase()) ||
          interest.toLowerCase().includes(userInterest.toLowerCase())
        )
      );
      const interestScore = commonInterests.length / Math.max(user1.interests.length, user2.interests.length);
      score += interestScore * 0.4;
    }

    // Age compatibility (20% weight)
    if (user1.age && user2.age) {
      const ageDiff = Math.abs(user1.age - user2.age);
      const ageScore = Math.max(0, (10 - ageDiff) / 10);
      score += ageScore * 0.2;
    }

    // Education level (15% weight)
    if (user1.education && user2.education) {
      const educationLevels = ['High School', 'Bachelor\'s', 'Master\'s', 'PhD'];
      const user1Level = educationLevels.indexOf(user1.education);
      const user2Level = educationLevels.indexOf(user2.education);
      
      if (user1Level !== -1 && user2Level !== -1) {
        const levelDiff = Math.abs(user1Level - user2Level);
        const educationScore = Math.max(0, (3 - levelDiff) / 3);
        score += educationScore * 0.15;
      }
    }

    // Profession compatibility (15% weight)
    if (user1.profession && user2.profession) {
      const professionScore = user1.profession.toLowerCase() === user2.profession.toLowerCase() ? 1 : 0.5;
      score += professionScore * 0.15;
    }

    // Add some controlled randomness (10% weight)
    score += Math.random() * 0.1;

    return Math.min(1, Math.max(0.3, score));
  }

  private getDefaultInsights(userProfile: Partial<UserProfile>, matches: UserProfile[]): string[] {
    const insights = [];

    if (matches.length > 0) {
      const avgAge = matches.reduce((sum, match) => sum + match.age, 0) / matches.length;
      insights.push(`Your matches average ${Math.round(avgAge)} years old, suggesting you attract people in a similar life stage`);

      const commonInterests = this.findMostCommonInterests(matches);
      if (commonInterests.length > 0) {
        insights.push(`${commonInterests[0]} appears frequently in your matches - consider highlighting this interest in your profile`);
      }

      const professionTypes = matches.map(m => m.profession);
      const uniqueProfessions = [...new Set(professionTypes)];
      if (uniqueProfessions.length < matches.length / 2) {
        insights.push(`You tend to attract people in similar professional fields - consider expanding your interests to meet more diverse matches`);
      } else {
        insights.push(`You attract people from diverse professional backgrounds, showing your broad appeal`);
      }
    }

    // Fill with default insights if needed
    while (insights.length < 3) {
      const defaultInsights = [
        "Consider adding more photos to increase your match rate by up to 40%",
        "Users with detailed bios receive 60% more meaningful conversations",
        "Being active during peak hours (7-9 PM) increases your visibility"
      ];
      
      for (const insight of defaultInsights) {
        if (!insights.includes(insight)) {
          insights.push(insight);
          break;
        }
      }
    }

    return insights.slice(0, 3);
  }

  private findMostCommonInterests(matches: UserProfile[]): string[] {
    const interestCounts: { [key: string]: number } = {};
    
    matches.forEach(match => {
      match.interests.forEach(interest => {
        interestCounts[interest] = (interestCounts[interest] || 0) + 1;
      });
    });

    return Object.entries(interestCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([interest]) => interest);
  }
}

export default GeminiService.getInstance();
export type { UserProfile, MatchingPreferences };