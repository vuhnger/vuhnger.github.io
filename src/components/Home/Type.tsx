import React from "react";
import Typewriter from "typewriter-effect";

const Type: React.FC = () => {
  return (
    <Typewriter
      options={{
        strings: [
          "Fullstack-utvikler",
          "Informatikkstudent",
          "Frontend-utvikler", 
          "React + TypeScript-utvikler",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
};

export default Type;
