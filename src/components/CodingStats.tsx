import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { WakaTimeService } from "../services/wakaTimeService";

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

const CodingStats: React.FC = () => {
  const [codingStats, setCodingStats] = useState<CodingStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCodingStats = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const coding = await WakaTimeService.getCodingStatsWithCache();
        setCodingStats(coding);
        
      } catch (err) {
        console.error('Failed to fetch coding stats:', err);
        setError('Kunne ikke laste kodingsstatistikk');
        
        setCodingStats({
          hoursThisMonth: 0,
          topLanguage: 'Ukjent',
          topLanguagePercent: 0,
          dailyAverage: 0,
          totalLanguages: 0,
          topEditor: 'VS Code',
          isUpToDate: false,
          languages: []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCodingStats();
  }, []);

  return (
    <Container fluid style={{ paddingTop: "50px", paddingBottom: "50px" }}>
      <Row style={{ justifyContent: "center" }}>
        <Col md={8}>
          <h2 style={{ fontSize: "2em", paddingBottom: "20px", textAlign: "center" }}>
            <strong className="purple">Meg i tall</strong> 📊
          </h2>
          <Card className="quote-card-view">
            <Card.Body>
              <Row className="text-center">
                <Col md={6} style={{ marginBottom: "20px" }}>
                  <div style={{ 
                    padding: "20px", 
                    backgroundColor: "rgba(74, 144, 226, 0.1)", 
                    borderRadius: "10px",
                    border: "1px solid var(--light-ocean)"
                  }}>
                    <h3 style={{ color: "var(--light-ocean)", fontSize: "2.5em", marginBottom: "10px" }}>
                      {loading ? <Spinner animation="border" size="sm" /> : `${codingStats?.hoursThisMonth || 0}t`}
                    </h3>
                    <p style={{ fontSize: "1.1em", marginBottom: "0" }}>
                      kodet denne måneden
                    </p>
                  </div>
                </Col>
                <Col md={6} style={{ marginBottom: "20px" }}>
                  <div style={{ 
                    padding: "20px", 
                    backgroundColor: "rgba(74, 144, 226, 0.1)", 
                    borderRadius: "10px",
                    border: "1px solid var(--light-ocean)"
                  }}>
                    <h3 style={{ color: "var(--light-ocean)", fontSize: "2.2em", marginBottom: "10px" }}>
                      {loading ? <Spinner animation="border" size="sm" /> : `${codingStats?.dailyAverage || 0}t`}
                    </h3>
                    <p style={{ fontSize: "1.1em", marginBottom: "0" }}>
                      gjennomsnitt per dag
                    </p>
                  </div>
                </Col>
              </Row>
              <Row className="text-center" style={{ marginTop: "10px" }}>
                <Col md={6} style={{ marginBottom: "20px" }}>
                  <div style={{ 
                    padding: "20px", 
                    backgroundColor: "rgba(74, 144, 226, 0.1)", 
                    borderRadius: "10px",
                    border: "1px solid var(--light-ocean)",
                    height: "100%"
                  }}>
                    <h3 style={{ color: "var(--light-ocean)", fontSize: "2.2em", marginBottom: "8px" }}>
                      {loading ? <Spinner animation="border" size="sm" /> : codingStats?.topLanguage || 'Ukjent'}
                    </h3>
                    <p style={{ fontSize: "1.1em", marginBottom: "10px", fontWeight: "600" }}>
                      mest brukte språk
                    </p>
                    {codingStats && !loading && (
                      <div style={{ fontSize: "0.9em", color: "rgba(255, 255, 255, 0.8)" }}>
                        📊 {codingStats.topLanguagePercent}% av tiden
                      </div>
                    )}
                  </div>
                </Col>
                <Col md={6} style={{ marginBottom: "20px" }}>
                  <div style={{ 
                    padding: "20px", 
                    backgroundColor: "rgba(74, 144, 226, 0.1)", 
                    borderRadius: "10px",
                    border: "1px solid var(--light-ocean)",
                    height: "100%"
                  }}>
                    <h3 style={{ color: "var(--light-ocean)", fontSize: "2.2em", marginBottom: "8px" }}>
                      {loading ? <Spinner animation="border" size="sm" /> : codingStats?.totalLanguages || 0}
                    </h3>
                    <p style={{ fontSize: "1.1em", marginBottom: "10px", fontWeight: "600" }}>
                      språk denne måneden
                    </p>
                    {codingStats && !loading && (
                      <div style={{ fontSize: "0.9em", color: "rgba(255, 255, 255, 0.8)" }}>
                        🖥️ Editor: {codingStats.topEditor}
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Programming Languages breakdown */}
      <Row style={{ justifyContent: "center", paddingTop: "30px" }}>
        <Col md={8}>
          <h3 style={{ fontSize: "1.5em", paddingBottom: "20px", textAlign: "center", color: "white" }}>
            <strong className="purple">Programmeringsspråk</strong> denne måneden
          </h3>
          <Card className="quote-card-view">
            <Card.Body>
              {codingStats?.languages && codingStats.languages.length > 0 && !loading ? (
                <Row>
                  {codingStats.languages.map((language, index) => (
                    <Col key={language.name} md={6} lg={4} style={{ marginBottom: "20px" }}>
                      <div style={{ 
                        padding: "15px", 
                        backgroundColor: "rgba(74, 144, 226, 0.1)", 
                        borderRadius: "8px",
                        border: "1px solid var(--light-ocean)",
                        height: "100%"
                      }}>
                        <div style={{ 
                          display: "flex", 
                          justifyContent: "space-between", 
                          alignItems: "center",
                          marginBottom: "8px"
                        }}>
                          <h4 style={{ 
                            color: "var(--light-ocean)", 
                            fontSize: "1.3em", 
                            marginBottom: "0",
                            fontWeight: "600"
                          }}>
                            {language.name}
                          </h4>
                          <span style={{ 
                            color: "var(--light-ocean)", 
                            fontSize: "1.1em",
                            fontWeight: "bold"
                          }}>
                            {language.percent}%
                          </span>
                        </div>
                        <div style={{ 
                          backgroundColor: "rgba(255, 255, 255, 0.1)", 
                          borderRadius: "4px", 
                          height: "6px",
                          marginBottom: "8px"
                        }}>
                          <div style={{ 
                            backgroundColor: "var(--light-ocean)", 
                            height: "100%", 
                            borderRadius: "4px",
                            width: `${language.percent}%`,
                            transition: "width 0.3s ease"
                          }}></div>
                        </div>
                        <p style={{ 
                          fontSize: "0.9em", 
                          marginBottom: "0",
                          color: "rgba(255, 255, 255, 0.8)"
                        }}>
                          {language.hours}t denne måneden
                        </p>
                      </div>
                    </Col>
                  ))}
                </Row>
              ) : (
                <div style={{ textAlign: "center", padding: "40px" }}>
                  {loading ? (
                    <Spinner animation="border" />
                  ) : (
                    <p style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                      Ingen språkdata tilgjengelig
                    </p>
                  )}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CodingStats;