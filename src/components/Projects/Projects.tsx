import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCards from "./ProjectCards";
import SnakeGame from "../SnakeGame";
import peoplyImg from "../../Assets/navet.webp"; // Placeholder
import androidImg from "../../Assets/maki.webp"; // Placeholder

const Projects: React.FC = () => {
  return (
    <Container fluid className="project-section" style={{ position: "relative" }}>
      {/* Snake Game */}
      <SnakeGame />

      <Container style={{ position: "relative", zIndex: 2 }}>
        <h1 className="project-heading">
          Mine siste <strong className="purple">prosjekter </strong>
        </h1>
        <p style={{ color: "var(--color-text)", textAlign: "center" }}>
          Her er noen av prosjektene jeg har jobbet med nylig.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCards
              imgPath={peoplyImg}
              isBlog={false}
              title="peoply.app"
              description="Eventkalender for CS-studenter, bygget med TypeScript, React og Nest.js. Ansvarlig for drift og utvikling siden sommeren 2024. Leder prosjektet, støtter studenter med oppsett og kodegjennomgang, og organiserer frivillige meetups om webutvikling."
              ghLink="https://github.com/vuhnger"
              demoLink="https://www.peoply.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCards
              imgPath={androidImg}
              isBlog={false}
              title="IN2000 Android App"
              description="Kotlin-app med Jetpack Compose for Meteorologisk institutt. Integrerte MET-APIer for risikovurdering og anbefalinger for vannsport. Fokus på forretningslogikk, enveis dataflyt, API-integrasjon og database-design. Fikk karakter A."
              ghLink="https://github.com/vuhnger"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Projects;
