import React, { useState, useEffect } from 'react';
import { Card, Spinner, Alert } from 'react-bootstrap';
import { spotifyService, SpotifyUserData } from '../services/spotifyService';

const SpotifyStats: React.FC = () => {
  const [data, setData] = useState<SpotifyUserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const spotifyData = await spotifyService.getUserStats();
        setData(spotifyData);
        
      } catch (err: any) {
        setError(err.message || 'Feil ved henting av Spotify-data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDuration = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatListeningTime = (minutes: number): string => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours < 24) return `${hours}t ${remainingMinutes}min`;
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return `${days}d ${remainingHours}t ${remainingMinutes}min`;
  };

  if (loading) {
    return (
      <Card className="quote-card-view">
        <Card.Body>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Spinner animation="border" variant="success" />
            <p style={{ marginTop: '10px', color: '#666' }}>Henter Spotify-data...</p>
          </div>
        </Card.Body>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="quote-card-view">
        <Card.Body>
          <Alert variant="danger">
            <strong>Feil:</strong> {error}
          </Alert>
        </Card.Body>
      </Card>
    );
  }

  if (!data) return null;

  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <span 
              style={{ 
                fontSize: '1.5em', 
                marginRight: '10px',
                color: '#1DB954' // Spotify green
              }}
            >
              🎵
            </span>
            <h5 style={{ margin: 0, color: '#1DB954', fontWeight: 'bold' }}>
              Spotify Statistikk
            </h5>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
            marginBottom: '20px'
          }}>
            <div style={{ 
              backgroundColor: 'rgba(29, 185, 84, 0.1)', 
              padding: '15px', 
              borderRadius: '8px',
              border: '1px solid rgba(29, 185, 84, 0.2)'
            }}>
              <div style={{ fontSize: '1.8em', fontWeight: 'bold', color: '#1DB954' }}>
                {formatListeningTime(data.total_listening_time_2025)}
              </div>
              <div style={{ fontSize: '0.9em', color: '#666', marginTop: '5px' }}>
                Lyttet i 2025
              </div>
            </div>
          </div>

          {data.most_played_track && (
            <div style={{ 
              backgroundColor: 'rgba(29, 185, 84, 0.1)', 
              padding: '15px', 
              borderRadius: '8px',
              border: '1px solid rgba(29, 185, 84, 0.2)',
              marginBottom: '15px'
            }}>
              <h6 style={{ color: '#1DB954', marginBottom: '10px' }}>
                🎵 Mest lyttet til sang
              </h6>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {data.most_played_track.images && data.most_played_track.images[0] && (
                  <img 
                    src={data.most_played_track.images[0].url}
                    alt={data.most_played_track.album}
                    style={{ 
                      width: '60px', 
                      height: '60px', 
                      borderRadius: '8px',
                      objectFit: 'cover'
                    }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontWeight: 'bold', 
                    fontSize: '1.1em',
                    marginBottom: '3px'
                  }}>
                    {data.most_played_track.name}
                  </div>
                  <div style={{ color: '#666', fontSize: '0.9em', marginBottom: '3px' }}>
                    av {data.most_played_track.artist}
                  </div>
                  <div style={{ color: '#888', fontSize: '0.8em' }}>
                    {data.most_played_track.album} • {formatDuration(data.most_played_track.duration_ms)}
                  </div>
                </div>
                <a 
                  href={data.most_played_track.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#1DB954',
                    textDecoration: 'none',
                    fontSize: '1.2em',
                    padding: '5px'
                  }}
                  title="Åpne i Spotify"
                >
                  🎵
                </a>
              </div>
            </div>
          )}
        </blockquote>
      </Card.Body>
    </Card>
  );
};

export default SpotifyStats;