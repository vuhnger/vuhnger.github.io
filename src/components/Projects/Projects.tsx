import React, { useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { BsGithub, BsLink45Deg } from "react-icons/bs";
import MSTVisualization from "../MSTVisualization";
import peoplyImg from "../../Assets/navet.webp";
import androidImg from "../../Assets/maki.webp";

interface Project {
  id: number;
  title: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  link?: string;
  github?: string;
  techStack: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "peoply.app",
    shortDescription: "Eventkalender for CS-studenter, bygget med TypeScript, React og Nest.js.",
    longDescription: "Eventkalender for informatikkstudenter i Oslo. Plattformen samler arrangementer fra ulike linjeforeninger og bedrifter på ett sted. Jeg har vært ansvarlig for drift og videreutvikling siden sommeren 2024. Dette innebærer ledelse av prosjektet, opplæring av nye studenter i moderne webutvikling, og kodesignering. Vi arrangerer også jevnlige hackathons og meetups for å lære bort teknologi.",
    image: peoplyImg,
    link: "https://www.peoply.app/",
    github: "https://github.com/vuhnger",
    techStack: ["TypeScript", "React", "Nest.js", "PostgreSQL", "Docker"]
  },
  {
    id: 2,
    title: "IN2000 Android App",
    shortDescription: "Kotlin-app med Jetpack Compose for Meteorologisk institutt.",
    longDescription: "En omfattende Android-applikasjon utviklet som en del av emnet IN2000 - Software Engineering. Appen bruker Jetpack Compose for UI og integrerer mot Meteorologisk institutt sine APIer for å gi risikovurderinger og anbefalinger for vannsportaktiviteter. Prosjektet fokuserte tungt på arkitektur (MVVM), enveis dataflyt, asynkron programmering med Coroutines, og universell utforming. Prosjektet fikk toppkarakter (A).",
    image: androidImg,
    github: "https://github.com/vuhnger",
    techStack: ["Kotlin", "Jetpack Compose", "Retrofit", "Room", "Figma"]
  }
];

const Projects: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleShow = (project: Project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <div>
      <MSTVisualization />
      <Container fluid className="project-section" style={{ paddingTop: "120px", paddingBottom: "100px", background: "transparent" }}>
        <Container>
          <h1 className="project-heading" style={{ marginBottom: "60px", textAlign: "center" }}>
          Mine <strong className="purple">prosjekter</strong>
        </h1>
        
        {projects.map((project, index) => (
          <Row 
            key={project.id} 
            className="project-row" 
            style={{ 
              marginBottom: "100px", 
              alignItems: "center",
              flexDirection: index % 2 === 0 ? "row" : "row-reverse"
            }}
          >
            <Col md={7} style={{ position: 'relative' }}>
              <div 
                className="project-image-container"
                onClick={() => handleShow(project)}
                style={{ 
                  cursor: "pointer", 
                  overflow: "hidden", 
                  borderRadius: "15px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                  transform: "perspective(1000px) rotateY(0deg)",
                  transition: "transform 0.5s ease"
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="img-fluid"
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
                <div className="project-overlay" style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "rgba(0,0,0,0.2)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <span style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold" }}>Se detaljer</span>
                </div>
              </div>
            </Col>
            
            <Col md={5} style={{ padding: "40px", textAlign: index % 2 === 0 ? "left" : "right" }}>
              <h2 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "20px" }}>{project.title}</h2>
              <p style={{ fontSize: "1.2rem", color: "var(--color-text)", marginBottom: "30px" }}>
                {project.shortDescription}
              </p>
              <div style={{ marginBottom: "30px" }}>
                {project.techStack.map(tech => (
                  <span key={tech} style={{
                    display: "inline-block",
                    background: "rgba(210, 220, 182, 0.1)",
                    color: "var(--color-accent)",
                    padding: "5px 15px",
                    borderRadius: "20px",
                    margin: "5px",
                    fontSize: "0.9rem",
                    border: "1px solid var(--color-accent)"
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
              <Button 
                variant="primary" 
                onClick={() => handleShow(project)}
                className="fork-btn-inner"
              >
                Les mer
              </Button>
            </Col>
          </Row>
        ))}

        <Modal 
          show={showModal} 
          onHide={handleClose} 
          size="lg"
          centered
          className="project-modal"
        >
          <Modal.Header closeButton style={{ 
            backgroundColor: "var(--color-grey-ui)", 
            color: "white", 
            borderBottom: "1px solid rgba(255,255,255,0.1)" 
          }}>
            <Modal.Title>{selectedProject?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ 
            backgroundColor: "var(--color-grey-ui)", 
            color: "var(--color-text)" 
          }}>
            <img 
              src={selectedProject?.image} 
              alt={selectedProject?.title} 
              style={{ width: "100%", borderRadius: "10px", marginBottom: "30px" }} 
            />
            <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
              {selectedProject?.longDescription}
            </p>
            <div style={{ marginTop: "30px" }}>
              {selectedProject?.github && (
                <Button 
                  variant="dark" 
                  href={selectedProject.github} 
                  target="_blank" 
                  style={{ marginRight: "15px" }}
                >
                  <BsGithub /> GitHub
                </Button>
              )}
              {selectedProject?.link && (
                <Button 
                  variant="primary" 
                  href={selectedProject.link} 
                  target="_blank"
                >
                  <BsLink45Deg /> Besøk siden
                </Button>
              )}
            </div>
          </Modal.Body>
        </Modal>
      </Container>
    </Container>
    </div>
  );
};

export default Projects;