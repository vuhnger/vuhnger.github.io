import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";

const ResumeNew: React.FC = () => {
  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />
        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Col md={7} style={{ paddingBottom: "50px" }}>
            <h1 style={{ fontSize: "2.1em", paddingBottom: "30px" }}>
              Resume
            </h1>
            <p style={{ textAlign: "center", fontSize: "1.2em" }}>
              Resume content will be added here soon.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ResumeNew;
