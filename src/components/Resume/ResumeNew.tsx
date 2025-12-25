import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ExperienceGrid from "./ExperienceGrid";
import MSTVisualization from "../MSTVisualization";
import spikeyWhites from "../../Assets/forest-spiky-white.svg";
import {
  AiFillGithub,
} from "react-icons/ai";
import { FaLinkedinIn, FaStrava } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

// Import company logos (Method 1: Bundled with app)
import drDropinLogo from "../../Assets/DrDropin_bedrift_primær_positiv.svg";
import bekkLogo from "../../Assets/Bekk-logo.webp";
import uioLogo from "../../Assets/02_uio_segl_pos.jpg";
import forsvaretLogo from "../../Assets/forsvaret_facebook_profilbilde.jpg";
import navetLogo from "../../Assets/navet.webp";
import mapsLogo from "../../Assets/maps.png";
import listLogo from "../../Assets/maki.webp";  

const ResumeNew: React.FC = () => {
  const workExperiences = [
    {
      companyLogo: drDropinLogo, 
      companyName: "Dr. Dropin BHT AS",
      fromDate: "September 2025",
      toDate: "Nå",
      title: "Administrativ Koordinator",
      description: "Ansvarlig for ulike teknologiinitiativer knyttet til effektivisering for bedriftshelsetjenesten. Jobber med automasjon og integrasjon på tvers av ulike forretningsplattformer.",
      link: "https://bedrift.drdropin.no/"
    },
    {
      companyLogo: bekkLogo,
      companyName: "Bekk Consulting AS",
      fromDate: "Juni 2025",
      toDate: "August 2025", 
      title: "Software Developer Intern",
      description: "Sikkerhetsprosjekt for Statens Kartverk. Jobbet i et tverrfaglig team på fire. Bygget en mikrotjeneste for å automatisere og rapportere resultater fra dynamisk applikasjonstesting. Frontend i React + TypeScript, backend i Kotlin med Spring Boot.",
      link: "https://www.bekk.no/"
    },
    {
      companyLogo: uioLogo,
      companyName: "Institutt for Informatikk, UiO",
      fromDate: "Juni 2024",
      toDate: "August 2024",
      title: "Software Developer Intern", 
      description: "Medlem av et team på 10 studenter som utviklet en full-stack app for å spore oblig-resultater for førsteårsstudenter. Fokus på frontend-utvikling, input-validering og oppgavedesign. Bygget REST API med Django, frontend i React + TypeScript, containerisert med Docker.",
      link: "https://www.mn.uio.no/ifi/"
    },
    {
      companyLogo: uioLogo,
      companyName: "Institutt for Informatikk, UiO",
      fromDate: "Desember 2023",
      toDate: "Nå",
      title: "Administrativ Konsulent", 
      description: "Deltidsstilling i studieadministrasjonen. Saksbehandling, veiledning og generelle administrative oppgaver.",
      link: "https://www.mn.uio.no/ifi/"
    },
    {
      companyLogo: uioLogo,
      companyName: "Institutt for Informatikk, UiO",
      fromDate: "August 2023",
      toDate: "Nå",
      title: "Gruppelærer", 
      description: "Undervisningsassistent i IN2000, IN2010, IN1020, IN1010, INF0010, IN2031 og IN3240. Holdt seminarer og veiledet studenter. Høsten 2023 ansvarlig for oppfølging av 70 studenter i et gamifisert undervisningsopplegg.",
      link: "https://www.mn.uio.no/ifi/"
    },
    {
      companyLogo: uioLogo,
      companyName: "Institutt for Informatikk, UiO",
      fromDate: "Juni 2023",
      toDate: "August 2023",
      title: "Software Developer Intern", 
      description: "Utviklet en gamification-plattform for førsteårsstudenter med et tverrfaglig team. Skrevet i TypeScript med React, deployet og brukt som alternativ til tradisjonelle innleveringer et helt semester.",
      link: "https://www.mn.uio.no/ifi/"
    },
    {
      companyLogo: forsvaretLogo,
      companyName: "Forsvaret",
      fromDate: "September 2020",
      toDate: "September 2021",
      title: "Vaktsoldat",
      description: "Militærtjeneste i HV-12 på Værnes Garnison. Valgt som tillitsvalgt av medsoldater.",
      link: "https://www.forsvaret.no/"
    }
  ];

  const education = [
    {
      companyLogo: uioLogo,
      companyName: "Universitetet i Oslo",
      fromDate: "2025",
      toDate: " ",
      title: "Master i Programmering og Systemarkitektur",
      description: "Gjennomsnittskarakter (preliminær): B",
      link: "https://www.mn.uio.no/ifi/"
    },
    {
      companyLogo: uioLogo,
      companyName: "Universitetet i Oslo",
      fromDate: "2022",
      toDate: "2025",
      title: "Bachelor i Informatikk",
      description: "Gjennomsnittskarakter: B",
      link: "https://www.mn.uio.no/ifi/"
    }
  ];

  const volunteerWork = [
    {
      companyLogo: navetLogo,
      companyName: "Navet",
      fromDate: "2022",
      toDate: "Nå",
      title: "Styremedlem / Økonomi-intern", 
      description: "Styremedlem i Navet - bedriftskontakten til institutt for informatikk. Tidligere økonomi-intern.",
      link: "https://navet.no/"
    },
    {
      companyLogo: mapsLogo,
      companyName: "MAPS",
      fromDate: "2022",
      toDate: " ",
      title: "Styremedlem", 
      description: "Ansvarlig for webutvikling og tech i MAPS (Matematikk, Algoritmer og Programmering for Studenter).",
      link: ""
    },
    {
      companyLogo: listLogo,
      companyName: "LI:ST",
      fromDate: "2022",
      toDate: "2024",
      title: "Styreleder / Økonomiansvarlig", 
      description: "Leder (2023-24) og Økonomiansvarlig (2022-23) for linjeforeningen for Språkteknologi (nå MA:KI).",
      link: ""
    },
  ];

  return (
    <div>
      {/* MST Visualization Background */}
      <MSTVisualization />
      
      <Container fluid className="resume-section" style={{ background: "transparent" }}>
        {/* Forest background silhouette */}
        <div 
          className="forest-background"
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100vw",
            height: "300px",
            backgroundImage: `url(${spikeyWhites})`,
            backgroundRepeat: "repeat-x",
            backgroundPosition: "bottom center",
            backgroundSize: "cover",
            opacity: 0.1,
            zIndex: 1,
            pointerEvents: "none"
          }}
        />
        
        <Row style={{ justifyContent: "center", position: "relative", zIndex: 2 }}>
          <Col md={12} style={{ paddingBottom: "50px" }}>
            <h1 style={{ 
              fontSize: "2.1em", 
              paddingBottom: "30px",
              textAlign: "center",
              color: "var(--color-text)"
            }}>
              Min <strong className="purple">CV</strong>
            </h1>
            
            {/* Two Column Layout */}
            <Row>
              {/* Left Column - Education and Volunteer Work */}
              <Col md={6} style={{ paddingRight: "20px" }}>
                {/* Education Section */}
                <div style={{ marginBottom: "50px" }}>
                  <h2 style={{ 
                    fontSize: "1.8em", 
                    paddingBottom: "20px",
                    color: "var(--color-text)",
                    borderBottom: "2px solid var(--color-accent)",
                    marginBottom: "30px"
                  }}>
                    <strong className="purple">Utdanning</strong>
                  </h2>
                  <ExperienceGrid experiences={education} />
                </div>

                {/* Volunteer Work Section */}
                <div>
                  <h2 style={{ 
                    fontSize: "1.8em", 
                    paddingBottom: "20px",
                    color: "var(--color-text)",
                    borderBottom: "2px solid var(--color-accent)",
                    marginBottom: "30px"
                  }}>
                    <strong className="purple">Frivillig arbeid</strong>
                  </h2>
                  <ExperienceGrid experiences={volunteerWork} />
                </div>
              </Col>

              {/* Right Column - Work Experience */}
              <Col md={6} style={{ paddingLeft: "20px" }}>
                <div>
                  <h2 style={{ 
                    fontSize: "1.8em", 
                    paddingBottom: "20px",
                    color: "var(--color-text)",
                    borderBottom: "2px solid var(--color-accent)",
                    marginBottom: "30px"
                  }}>
                    <strong className="purple">Arbeidserfaring</strong>
                  </h2>
                  <ExperienceGrid experiences={workExperiences} />
                </div>
              </Col>
            </Row>
            
            {/* Footer text */}
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <p style={{ fontSize: "1.1em", color: "var(--color-text)" }}>
                Full CV sendes til deg på forespørsel.
              </p>
            </div>
          </Col>
        </Row>
        
        {/* Social Links Section */}
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FINN MEG, DA ;)</h1>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="mailto:victor.uhnger@gmail.com"
                  className="icon-colour  home-social-icons"
                >
                  <AiOutlineMail />
                </a>
              </li>
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
                  href="https://www.linkedin.com/in/victoruhnger/"
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
    </div>
  );
};

export default ResumeNew;
