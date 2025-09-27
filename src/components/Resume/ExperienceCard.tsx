import React from "react";
import { Card, Col } from "react-bootstrap";

interface ExperienceCardProps {
  companyLogo: string;
  companyName: string;
  fromDate: string;
  toDate: string;
  title: string;
  description: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  companyLogo,
  companyName,
  fromDate,
  toDate,
  title,
  description
}) => {
  return (
    <Col md={10} className="experience-card-col" style={{ marginBottom: "30px" }}>
      <Card className="experience-card h-100" style={{
        background: "rgba(74, 144, 226, 0.1)",
        border: "1px solid var(--light-ocean)",
        borderRadius: "10px",
        transition: "transform 0.3s ease-in-out",
        width: "100%"
      }}>
        <Card.Body style={{ padding: "25px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
            {/* Company Logo */}
            <div style={{
              minWidth: "80px",
              width: "80px",
              height: "80px",
              backgroundColor: "white",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
              border: "1px solid #e0e0e0",
              overflow: "hidden"
            }}>
              <img 
                src={companyLogo} 
                alt={`${companyName} logo`}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain"
                }}
                onError={(e) => {
                  // Fallback to company initials if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallbackElement = target.parentElement?.querySelector('.fallback-text') as HTMLDivElement;
                  if (fallbackElement) {
                    fallbackElement.style.display = 'flex';
                  }
                }}
              />
              <div 
                className="fallback-text"
                style={{
                  display: "none",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  fontSize: "1.5em",
                  fontWeight: "bold",
                  color: "var(--ocean-blue)",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "6px"
                }}
              >
                {companyName.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1 }}>
              {/* Date Range */}
              <div style={{
                fontSize: "0.9em",
                color: "var(--light-ocean)",
                fontWeight: "600",
                marginBottom: "8px"
              }}>
                {fromDate} - {toDate}
              </div>

              {/* Job Title */}
              <h5 style={{
                color: "white",
                fontSize: "1.3em",
                marginBottom: "12px",
                fontWeight: "600"
              }}>
                {title}
              </h5>

              {/* Company Name */}
              <div style={{
                fontSize: "1em",
                color: "var(--light-ocean)",
                marginBottom: "15px",
                fontStyle: "italic"
              }}>
                @ {companyName}
              </div>

              {/* Description */}
              <p style={{
                fontSize: "0.95em",
                color: "rgba(255, 255, 255, 0.8)",
                lineHeight: "1.5",
                marginBottom: "0"
              }}>
                {description}
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ExperienceCard;