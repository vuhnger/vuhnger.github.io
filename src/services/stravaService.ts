/**
 * Strava Service - Calls backend API for Strava statistics
 *
 * This service fetches Strava data from your backend API at api.vuhnger.dev
 * which handles OAuth, token refresh, and data caching automatically.
 */

const API_URL = process.env.REACT_APP_API_URL || 'https://api.vuhnger.dev';

// Type definitions matching the component expectations
interface LongestRunDetails {
  distance: number; // in km
  date: string; // ISO date string
  pace: string; // mm:ss per km
  elevationGain: number; // in meters
  name: string; // activity name
  movingTime: number; // in seconds
}

interface LongestRideDetails {
  distance: number; // in km
  date: string; // ISO date string
  avgSpeed: string; // km/h
  elevationGain: number; // in meters
  name: string; // activity name
  movingTime: number; // in seconds
}

interface RunningStats {
  runsThisYear: number;
  totalKilometers: number;
  longestRunKm: number;
  longestRunDetails?: LongestRunDetails;
}

interface CyclingStats {
  ridesThisYear: number;
  totalKilometers: number;
  longestRideKm: number;
  longestRideDetails?: LongestRideDetails;
}

// Backend API response types
interface YTDStatsResponse {
  type: string;
  data: {
    run?: {
      count: number;
      distance: number; // meters
      moving_time: number; // seconds
      elevation_gain: number;
    };
    ride?: {
      count: number;
      distance: number; // meters
      moving_time: number;
      elevation_gain: number;
    };
  };
  fetched_at: string;
}

interface Activity {
  id: number;
  name: string;
  type: string;
  distance: number; // meters
  moving_time: number; // seconds
  elapsed_time: number;
  total_elevation_gain: number; // meters
  start_date: string;
  average_speed: number;
  max_speed: number;
}

interface ActivitiesResponse {
  type: string;
  data: Activity[];
  fetched_at: string;
}

export class StravaService {
  /**
   * Helper: Convert meters to kilometers
   */
  private static metersToKm(meters: number): number {
    return Math.round((meters / 1000) * 10) / 10;
  }

  /**
   * Helper: Convert seconds to pace (mm:ss per km)
   */
  private static secondsToPace(meters: number, seconds: number): string {
    if (meters === 0) return '0:00';
    const paceSecondsPerKm = (seconds / (meters / 1000));
    const minutes = Math.floor(paceSecondsPerKm / 60);
    const secs = Math.floor(paceSecondsPerKm % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }

  /**
   * Helper: Convert meters/second to km/h
   */
  private static metersPerSecToKmh(metersPerSec: number): string {
    const kmh = (metersPerSec * 3.6);
    return `${Math.round(kmh * 10) / 10}`;
  }

  /**
   * Get YTD stats from backend
   */
  private static async getYTDStats(): Promise<YTDStatsResponse> {
    const response = await fetch(`${API_URL}/strava/stats/ytd`);
    if (!response.ok) {
      throw new Error(`Failed to fetch YTD stats: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Get recent activities from backend
   */
  private static async getActivities(): Promise<ActivitiesResponse> {
    const response = await fetch(`${API_URL}/strava/stats/activities`);
    if (!response.ok) {
      throw new Error(`Failed to fetch activities: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Get longest run from backend
   */
  private static async getLongestRun(): Promise<Activity | null> {
    try {
      const response = await fetch(`${API_URL}/strava/stats/longest-run`);
      if (!response.ok) return null;
      const json = await response.json();
      return json;
    } catch (e) {
      console.error("Failed to fetch longest run", e);
      return null;
    }
  }

  /**
   * Get longest ride from backend
   */
  private static async getLongestRide(): Promise<Activity | null> {
    try {
      const response = await fetch(`${API_URL}/strava/stats/longest-ride`);
      if (!response.ok) return null;
      const json = await response.json();
      return json;
    } catch (e) {
      console.error("Failed to fetch longest ride", e);
      return null;
    }
  }

  /**
   * Get running statistics for the current year
   */
  static async getRunningStats(): Promise<RunningStats> {
    try {
      const [ytdData, longestRun] = await Promise.all([
        this.getYTDStats(),
        this.getLongestRun()
      ]);

      const runData = ytdData.data.run;

      if (!runData) {
        return {
          runsThisYear: 0,
          totalKilometers: 0,
          longestRunKm: 0
        };
      }

      const runsThisYear = runData.count;
      const totalKilometers = this.metersToKm(runData.distance);

      if (!longestRun) {
        return {
          runsThisYear,
          totalKilometers,
          longestRunKm: 0
        };
      }

      const longestRunKm = this.metersToKm(longestRun.distance);
      const longestRunDetails: LongestRunDetails = {
        distance: longestRunKm,
        date: longestRun.start_date,
        pace: this.secondsToPace(longestRun.distance, longestRun.moving_time),
        elevationGain: Math.round(longestRun.total_elevation_gain),
        name: longestRun.name,
        movingTime: longestRun.moving_time
      };

      return {
        runsThisYear,
        totalKilometers,
        longestRunKm,
        longestRunDetails
      };
    } catch (error) {
      console.error('Failed to get running stats:', error);
      throw error;
    }
  }

  /**
   * Get cycling statistics for the current year
   */
  static async getCyclingStats(): Promise<CyclingStats> {
    try {
      const [ytdData, longestRide] = await Promise.all([
        this.getYTDStats(),
        this.getLongestRide()
      ]);

      const rideData = ytdData.data.ride;

      if (!rideData) {
        return {
          ridesThisYear: 0,
          totalKilometers: 0,
          longestRideKm: 0
        };
      }

      const ridesThisYear = rideData.count;
      const totalKilometers = this.metersToKm(rideData.distance);

      if (!longestRide) {
        return {
          ridesThisYear,
          totalKilometers,
          longestRideKm: 0
        };
      }

      const longestRideKm = this.metersToKm(longestRide.distance);
      const longestRideDetails: LongestRideDetails = {
        distance: longestRideKm,
        date: longestRide.start_date,
        avgSpeed: this.metersPerSecToKmh(longestRide.average_speed),
        elevationGain: Math.round(longestRide.total_elevation_gain),
        name: longestRide.name,
        movingTime: longestRide.moving_time
      };

      return {
        ridesThisYear,
        totalKilometers,
        longestRideKm,
        longestRideDetails
      };
    } catch (error) {
      console.error('Failed to get cycling stats:', error);
      throw error;
    }
  }

  /**
   * Get both running and cycling stats
   * Backend handles caching, so no client-side caching needed
   */
  static async getStatsWithCache(): Promise<{ running: RunningStats; cycling: CyclingStats }> {
    console.log('🌐 Fetching stats from backend API...');

    const [running, cycling] = await Promise.all([
      this.getRunningStats(),
      this.getCyclingStats()
    ]);

    return { running, cycling };
  }

  /**
   * Get cache timestamp (backend handles this, so return current time as fallback)
   */
  static getCacheTimestamp(): number {
    return Date.now();
  }
}
