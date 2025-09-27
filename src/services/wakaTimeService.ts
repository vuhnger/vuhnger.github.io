interface WakaTimeLanguage {
  name: string;
  total_seconds: number;
  percent: number;
  digital: string; // "2 hrs 30 mins"
  text: string; // "2:30"
  hours: number;
  minutes: number;
}

interface WakaTimeStats {
  total_seconds: number;
  total_seconds_including_other_language: number;
  daily_average: number;
  daily_average_including_other_language: number;
  days_including_holidays: number;
  days_minus_holidays: number;
  holidays: number;
  languages: WakaTimeLanguage[];
  human_readable_total: string;
  human_readable_daily_average: string;
  is_up_to_date: boolean;
  percent_calculated: number;
  range: {
    start: string;
    start_date: string;
    start_text: string;
    end: string;
    end_date: string;
    end_text: string;
    timezone: string;
  };
  timeout: number;
  writes_only: boolean;
}

interface WakaTimeSummaryDay {
  categories: Array<{
    name: string;
    total_seconds: number;
    percent: number;
    digital: string;
    text: string;
    hours: number;
    minutes: number;
  }>;
  dependencies: Array<any>;
  editors: Array<{
    name: string;
    total_seconds: number;
    percent: number;
    digital: string;
    text: string;
    hours: number;
    minutes: number;
  }>;
  grand_total: {
    digital: string;
    hours: number;
    minutes: number;
    text: string;
    total_seconds: number;
  };
  languages: WakaTimeLanguage[];
  machines: Array<{
    name: string;
    total_seconds: number;
    percent: number;
    digital: string;
    text: string;
    hours: number;
    minutes: number;
  }>;
  operating_systems: Array<{
    name: string;
    total_seconds: number;
    percent: number;
    digital: string;
    text: string;
    hours: number;
    minutes: number;
  }>;
  projects: Array<{
    name: string;
    total_seconds: number;
    percent: number;
    digital: string;
    text: string;
    hours: number;
    minutes: number;
  }>;
  range: {
    date: string;
    end: string;
    start: string;
    text: string;
    timezone: string;
  };
}

interface WakaTimeSummaries {
  cummulative_total: {
    decimal: string;
    digital: string;
    seconds: number;
    text: string;
  };
  data: WakaTimeSummaryDay[];
  end: string;
  start: string;
}

interface CodingStats {
  hoursThisMonth: number;
  topLanguage: string;
  topLanguagePercent: number;
  dailyAverage: number;
  totalLanguages: number;
  topEditor: string;
  isUpToDate: boolean;
  languages: Array<{
    name: string;
    percent: number;
    hours: number;
  }>;
}

interface CachedWakaTimeData {
  codingStats: CodingStats;
  timestamp: number;
  expiresAt: number;
}

export class WakaTimeService {
  private static readonly BASE_URL = 'https://wakatime.com/api/v1';
  private static readonly CACHE_KEY = 'wakatime_cache';
  private static readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  private static getApiKey(): string {
    return process.env.REACT_APP_WAKATIME_API_KEY || 
           process.env.wakatime_api_key || '';
  }

  private static getHeaders(): HeadersInit {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
      throw new Error('No WakaTime API key available');
    }

    return {
      'Authorization': `Basic ${btoa(apiKey)}`,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Load cached WakaTime data from localStorage
   */
  private static loadCache(): CachedWakaTimeData | null {
    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      if (!cached) return null;
      
      const data: CachedWakaTimeData = JSON.parse(cached);
      
      // Check if cache is expired
      if (Date.now() > data.expiresAt) {
        localStorage.removeItem(this.CACHE_KEY);
        console.log('🗑️ WakaTime cache expired, removed');
        return null;
      }
      
      console.log('✅ Found valid WakaTime cache, age:', Math.round((Date.now() - data.timestamp) / (1000 * 60 * 60)), 'hours');
      return data;
    } catch (error) {
      console.error('Failed to load WakaTime cache:', error);
      localStorage.removeItem(this.CACHE_KEY);
      return null;
    }
  }

  /**
   * Save WakaTime data to localStorage cache
   */
  private static saveCache(codingStats: CodingStats): void {
    try {
      const now = Date.now();
      const cacheData: CachedWakaTimeData = {
        codingStats,
        timestamp: now,
        expiresAt: now + this.CACHE_DURATION
      };
      
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(cacheData));
      console.log('💾 Saved WakaTime data to cache, expires in 24 hours');
    } catch (error) {
      console.error('Failed to save WakaTime cache:', error);
    }
  }

  /**
   * Get cache timestamp for UI display
   */
  static getCacheTimestamp(): number | null {
    const cached = this.loadCache();
    return cached ? cached.timestamp : null;
  }

  /**
   * Get current month stats from WakaTime
   */
  static async getCurrentMonthStats(): Promise<WakaTimeStats> {
    try {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startDate = startOfMonth.toISOString().split('T')[0];
      const endDate = now.toISOString().split('T')[0];

      const headers = this.getHeaders();
      const response = await fetch(
        `${this.BASE_URL}/users/current/stats/range?start=${startDate}&end=${endDate}`,
        {
          method: 'GET',
          headers,
        }
      );

      if (!response.ok) {
        throw new Error(`WakaTime API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return result.data as WakaTimeStats;
    } catch (error) {
      console.error('Failed to fetch WakaTime monthly stats:', error);
      throw error;
    }
  }

  /**
   * Get coding stats with caching and fallback
   */
  static async getCodingStatsWithCache(): Promise<CodingStats> {
    // Check cache first
    const cached = this.loadCache();
    if (cached) {
      console.log('💻 Returning cached WakaTime stats');
      return cached.codingStats;
    }

    try {
      console.log('🌐 Fetching fresh WakaTime stats from API...');
      const stats = await this.getCurrentMonthStats();
      
      // Process the data
      const hoursThisMonth = Math.round((stats.total_seconds / 3600) * 10) / 10;
      const dailyAverage = Math.round((stats.daily_average / 3600) * 10) / 10;
      
      const topLanguage = stats.languages.length > 0 ? stats.languages[0] : null;
      const topLanguageName = topLanguage ? topLanguage.name : 'Ukjent';
      const topLanguagePercent = topLanguage ? Math.round(topLanguage.percent) : 0;
      
      // Process all languages for the new language box (get up to 8)
      const languages = stats.languages.slice(0, 8).map(lang => ({
        name: lang.name,
        percent: Math.round(lang.percent),
        hours: Math.round((lang.total_seconds / 3600) * 10) / 10
      }));

      console.log(`💻 Found ${stats.languages.length} languages total, showing ${languages.length}`);
      console.log('🔍 Languages:', languages.map(l => `${l.name} (${l.percent}%)`).join(', '));
      
      const codingStats: CodingStats = {
        hoursThisMonth,
        topLanguage: topLanguageName,
        topLanguagePercent,
        dailyAverage,
        totalLanguages: stats.languages.length,
        topEditor: 'VS Code', // Could be extracted from editors if available
        isUpToDate: stats.is_up_to_date,
        languages
      };

      // Save to cache
      this.saveCache(codingStats);
      
      console.log('💻 WakaTime stats result:', codingStats);
      return codingStats;
    } catch (error) {
      console.error('WakaTime API error, using fallback values:', error);
      
      // Fallback values
      const fallbackStats: CodingStats = {
        hoursThisMonth: 45,
        topLanguage: 'TypeScript',
        topLanguagePercent: 65,
        dailyAverage: 2.1,
        totalLanguages: 8,
        topEditor: 'VS Code',
        isUpToDate: false,
        languages: [
          { name: 'TypeScript', percent: 45, hours: 20.3 },
          { name: 'JavaScript', percent: 25, hours: 11.3 },
          { name: 'CSS', percent: 12, hours: 5.4 },
          { name: 'HTML', percent: 8, hours: 3.6 },
          { name: 'Python', percent: 4, hours: 1.8 },
          { name: 'JSON', percent: 3, hours: 1.4 },
          { name: 'Markdown', percent: 2, hours: 0.9 },
          { name: 'YAML', percent: 1, hours: 0.5 }
        ]
      };
      
      return fallbackStats;
    }
  }
}