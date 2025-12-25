import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hei alle sammen, jeg heter <span className="purple">Victor Rørslett Uhnger </span>
            og er fra <span className="purple"> Oslo, Norge.</span>
            <br />
            Jeg tar for tiden en mastergrad i Programmering og Systemarkitektur ved Universitetet i Oslo.
            <br />
            Ved siden av studiene jobber jeg som administrativ koordinator hos Dr. Dropin BHT.
            <br />
            <br />
            Utenom koding, er det andre ting jeg liker å gjøre!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Løping
            </li>
            <li className="about-activity">
              <ImPointRight /> Reising
            </li>
            <li className="about-activity">
              <ImPointRight /> Lage god stemning
            </li>
          </ul>

          <p style={{ color: "var(--color-accent)" }}>
            "Bygg ting som løser reelle problemer!"{" "}
          </p>
          <footer className="blockquote-footer">Victor</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
