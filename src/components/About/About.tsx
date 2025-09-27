import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";

const About: React.FC = () => {
  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              About <strong className="purple">Me</strong>
            </h1>
            <p style={{ textAlign: "justify", fontSize: "1.1em" }}>
              About page content will be added here soon.
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default About;
