import React from "react";
import GitHubCalendar from "react-github-calendar";
import { Row } from "react-bootstrap";

function Github() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
      <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
        Dager jeg <strong className="purple">Koder</strong>
      </h1>
      <div style={{ width: "100%", maxWidth: "1200px", overflow: "auto" }}>
        <GitHubCalendar
          username="soumyajit4419"
          blockSize={22}
          blockMargin={8}
          color="#c084f5"
          fontSize={20}
          style={{ width: "100%" }}
        />
      </div>
    </Row>
  );
}

export default Github;
