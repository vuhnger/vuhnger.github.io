import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Home2 from "./Home2";
import Type from "./Type";
import MasterCountdown from "../MasterCountdown";
import mountainsImg from "../../Assets/mountains.svg";

const Home: React.FC = () => {
  return (
    <section>
      <MasterCountdown />
      <Home2 />
    </section>
  );
};

export default Home;
