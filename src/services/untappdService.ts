interface UntappdBeer {
  beer_name: string;
  brewery_name: string;
  rating_score: number;
  beer_style: string;
  beer_abv: number;
  created_at: string;
}

interface UntappdStats {
  total_beers: number;
  total_unique_beers: number;
  total_badges: number;
  total_friends: number;
}

interface UntappdUserData {
  stats: UntappdStats;
  recent_beers: UntappdBeer[];
  highest_rated_beer: UntappdBeer | null;
  beers_in_2025: number;
}

class UntappdService {
  private clientId: string;
  private clientSecret: string;
  private cacheKey = 'untappd_data';
  private cacheTimeout = 24 * 60 * 60 * 1000; // 24 hours

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  private async fetchFromUntappd(endpoint: string): Promise<any> {
    const url = `https://api.untappd.com/v4${endpoint}?client_id=${this.clientId}&client_secret=${this.clientSecret}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Untappd API error: ${response.status}`);
      }
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error fetching from Untappd:', error);
      return null;
    }
  }

  private isDataFresh(timestamp: number): boolean {
    return Date.now() - timestamp < this.cacheTimeout;
  }

  private getCachedData(): UntappdUserData | null {
    try {
      const cached = localStorage.getItem(this.cacheKey);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (this.isDataFresh(timestamp)) {
          return data;
        }
      }
    } catch (error) {
      console.error('Error reading cached Untappd data:', error);
    }
    return null;
  }

  private setCachedData(data: UntappdUserData): void {
    try {
      const cacheData = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(this.cacheKey, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error caching Untappd data:', error);
    }
  }

  async getUserStats(username: string): Promise<UntappdUserData | null> {
    // Check cache first
    const cachedData = this.getCachedData();
    if (cachedData) {
      return cachedData;
    }

    try {
      // Fetch user info and stats
      const userInfo = await this.fetchFromUntappd(`/user/info/${username}`);
      if (!userInfo) return null;

      // Fetch recent checkins
      const checkins = await this.fetchFromUntappd(`/user/checkins/${username}?limit=50`);
      if (!checkins) return null;

      const beers = checkins.checkins?.items || [];
      
      // Filter beers from 2025
      const beersIn2025 = beers.filter((checkin: any) => {
        const checkinDate = new Date(checkin.created_at);
        return checkinDate.getFullYear() === 2025;
      });

      // Find highest rated beer
      let highestRatedBeer: UntappdBeer | null = null;
      let highestRating = 0;

      beers.forEach((checkin: any) => {
        if (checkin.rating_score > highestRating) {
          highestRating = checkin.rating_score;
          highestRatedBeer = {
            beer_name: checkin.beer.beer_name,
            brewery_name: checkin.brewery.brewery_name,
            rating_score: checkin.rating_score,
            beer_style: checkin.beer.beer_style,
            beer_abv: checkin.beer.beer_abv,
            created_at: checkin.created_at
          };
        }
      });

      const userData: UntappdUserData = {
        stats: {
          total_beers: userInfo.user.stats.total_beers,
          total_unique_beers: userInfo.user.stats.total_unique_beers,
          total_badges: userInfo.user.stats.total_badges,
          total_friends: userInfo.user.stats.total_friends
        },
        recent_beers: beers.slice(0, 5).map((checkin: any) => ({
          beer_name: checkin.beer.beer_name,
          brewery_name: checkin.brewery.brewery_name,
          rating_score: checkin.rating_score,
          beer_style: checkin.beer.beer_style,
          beer_abv: checkin.beer.beer_abv,
          created_at: checkin.created_at
        })),
        highest_rated_beer: highestRatedBeer,
        beers_in_2025: beersIn2025.length
      };

      // Cache the data
      this.setCachedData(userData);
      return userData;

    } catch (error) {
      console.error('Error fetching Untappd data:', error);
      return null;
    }
  }
}

// Default fallback data
const defaultUntappdData: UntappdUserData = {
  stats: {
    total_beers: 0,
    total_unique_beers: 0,
    total_badges: 0,
    total_friends: 0
  },
  recent_beers: [],
  highest_rated_beer: null,
  beers_in_2025: 0
};

export { UntappdService, defaultUntappdData };
export type { UntappdUserData, UntappdBeer, UntappdStats };