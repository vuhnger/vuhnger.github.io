import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.png";
import mountainsImg from "../../Assets/mountains-white.svg";
import Tilt from "react-parallax-tilt";
import CodingStats from "../CodingStats";
import {
  AiFillGithub,
} from "react-icons/ai";
import { FaLinkedinIn, FaStrava } from "react-icons/fa";

const Home2: React.FC = () => {
  return (
    <Container fluid className="home-about-section" id="about" style={{ position: "relative" }}>
      {/* Mountains background positioned to cover full width */}
      <div 
        className="mountains-background"
        style={{
          position: "absolute",
          top: "20%",
          left: 0,
          width: "100vw",
          height: "400px",
          backgroundImage: `url(${mountainsImg})`,
          backgroundRepeat: "repeat-x",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          opacity: 0.08,
          zIndex: 1,
          pointerEvents: "none"
        }}
      />
      
      <Container style={{ position: "relative" }}>
        <Row>
          <Col md={8} className="home-about-description" style={{ position: "relative", zIndex: 2 }}>
            <h1 style={{ fontSize: "2.6em" }}>
              Jeg heter <span className="purple"> Victor Uhnger </span>
            </h1>
            <p className="home-about-body">
              Jeg er 24 år gammel og tar en mastergrad i
              <i>
                <b className="purple"> programmering og systemarkitektur</b>
              </i>



              <br />
              <br />

              Jeg vil bygge ting som
              <i>
                <b className="purple"> løser reelle problemer. </b>
              </i>


              <br />
              <br />

              Mine interessefelter inkluderer softwareutvikling og

              <i>
                <b className="purple"> distribuerte systemer. </b>
              </i>

              <br />
              <br />
              Men, jeg er også glad i løping, god stemning og reising.

              <br />
              <br />
              <i>
                <h3>
                  <b className="purple"> Er du rekrutterer? </b>
                  Se <a href="/resume">hitover!</a>
                </h3>
              </i>

            </p>
          </Col>
          <Col md={4} className="myAvtar" style={{ position: "relative", zIndex: 2 }}>
            <Tilt>
              <img 
                src={myImg} 
                className="img-fluid" 
                alt="avatar" 
                style={{
                  borderRadius: "20px",
                  border: "2px solid #4A90E2",
                  padding: "5px"
                }}
              />
            </Tilt>
          </Col>
        </Row>
        
        {/* Coding Statistics Section */}
        <CodingStats />
        
      </Container>
    </Container>
  );
};

export default Home2;
