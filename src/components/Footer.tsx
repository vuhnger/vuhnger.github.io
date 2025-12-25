import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  AiFillGithub,
} from "react-icons/ai";
import { FaLinkedinIn, FaStrava } from "react-icons/fa";

const Footer: React.FC = () => {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <Container fluid className="footer">
      <Row>
        <Col md="4" className="footer-copywright">
          <h3>Designet og utviklet av Victor Uhnger</h3>
        </Col>
        <Col md="4" className="footer-copywright">
          <h3>Copyright © {year} VU</h3>
        </Col>
        <Col md="4" className="footer-body">
          <ul className="footer-icons">
            <li className="social-icons">
              <a
                href="https://github.com/vuhnger"
                style={{ color: "var(--color-text)" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiFillGithub />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.linkedin.com/in/victor-uhnger/"
                style={{ color: "var(--color-text)" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.strava.com/athletes/34349129"
                style={{ color: "var(--color-text)" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaStrava />
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
