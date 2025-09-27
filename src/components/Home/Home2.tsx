import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.png";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
} from "react-icons/ai";
import { FaLinkedinIn, FaStrava } from "react-icons/fa";

const Home2: React.FC = () => {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I'm a 23-year-old computer science student from Oslo, currently in my 3rd year of bachelor studies.
              <br />
              <br />I'm passionate about
              <i>
                <b className="purple"> React, TypeScript, and Python. </b>
              </i>
              <br />
              <br />
              My field of interests include building modern &nbsp;
              <i>
                <b className="purple">web applications </b> and working on projects that involve{" "}
                <b className="purple">
                  full-stack development.
                </b>
              </i>
              <br />
              <br />
              I have experience with <b className="purple">React + TypeScript</b> on the frontend and
              <i>
                <b className="purple">
                  {" "}
                  Python, PostgreSQL + Django
                </b>
              </i>
              &nbsp; on the backend, along with
              <i>
                <b className="purple"> Docker + Kubernetes</b>
              </i> for deployment.
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/vuhnger"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/victor-uhnger/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.strava.com/athletes/34349129"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaStrava />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Home2;
