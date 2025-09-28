import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ExperienceGrid from "./ExperienceGrid";
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

const ResumeNew: React.FC = () => {
  const experiences = [
    {
      companyLogo: drDropinLogo, 
      companyName: "Dr.Dropin Bedrift",
      fromDate: "September 2025",
      toDate: "Nå",
      title: "Adm-cord",
      description: "Diverse techinitiativer og koordinering av daglig drift for BHT-avdelingenen til Dr. Dropin.",
      link: "https://bedrift.drdropin.no/?utm_term=dr.dropin%20bedrift&utm_campaign=1.+NO_B2B_BRD_Brand:+Bedrift&utm_source=adwords&utm_medium=ppc&hsa_acc=4136068837&hsa_cam=19932436464&hsa_grp=148361442672&hsa_ad=654213639998&hsa_src=g&hsa_tgt=kwd-1635655858203&hsa_kw=dr.dropin%20bedrift&hsa_mt=e&hsa_net=adwords&hsa_ver=3&gad_source=1&gad_campaignid=19932436464&gbraid=0AAAAAoZvQoWEEdfsexJW4ms6zTiPnqKXG&gclid=CjwKCAjwlt7GBhAvEiwAKal0ciSzo3InRWkrXyEhusZJoHR-SiVrAfJgJUbKM9BiepOiYSHr02GkrhoCmXAQAvD_BwE"
    },
    {
      companyLogo: bekkLogo, // Method 2: Public folder path (place logo in public/images/company-logos/)
      companyName: "Bekk Consulting AS",
      fromDate: "Juni 2025",
      toDate: "August 2025", 
      title: "Utvikler",
      description: "Sikkerhetsutvikler for Statens Kartverk.",
      link: "https://www.bekk.no/"
    },
    {
      companyLogo: uioLogo, // Method 3: Empty string shows fallback (company initial)
      companyName: "Universitetet i Oslo",
      fromDate: "Juni 2024",
      toDate: "August 2024",
      title: "Utvikler", 
      description: "Jobbet med utvikling av en ny digital læringsplattform for studenter i IN1020 ved institutt for informatikk.",
      link: "https://www.mn.uio.no/ifi/"
    },
    {
      companyLogo: uioLogo, // Method 3: Empty string shows fallback (company initial)
      companyName: "Universitetet i Oslo",
      fromDate: "Juni 2024",
      toDate: "August 2024",
      title: "Podcastvert", 
      description: "Vert for den populærvitenskapelige podcasten Smalltalk, som tar for seg temaer innen teknologi og samfunn.",
      link: "https://www.mn.uio.no/ifi/livet-rundt-studiene/podcast/"
    },
    {
      companyLogo: uioLogo, // Method 3: Empty string shows fallback (company initial)
      companyName: "Universitetet i Oslo",
      fromDate: "August 2023",
      toDate: "September 2025",
      title: "Gruppelærer, sensor og veileder", 
      description: "Har undervist i en rekke emner innen programmering, algoritmer og datastrukturer for bachelorstudenter ved institutt for informatikk.",
      link: ""
    },
    {
      companyLogo: forsvaretLogo,
      companyName: "Forsvaret",
      fromDate: "September 2020",
      toDate: "September 2021",
      title: "Førstegangstjeneste",
      description: "Avtjent førstegangstjeneste i Forsvaret, med hemmelig sikkerhetsklarering.",
      link: ""
    }
  ];

  return (
    <div>
      <Container fluid className="resume-section">
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
          <Col md={10} style={{ paddingBottom: "50px" }}>
            <h1 style={{ 
              fontSize: "2.1em", 
              paddingBottom: "30px",
              textAlign: "center",
              color: "white"
            }}>
              Min <strong className="purple">CV</strong>
            </h1>
            
            {/* Experience Grid */}
            <ExperienceGrid experiences={experiences} />
            
            {/* You can add more sections here like Education, Skills, etc. */}
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <p style={{ fontSize: "1.1em", color: "rgba(255, 255, 255, 0.8)" }}>
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
