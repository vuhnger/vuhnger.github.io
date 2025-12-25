import React from "react";
import { Container } from "react-bootstrap";
import SnakeGame from "./SnakeGame";

const SnakeGamePage: React.FC = () => {
  return (
    <Container fluid className="project-section" style={{ minHeight: "100vh", paddingTop: "120px" }}>
      <Container>
        <h1 className="project-heading" style={{ textAlign: "center", marginBottom: "40px" }}>
          Spill <strong className="purple">Snake</strong>
        </h1>
        <SnakeGame />
      </Container>
    </Container>
  );
};

export default SnakeGamePage;
