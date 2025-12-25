import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { UntappdService, defaultUntappdData, mockUntappdData, UntappdUserData } from "../services/untappdService";

const BeerStats: React.FC = () => {
  const [untappdData, setUntappdData] = useState<UntappdUserData>(defaultUntappdData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUntappdData = async () => {
      // TODO: Replace with your actual API credentials
      const CLIENT_ID = process.env.REACT_APP_UNTAPPD_CLIENT_ID || 'YOUR_CLIENT_ID';
      const CLIENT_SECRET = process.env.REACT_APP_UNTAPPD_CLIENT_SECRET || 'YOUR_CLIENT_SECRET';
      const USERNAME = 'vuhnger'; // Your Untappd username
      
      if (CLIENT_ID === 'YOUR_CLIENT_ID' || CLIENT_SECRET === 'YOUR_CLIENT_SECRET') {
        console.log('Untappd API credentials not configured. Using mock data.');
        setUntappdData(mockUntappdData);
        setLoading(false);
        return;
      }

      const untappdService = new UntappdService(CLIENT_ID, CLIENT_SECRET);
      
      try {
        const data = await untappdService.getUserStats(USERNAME);
        if (data) {
          setUntappdData(data);
        }
      } catch (error) {
        console.error('Error fetching Untappd data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUntappdData();
  }, []);

  const renderStarRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} style={{ color: '#FFD700' }}>★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" style={{ color: '#FFD700' }}>☆</span>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} style={{ color: '#666' }}>☆</span>);
    }
    
    return stars;
  };

  if (loading) {
    return (
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        <Col md={12}>
          <h1 className="project-heading">
            Øl jeg har <strong className="purple">testet 🍺</strong>
          </h1>
          <p style={{ color: "white", textAlign: "center" }}>
            Laster øl-statistikk...
          </p>
        </Col>
      </Row>
    );
  }

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col md={12}>
        <h1 className="project-heading">
          Øl jeg har <strong className="purple">testet 🍺</strong>
        </h1>
        <p className="section-description">
          Hva jeg har drukket i {new Date().getFullYear()}
        </p>
      </Col>

      <Col md={12}>
        <Row style={{ justifyContent: "center", paddingTop: "20px" }}>
          {/* 2025 Beers */}
          <Col xs={6} md={3} className="mb-4">
            <Card className="h-100" style={{
              background: "rgba(74, 144, 226, 0.1)",
              border: "1px solid var(--light-ocean)",
              borderRadius: "10px",
              textAlign: "center"
            }}>
              <Card.Body>
                <h2 style={{ 
                  color: "var(--ocean-blue)", 
                  fontSize: "2.5em", 
                  marginBottom: "10px",
                  fontWeight: "bold"
                }}>
                  {untappdData.beers_in_2025}
                </h2>
                <p style={{ 
                  color: "white", 
                  fontSize: "0.9em", 
                  marginBottom: "5px" 
                }}>
                  Øl i 2025
                </p>
                <div style={{ fontSize: "1.2em" }}>🍺</div>
              </Card.Body>
            </Card>
          </Col>

          {/* Total Unique Beers */}
          <Col xs={6} md={3} className="mb-4">
            <Card className="h-100" style={{
              background: "rgba(74, 144, 226, 0.1)",
              border: "1px solid var(--light-ocean)",
              borderRadius: "10px",
              textAlign: "center"
            }}>
              <Card.Body>
                <h2 style={{ 
                  color: "var(--ocean-blue)", 
                  fontSize: "2.5em", 
                  marginBottom: "10px",
                  fontWeight: "bold"
                }}>
                  {untappdData.stats.total_unique_beers}
                </h2>
                <p style={{ 
                  color: "white", 
                  fontSize: "0.9em", 
                  marginBottom: "5px" 
                }}>
                  Unike øl
                </p>
                <div style={{ fontSize: "1.2em" }}>🎯</div>
              </Card.Body>
            </Card>
          </Col>

          {/* Total Check-ins */}
          <Col xs={6} md={3} className="mb-4">
            <Card className="h-100" style={{
              background: "rgba(74, 144, 226, 0.1)",
              border: "1px solid var(--light-ocean)",
              borderRadius: "10px",
              textAlign: "center"
            }}>
              <Card.Body>
                <h2 style={{ 
                  color: "var(--ocean-blue)", 
                  fontSize: "2.5em", 
                  marginBottom: "10px",
                  fontWeight: "bold"
                }}>
                  {untappdData.stats.total_beers}
                </h2>
                <p style={{ 
                  color: "white", 
                  fontSize: "0.9em", 
                  marginBottom: "5px" 
                }}>
                  Totale check-ins
                </p>
                <div style={{ fontSize: "1.2em" }}>📊</div>
              </Card.Body>
            </Card>
          </Col>

          {/* Badges */}
          <Col xs={6} md={3} className="mb-4">
            <Card className="h-100" style={{
              background: "rgba(74, 144, 226, 0.1)",
              border: "1px solid var(--light-ocean)",
              borderRadius: "10px",
              textAlign: "center"
            }}>
              <Card.Body>
                <h2 style={{ 
                  color: "var(--ocean-blue)", 
                  fontSize: "2.5em", 
                  marginBottom: "10px",
                  fontWeight: "bold"
                }}>
                  {untappdData.stats.total_badges}
                </h2>
                <p style={{ 
                  color: "white", 
                  fontSize: "0.9em", 
                  marginBottom: "5px" 
                }}>
                  Badges opptjent
                </p>
                <div style={{ fontSize: "1.2em" }}>🏆</div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Highest Rated Beer */}
        {untappdData.highest_rated_beer && (
          <Row style={{ justifyContent: "center", paddingTop: "30px" }}>
            <Col md={8}>
              <Card style={{
                background: "rgba(255, 215, 0, 0.1)",
                border: "1px solid #FFD700",
                borderRadius: "15px",
                textAlign: "center"
              }}>
                <Card.Body>
                  <h3 style={{ 
                    color: "#FFD700", 
                    fontSize: "1.3em", 
                    marginBottom: "15px" 
                  }}>
                    🏆 Høyest ratede øl
                  </h3>
                  <h4 style={{ 
                    color: "white", 
                    fontSize: "1.5em", 
                    marginBottom: "5px" 
                  }}>
                    {untappdData.highest_rated_beer.beer_name}
                  </h4>
                  <p style={{ 
                    color: "rgba(255, 255, 255, 0.8)", 
                    fontSize: "1.1em",
                    marginBottom: "10px"
                  }}>
                    {untappdData.highest_rated_beer.brewery_name}
                  </p>
                  <div style={{ fontSize: "1.2em", marginBottom: "10px" }}>
                    {renderStarRating(untappdData.highest_rated_beer.rating_score)}
                  </div>
                  <p style={{ 
                    color: "rgba(255, 255, 255, 0.7)", 
                    fontSize: "0.9em" 
                  }}>
                    {untappdData.highest_rated_beer.beer_style} • {untappdData.highest_rated_beer.beer_abv}% ABV
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default BeerStats;