import React from "react";
import { Container, Row } from "react-bootstrap";
import ExperienceCard from "./ExperienceCard";

interface Experience {
  companyLogo: string;
  companyName: string;
  fromDate: string;
  toDate: string;
  title: string;
  description: string;
  link: string;
}

interface ExperienceGridProps {
  experiences: Experience[];
}

const ExperienceGrid: React.FC<ExperienceGridProps> = ({ experiences }) => {
  return (
    <Container fluid style={{ paddingBottom: "50px" }}>
      <Row style={{ justifyContent: "center", marginBottom: "30px" }}>
        <h2 style={{ 
          fontSize: "2em", 
          textAlign: "center",
          color: "white",
          marginBottom: "20px"
        }}>
        </h2>
      </Row>
      <Row style={{ justifyContent: "center" }}>
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={index}
            companyLogo={experience.companyLogo}
            companyName={experience.companyName}
            fromDate={experience.fromDate}
            toDate={experience.toDate}
            title={experience.title}
            description={experience.description}
          />
        ))}
      </Row>
    </Container>
  );
};

export default ExperienceGrid;