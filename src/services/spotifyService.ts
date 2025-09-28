interface SpotifyTrack {
  name: string;
  artist: string;
  album: string;
  duration_ms: number;
  external_urls: {
    spotify: string;
  };
  images?: Array<{
    url: string;
    height: number;
    width: number;
  }>;
}

interface SpotifyUserData {
  most_played_track: SpotifyTrack | null;
  total_listening_time_2025: number; // in minutes
}

class SpotifyService {
  private accessToken: string;
  private cacheKey = 'spotify_data';
  private cacheTimeout = 24 * 60 * 60 * 1000; // 24 hours

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  private async fetchFromSpotify(endpoint: string): Promise<any> {
    try {
      const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error(`Spotify API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching from Spotify:', error);
      throw error;
    }
  }

  private isDataFresh(timestamp: number): boolean {
    return Date.now() - timestamp < this.cacheTimeout;
  }

  private getCachedData(): SpotifyUserData | null {
    try {
      const cached = localStorage.getItem(this.cacheKey);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (this.isDataFresh(timestamp)) {
          return data;
        }
      }
    } catch (error) {
      console.error('Error reading cached Spotify data:', error);
    }
    return null;
  }

  private setCachedData(data: SpotifyUserData): void {
    try {
      const cacheData = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(this.cacheKey, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error caching Spotify data:', error);
    }
  }

  async getUserStats(): Promise<SpotifyUserData | null> {
    // Check cache first
    const cachedData = this.getCachedData();
    if (cachedData) {
      return cachedData;
    }

    try {
      // Get top tracks (most played)
      const topTracks = await this.fetchFromSpotify('/me/top/tracks?time_range=medium_term&limit=1');
      
      // Get recently played for 2025 data
      const recentlyPlayed = await this.fetchFromSpotify('/me/player/recently-played?limit=50');

      // Process most played track
      const mostPlayedTrack = topTracks.items?.[0] ? {
        name: topTracks.items[0].name,
        artist: topTracks.items[0].artists[0].name,
        album: topTracks.items[0].album.name,
        duration_ms: topTracks.items[0].duration_ms,
        external_urls: topTracks.items[0].external_urls,
        images: topTracks.items[0].album.images
      } : null;

      // Calculate 2025 listening stats
      const recentTracks = recentlyPlayed.items || [];
      const tracks2025 = recentTracks.filter((item: any) => 
        new Date(item.played_at).getFullYear() === 2025
      );
      
      const totalListeningTime = tracks2025.reduce((total: number, item: any) => 
        total + (item.track.duration_ms / 1000 / 60), 0
      );

      const userData: SpotifyUserData = {
        most_played_track: mostPlayedTrack,
        total_listening_time_2025: Math.round(totalListeningTime)
      };

      // Cache the data
      this.setCachedData(userData);
      return userData;

    } catch (error) {
      console.error('Error fetching Spotify user data:', error);
      return null;
    }
  }
}

// Default/fallback data
const defaultSpotifyData: SpotifyUserData = {
  most_played_track: null,
  total_listening_time_2025: 0
};

// Create and export service instance
const spotifyService = new SpotifyService(
  process.env.REACT_APP_SPOTIFY_ACCESS_TOKEN || ''
);

export { spotifyService, SpotifyService, defaultSpotifyData };
export type { SpotifyUserData, SpotifyTrack };