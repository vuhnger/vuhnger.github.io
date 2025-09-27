import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import GitHubCalendar from "react-github-calendar";
import { StravaService } from "../../services/stravaService";
import spikeyWhites from "../../Assets/forest-spiky-white.svg";

interface LongestRunDetails {
  distance: number;
  date: string;
  pace: string;
  elevationGain: number;
  name: string;
  movingTime: number;
}

interface LongestRideDetails {
  distance: number;
  date: string;
  avgSpeed: string;
  elevationGain: number;
  name: string;
  movingTime: number;
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

const About: React.FC = () => {
  const [runningStats, setRunningStats] = useState<RunningStats | null>(null);
  const [cyclingStats, setCyclingStats] = useState<CyclingStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get both Strava stats with caching
        const { running, cycling } = await StravaService.getStatsWithCache();
        
        setRunningStats(running);
        setCyclingStats(cycling);
        
        // Get cache timestamp for display (use Strava cache timestamp as primary)
        const cacheTimestamp = StravaService.getCacheTimestamp();
        setLastUpdated(cacheTimestamp || Date.now());
        
      } catch (err) {
        console.error('Failed to fetch stats:', err);
        setError('Kunne ikke laste statistikk');
        
        // Set fallback data
        setRunningStats({
          runsThisYear: 0,
          totalKilometers: 0,
          longestRunKm: 0,
          longestRunDetails: undefined,
        });
        setCyclingStats({
          ridesThisYear: 0,
          totalKilometers: 0,
          longestRideKm: 0,
          longestRideDetails: undefined,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Helper function to format "time ago"
  const formatTimeAgo = (timestamp: number): string => {
    const now = Date.now();
    const diffMs = now - timestamp;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) {
      return `${diffDays} dag${diffDays > 1 ? 'er' : ''} siden`;
    } else if (diffHours > 0) {
      return `${diffHours} time${diffHours > 1 ? 'r' : ''} siden`;
    } else {
      return 'nå';
    }
  };

  const formatRunCount = (count: number): string => {
    if (loading) return "...";
    if (error || count === 0) return "--";
    return count.toString();
  };

  const formatDistance = (km: number): string => {
    if (loading) return "...";
    if (error || km === 0) return "--";
    return `${km}`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('no-NO', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    });
  };
  return (
    <Container fluid className="about-section">
      <Container style={{ position: "relative", zIndex: 2 }}>
        {/* Om meg seksjonen */}
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={8}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              Om <strong className="purple">meg</strong>
            </h1>
            <Card className="quote-card-view">
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p style={{ textAlign: "justify", fontSize: "1.1em" }}>
                    Jeg studerer for tiden i Oslo. 

                    <br />
                    <br />

                  </p>
                  
                </blockquote>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Forest background silhouette - positioned after lorem ipsum section */}
        <div 
          className="forest-background"
          style={{
            position: "relative",
            width: "100vw",
            marginLeft: "calc(-50vw + 50%)",
            height: "250px",
            backgroundImage: `url(${spikeyWhites})`,
            backgroundRepeat: "repeat-x",
            backgroundPosition: "bottom center",
            backgroundSize: "cover",
            opacity: 0.15,
            zIndex: 1,
            pointerEvents: "none",
            marginTop: "-30px",
            marginBottom: "40px"
          }}
        />

        {/* Strava seksjonen */}
        <Row style={{ justifyContent: "center", paddingTop: "20px" }}>
          <Col md={8}>
            <h2 style={{ fontSize: "2em", paddingBottom: "20px", textAlign: "center" }}>
              <strong className="purple">Jeg liker å løpe...</strong> 🏃‍♂️
            </h2>
            <p>
              Her er løpingen min for {new Date().getFullYear()} i tall.
            </p>
            <Card className="quote-card-view">
              <Card.Body>
                {error && (
                  <div style={{ 
                    textAlign: "center", 
                    marginBottom: "20px",
                    padding: "10px",
                    backgroundColor: "rgba(255, 193, 7, 0.1)",
                    borderRadius: "5px",
                    border: "1px solid rgba(255, 193, 7, 0.3)"
                  }}>
                    <small style={{ color: "#ffc107" }}>
                      ⚠️ {error} - Viser placeholder-data
                    </small>
                  </div>
                )}
                {lastUpdated && (
                  <div style={{ 
                    textAlign: "center", 
                    marginBottom: "20px",
                    fontSize: "0.9em",
                    color: "rgba(255, 255, 255, 0.6)"
                  }}>
                    Sist oppdatert: {formatTimeAgo(lastUpdated)}
                  </div>
                )}
                <Row className="text-center">
                  <Col md={4} style={{ marginBottom: "20px" }}>
                    <div style={{ 
                      padding: "20px", 
                      backgroundColor: "rgba(74, 144, 226, 0.1)", 
                      borderRadius: "10px",
                      border: "1px solid var(--light-ocean)"
                    }}>
                      <h3 style={{ color: "var(--light-ocean)", fontSize: "2.5em", marginBottom: "10px" }}>
                        {loading ? <Spinner animation="border" size="sm" /> : formatRunCount(runningStats?.runsThisYear || 0)}
                      </h3>
                      <p style={{ fontSize: "1.1em", marginBottom: "0" }}>
                        turer i år
                      </p>
                    </div>
                  </Col>
                  <Col md={4} style={{ marginBottom: "20px" }}>
                    <div style={{ 
                      padding: "20px", 
                      backgroundColor: "rgba(74, 144, 226, 0.1)", 
                      borderRadius: "10px",
                      border: "1px solid var(--light-ocean)"
                    }}>
                      <h3 style={{ color: "var(--light-ocean)", fontSize: "2.5em", marginBottom: "10px" }}>
                        {loading ? <Spinner animation="border" size="sm" /> : `${formatDistance(runningStats?.totalKilometers || 0)} km`}
                      </h3>
                      <p style={{ fontSize: "1.1em", marginBottom: "0" }}>
                        totalt i år
                      </p>
                    </div>
                  </Col>
                  <Col md={4} style={{ marginBottom: "20px" }}>
                    <div style={{ 
                      padding: "20px", 
                      backgroundColor: "rgba(74, 144, 226, 0.1)", 
                      borderRadius: "10px",
                      border: "1px solid var(--light-ocean)",
                      height: "100%"
                    }}>
                      <h3 style={{ color: "var(--light-ocean)", fontSize: "2.2em", marginBottom: "8px" }}>
                        {loading ? <Spinner animation="border" size="sm" /> : `${formatDistance(runningStats?.longestRunKm || 0)} km`}
                      </h3>
                      <p style={{ fontSize: "1.1em", marginBottom: "15px", fontWeight: "600" }}>
                        lengste tur
                      </p>
                      {runningStats?.longestRunDetails && !loading && (
                        <div style={{ fontSize: "0.9em", color: "rgba(255, 255, 255, 0.8)" }}>
                          <div style={{ marginBottom: "8px" }}>
                            <strong>📅 {formatDate(runningStats.longestRunDetails.date)}</strong>
                          </div>
                          <div style={{ marginBottom: "6px" }}>
                            ⚡ {runningStats.longestRunDetails.pace} min/km
                          </div>
                          <div style={{ marginBottom: "6px" }}>
                            ⛰️ {runningStats.longestRunDetails.elevationGain}m stigning
                          </div>
                          <div style={{ 
                            fontSize: "0.8em", 
                            fontStyle: "italic",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden"
                          }}>
                            "{runningStats.longestRunDetails.name}"
                          </div>
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Sykling statistikk */}
        <Row style={{ justifyContent: "center", paddingTop: "50px", paddingBottom: "50px" }}>
          <Col md={8}>
            <h2 style={{ fontSize: "2em", paddingBottom: "20px", textAlign: "center" }}>
              <strong className="purple">Og noen ganger sykler jeg og...</strong>
            </h2>
            <p>
              Dataen er hentet direkte fra Strava.
            </p>
            <Card className="quote-card-view">
              <Card.Body>
                <Row>
                  <Col md={4} style={{ marginBottom: "20px" }}>
                    <div style={{ 
                      padding: "20px", 
                      backgroundColor: "rgba(74, 144, 226, 0.1)", 
                      borderRadius: "10px",
                      border: "1px solid var(--light-ocean)",
                      height: "100%"
                    }}>
                      <h3 style={{ color: "var(--light-ocean)", fontSize: "2.2em", marginBottom: "8px" }}>
                        {loading ? <Spinner animation="border" size="sm" /> : formatRunCount(cyclingStats?.ridesThisYear || 0)}
                      </h3>
                      <p style={{ fontSize: "1.1em", marginBottom: "0", fontWeight: "600" }}>
                        turer i år
                      </p>
                    </div>
                  </Col>
                  <Col md={4} style={{ marginBottom: "20px" }}>
                    <div style={{ 
                      padding: "20px", 
                      backgroundColor: "rgba(74, 144, 226, 0.1)", 
                      borderRadius: "10px",
                      border: "1px solid var(--light-ocean)",
                      height: "100%"
                    }}>
                      <h3 style={{ color: "var(--light-ocean)", fontSize: "2.2em", marginBottom: "8px" }}>
                        {loading ? <Spinner animation="border" size="sm" /> : `${formatDistance(cyclingStats?.totalKilometers || 0)} km`}
                      </h3>
                      <p style={{ fontSize: "1.1em", marginBottom: "0", fontWeight: "600" }}>
                        totalt i år
                      </p>
                    </div>
                  </Col>
                  <Col md={4} style={{ marginBottom: "20px" }}>
                    <div style={{ 
                      padding: "20px", 
                      backgroundColor: "rgba(74, 144, 226, 0.1)", 
                      borderRadius: "10px",
                      border: "1px solid var(--light-ocean)",
                      height: "100%"
                    }}>
                      <h3 style={{ color: "var(--light-ocean)", fontSize: "2.2em", marginBottom: "8px" }}>
                        {loading ? <Spinner animation="border" size="sm" /> : `${formatDistance(cyclingStats?.longestRideKm || 0)} km`}
                      </h3>
                      <p style={{ fontSize: "1.1em", marginBottom: "15px", fontWeight: "600" }}>
                        lengste tur
                      </p>
                      {cyclingStats?.longestRideDetails && !loading && (
                        <div style={{ fontSize: "0.9em", color: "rgba(255, 255, 255, 0.8)" }}>
                          <div style={{ marginBottom: "8px" }}>
                            <strong>📅 {formatDate(cyclingStats.longestRideDetails.date)}</strong>
                          </div>
                          <div style={{ marginBottom: "6px" }}>
                            🚴 {cyclingStats.longestRideDetails.avgSpeed} km/t
                          </div>
                          <div style={{ marginBottom: "6px" }}>
                            ⛰️ {cyclingStats.longestRideDetails.elevationGain}m stigning
                          </div>
                          <div style={{ 
                            fontSize: "0.8em", 
                            fontStyle: "italic",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden"
                          }}>
                            "{cyclingStats.longestRideDetails.name}"
                          </div>
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* GitHub aktivitet seksjonen */}
        <Row style={{ justifyContent: "center", paddingTop: "50px", paddingBottom: "50px" }}>
          <Col md={8}>
            <h2 style={{ fontSize: "2em", paddingBottom: "20px", textAlign: "center" }}>
              Hvor ofte jeg <strong className="purple">progger</strong>
            </h2>
            <Card className="quote-card-view">
              <Card.Body>
                <div style={{ 
                  padding: "40px", 
                  textAlign: "center",
                  backgroundColor: "#0d1117",
                  borderRadius: "10px",
                  border: "1px solid #21262d"
                }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%"
                  }}>
                    <GitHubCalendar
                      username="vuhnger"
                      blockSize={12}
                      blockMargin={3}
                      color="#39d353"
                      fontSize={14}
                      style={{
                        color: '#7d8590'
                      }}
                    />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default About;
