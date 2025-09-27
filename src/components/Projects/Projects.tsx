import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import spikeyWhites from "../../Assets/forest-spiky-white.svg";
import SnakeGame from "../SnakeGame";

const Projects: React.FC = () => {
  return (
    <Container fluid className="project-section" style={{ position: "relative" }}>
      {/* Snake Game */}
      <SnakeGame />

      {/* Forest background silhouette */}
      <div
        className="forest-background"
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100vw",
          height: "300px",
          backgroundImage: `url(${spikeyWhites})`,
          backgroundRepeat: "repeat-x",
          backgroundPosition: "bottom center",
          backgroundSize: "cover",
          opacity: 0.1,
          zIndex: 1,
          pointerEvents: "none"
        }}
      />

      <Container style={{ position: "relative", zIndex: 2 }}>
        <h1 className="project-heading">
          Mine siste <strong className="purple">prosjekter </strong>
        </h1>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={12} style={{ textAlign: "center", padding: "50px" }}>
            <p style={{ color: "white", fontSize: "1.2em" }}>
              Denne siden er jeg ikke ferdig med ennå, men her kommer straks alle prosjektene jeg har jobbet på. ;)
            </p>
            <br />
            <br />
            <p style={{ color: "white", fontSize: "1.2em" }}>
              Spill litt snake mens du venter!
            </p>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <p style={{ color: "white", fontSize: "1.2em" }}>
              Slangen bruker en algoritme for stifinding til å vise deg raskeste vei til nærmeste eple.
            </p>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Projects;
