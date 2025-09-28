import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import EdgeComputingVisualization from "../EdgeComputingVisualization";
import spikeyWhites from "../../Assets/forest-spiky-white.svg";

const EdgeComputing: React.FC = () => {
  return (
    <Container fluid className="about-section" style={{ padding: 0 }}>
      {/* Edge Computing Visualization Section - Full screen height */}
      <div style={{ 
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden"
      }}>
        <EdgeComputingVisualization />
        
        {/* Title overlay */}
        <div style={{
          position: "absolute",
          top: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          textAlign: "center"
        }}>
          <h1 style={{ 
            fontSize: "2.6em", 
            color: "white",
            textShadow: "3px 3px 6px rgba(0,0,0,0.8)",
            margin: 0
          }}>
            <strong className="purple">Edge Computing</strong> Visualisering
          </h1>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute",
          bottom: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          textAlign: "center",
          animation: "bounce 2s infinite"
        }}>
          <div style={{
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "0.9em",
            marginBottom: "10px"
          }}>
            Scroll ned for mer info
          </div>
          <div style={{
            color: "rgba(255, 255, 255, 0.5)",
            fontSize: "1.5em"
          }}>
            ↓
          </div>
        </div>
      </div>

      {/* Information Section */}
      <Container fluid style={{ 
        backgroundColor: "rgba(25, 25, 35, 0.95)",
        padding: "60px 0",
        position: "relative",
        minHeight: "100vh"
      }}>
        {/* Add CSS for bounce animation */}
        <style>
          {`
            @keyframes bounce {
              0%, 20%, 50%, 80%, 100% {
                transform: translateY(0) translateX(-50%);
              }
              40% {
                transform: translateY(-10px) translateX(-50%);
              }
              60% {
                transform: translateY(-5px) translateX(-50%);
              }
            }
          `}
        </style>
        {/* Forest background silhouette */}
        <div 
          className="forest-background"
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100vw",
            height: "200px",
            backgroundImage: `url(${spikeyWhites})`,
            backgroundRepeat: "repeat-x",
            backgroundPosition: "bottom center",
            backgroundSize: "cover",
            opacity: 0.05,
            zIndex: 1,
            pointerEvents: "none"
          }}
        />

        <Row style={{ justifyContent: "center", padding: "10px", position: "relative", zIndex: 2 }}>
          <Col md={10} lg={8}>
            <div style={{ color: "white", lineHeight: "1.6", fontSize: "1.1em" }}>
              <p style={{ textAlign: "center", marginBottom: "40px", fontSize: "1.2em", color: "rgba(255, 255, 255, 0.9)" }}>
                Utforsk hvordan edge computing nettverk fungerer med <strong className="purple">KubeEdge</strong> arkitektur.
              </p>

              <Row>
                <Col md={6}>
                  <div style={{ 
                    backgroundColor: "rgba(199, 112, 240, 0.1)", 
                    padding: "25px", 
                    borderRadius: "10px",
                    borderLeft: "4px solid #c770f0",
                    marginBottom: "30px",
                    height: "fit-content"
                  }}>
                    <h3 style={{ color: "#c770f0", marginBottom: "20px" }}>
                      CloudCore (Datasenter)
                    </h3>
                    <ul style={{ paddingLeft: "20px", marginBottom: "0" }}>
                      <li style={{ marginBottom: "8px" }}>Sentral orkestreringsnode</li>
                      <li style={{ marginBottom: "8px" }}>Håndterer pod scheduling</li>
                      <li style={{ marginBottom: "8px" }}>Koordinerer edge nodes</li>
                      <li>Prosesserer data fra feltet</li>
                    </ul>
                  </div>

                  <div style={{ 
                    backgroundColor: "rgba(0, 255, 65, 0.1)", 
                    padding: "25px", 
                    borderRadius: "10px",
                    borderLeft: "4px solid #00ff41",
                    marginBottom: "30px"
                  }}>
                    <h3 style={{ color: "#00ff41", marginBottom: "20px" }}>
                      Edge Nodes (Felt)
                    </h3>
                    <ul style={{ paddingLeft: "20px", marginBottom: "0" }}>
                      <li style={{ marginBottom: "8px" }}>Distribuerte enheter</li>
                      <li style={{ marginBottom: "8px" }}>Kjører containere lokalt</li>
                      <li style={{ marginBottom: "8px" }}>Begrenset ressurser</li>
                      <li>Ustabile nettverksforbindelser</li>
                    </ul>
                  </div>
                </Col>

                <Col md={6}>
                  <div style={{ 
                    backgroundColor: "rgba(255, 255, 0, 0.1)", 
                    padding: "25px", 
                    borderRadius: "10px",
                    borderLeft: "4px solid #ffff00",
                    marginBottom: "30px",
                    height: "fit-content"
                  }}>
                    <h3 style={{ color: "#ffff00", marginBottom: "20px" }}>
                      Pod Migration
                    </h3>
                    <ul style={{ paddingLeft: "20px", marginBottom: "0" }}>
                      <li style={{ marginBottom: "8px" }}>Automatisk failover</li>
                      <li style={{ marginBottom: "8px" }}>Flytter fra frakoblede noder</li>
                      <li style={{ marginBottom: "8px" }}>Minimerer downtime</li>
                      <li>Opprettholder tjenestekvalitet</li>
                    </ul>
                  </div>

                  <div style={{ 
                    backgroundColor: "rgba(100, 150, 255, 0.1)", 
                    padding: "25px", 
                    borderRadius: "10px",
                    borderLeft: "4px solid rgb(100, 150, 255)",
                    marginBottom: "30px"
                  }}>
                    <h3 style={{ color: "rgb(100, 150, 255)", marginBottom: "20px" }}>
                      Data Flow
                    </h3>
                    <ul style={{ paddingLeft: "20px", marginBottom: "0" }}>
                      <li style={{ marginBottom: "8px" }}>Real-time datastrømmer</li>
                      <li style={{ marginBottom: "8px" }}>Bidireksjonell kommunikasjon</li>
                      <li style={{ marginBottom: "8px" }}>Adaptive ruting</li>
                      <li>Fault-tolerant overføring</li>
                    </ul>
                  </div>
                </Col>
              </Row>

              <div style={{ 
                backgroundColor: "rgba(255, 255, 255, 0.1)", 
                padding: "30px", 
                borderRadius: "12px",
                marginTop: "40px",
                border: "1px solid rgba(255, 255, 255, 0.2)"
              }}>
                <h3 style={{ color: "white", marginBottom: "20px", textAlign: "center" }}>
                  Nettverksstatus Indikatorer
                </h3>
                <Row>
                  <Col md={4}>
                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                      <div style={{ 
                        width: "20px", 
                        height: "20px", 
                        backgroundColor: "rgba(0, 255, 65, 0.9)",
                        borderRadius: "50%",
                        margin: "0 auto 10px",
                        filter: "drop-shadow(0 0 6px rgba(0, 255, 65, 0.6))"
                      }}></div>
                      <h4 style={{ color: "#00ff41", fontSize: "1.1em" }}>Connected</h4>
                      <p style={{ fontSize: "0.9em", color: "rgba(255, 255, 255, 0.8)" }}>
                        Stabil forbindelse og aktiv dataflyt
                      </p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                      <div style={{ 
                        width: "20px", 
                        height: "20px", 
                        backgroundColor: "rgba(255, 255, 0, 0.8)",
                        borderRadius: "50%",
                        margin: "0 auto 10px",
                        filter: "drop-shadow(0 0 6px rgba(255, 255, 0, 0.6))"
                      }}></div>
                      <h4 style={{ color: "#ffff00", fontSize: "1.1em" }}>Unstable</h4>
                      <p style={{ fontSize: "0.9em", color: "rgba(255, 255, 255, 0.8)" }}>
                        Intermitterende forbindelsesproblemer
                      </p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                      <div style={{ 
                        width: "20px", 
                        height: "20px", 
                        backgroundColor: "rgba(255, 0, 0, 0.7)",
                        borderRadius: "50%",
                        margin: "0 auto 10px",
                        filter: "drop-shadow(0 0 6px rgba(255, 0, 0, 0.6))"
                      }}></div>
                      <h4 style={{ color: "#ff0000", fontSize: "1.1em" }}>Disconnected</h4>
                      <p style={{ fontSize: "0.9em", color: "rgba(255, 255, 255, 0.8)" }}>
                        Frakobled - pods migrerer automatisk
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>

              <div style={{ 
                textAlign: "center", 
                marginTop: "50px",
                padding: "20px",
                backgroundColor: "rgba(199, 112, 240, 0.05)",
                borderRadius: "10px"
              }}>
                <h3 style={{ color: "#c770f0", marginBottom: "15px" }}>
                  Interaktiv Demonstrasjon
                </h3>
                <p style={{ fontSize: "1.1em", color: "rgba(255, 255, 255, 0.9)", marginBottom: "0" }}>
                  Visualiseringen over viser real-time simulering av et KubeEdge-miljø med automatisk 
                  pod-migrering, nettverksustabilitet og intelligent ruting mellom edge nodes og CloudCore.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default EdgeComputing;