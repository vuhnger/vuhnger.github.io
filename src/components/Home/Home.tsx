import React from "react";
import Home2 from "./Home2";
import MasterCountdown from "../MasterCountdown";

const Home: React.FC = () => {
  return (
    <section>
      <MasterCountdown />
      <Home2 />
    </section>
  );
};

export default Home;
