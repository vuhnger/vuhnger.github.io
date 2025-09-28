import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import EdgeComputingVisualization from "../EdgeComputingVisualization";
import spikeyWhites from "../../Assets/forest-spiky-white.svg";

const Thesis: React.FC = () => {
  return (
    <Container fluid className="about-section">
      {/* Edge Computing Visualization Background */}
      <EdgeComputingVisualization />
      
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

      <Container fluid>
        <Row style={{ justifyContent: "center", padding: "10px", position: "relative", zIndex: 2 }}>
          <Col md={10} lg={8}>
            <h1 style={{ 
              fontSize: "2.6em", 
              paddingBottom: "20px",
              textAlign: "center",
              color: "white"
            }}>
              <strong className="purple">Masteroppgave</strong>
            </h1>
            
            <div style={{ color: "white", lineHeight: "1.6", fontSize: "1.1em" }}>
              <h2 style={{ color: "#c770f0", marginTop: "40px", marginBottom: "20px" }}>
                Edge Computing med KubeEdge: Robusthet og pod-scheduling i ustabile nettverk
              </h2>

              <h3 style={{ color: "#c770f0", marginTop: "30px", marginBottom: "15px" }}>
                Hva er KubeEdge?
              </h3>
              <p>
                KubeEdge er et åpen kildekode-system som utvider Kubernetes med innebygd støtte for edge computing. 
                Det introduserer <strong>CloudCore</strong>, som kjører i et datasenter, og <strong>EdgeCore</strong>, 
                som kjører på enheter ute i felten. Denne arkitekturen gjør det mulig å administrere applikasjoner 
                og containere ikke bare i skyen, men også på distribuerte noder ved nettverkskanten (the edge).
              </p>
              <p>
                I tillegg tilbyr <strong>EdgeMesh</strong> en lettvekts tjenestemesh og rutingsprotokoll for 
                kommunikasjon mellom edge-noder. Dette er særlig relevant i scenarioer der nettverkstilkoblingen 
                er ustabil eller midlertidig utilgjengelig. Kombinasjonen muliggjør utrulling og orkestrering av 
                applikasjoner i edge-miljøer hvor vanlige Kubernetes-klynger vil utfordringer.
              </p>
              <p>
                KubeEdge passer godt inn i moderne distribuerte systemer, og er aktuelt både i sivile og militære 
                brukstilfeller, for eksempel ved sensorsystemer i felt med ujevn tilkobling.
              </p>

              <h3 style={{ color: "#c770f0", marginTop: "30px", marginBottom: "15px" }}>
                Spesifikk problemstilling for oppgaven
              </h3>
              <p>
                Denne masteroppgaven skal undersøke hvordan <strong>KubeEdge og EdgeMesh kan forbedre robusthet 
                og ressursforvaltning i edge-miljøer med ustabil tilkobling</strong>.
              </p>
              <p>
                Arbeidet bygger videre på tidligere studier av Kubernetes-scheduling og kommunikasjon i sky- og 
                fog computing, men flytter fokus mot <strong>praktiske eksperimenter på ekte maskinvare</strong>, 
                inkludert rimelige rutere med <strong>OpenWRT</strong>.
              </p>
              
              <div style={{ 
                backgroundColor: "rgba(199, 112, 240, 0.1)", 
                padding: "20px", 
                borderRadius: "8px", 
                borderLeft: "4px solid #c770f0",
                margin: "20px 0"
              }}>
                <h4 style={{ color: "#c770f0", marginBottom: "15px" }}>
                  De sentrale forskningsspørsmålene er:
                </h4>
                <ul style={{ paddingLeft: "20px" }}>
                  <li style={{ marginBottom: "10px" }}>
                    Hvordan håndterer KubeEdge (med og uten EdgeMesh) midlertidige frakoblinger av edge-noder, 
                    sammenlignet med et Kubernetes-baseline-oppsett (MicroK8s)?
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    Hva er ytelsesmessige fordeler og ulemper når det gjelder latency, <strong>throughput</strong>, 
                    reconnect-tid og ressursbruk på begrensede edge-enheter?
                  </li>
                  <li>
                    Kan utvidelser eller tilpasninger av EdgeMesh gi mer effektiv kommunikasjon enn 
                    standardkonfigurasjonen?
                  </li>
                </ul>
              </div>

              <h3 style={{ color: "#c770f0", marginTop: "30px", marginBottom: "15px" }}>
                Ressursscheduling og nettverk
              </h3>
              <p>
                Kubernetes er allerede god på å planlegge nettverkstrafikk basert på CPU og minne. For edge computing 
                er dette ikke nok. <strong>Nettverkskvalitet</strong> (latency, jitter, throughput, frakoblinger) 
                blir en kritisk faktor.
              </p>
              <p>
                KubeEdge, med sin Cloud/Edge-Coremodell, og Edge Mesh, med peer-to-peer-ruting, gir byggesteiner 
                for å håndtere dette. Oppgaven skal utforske hvor godt disse fungerer i praksis, og om de kan 
                forbedres eller suppleres.
              </p>
              <p>
                Eksperimentene vil starte med <strong>MicroK8s</strong> som baseline, og deretter gå over til 
                <strong>KubeEdge-oppsett</strong> på både vanlige datamaskiner og små rutere (OpenWRT).
              </p>

              <div style={{ 
                backgroundColor: "rgba(0, 255, 65, 0.1)", 
                padding: "20px", 
                borderRadius: "8px", 
                borderLeft: "4px solid #00ff41",
                margin: "20px 0"
              }}>
                <h4 style={{ color: "#00ff41", marginBottom: "15px" }}>
                  Rutere for testing (alle OpenWRT-kompatible):
                </h4>
                <ul style={{ paddingLeft: "20px" }}>
                  <li>Asus RT-AC1200 V2 (NetOnNet)</li>
                  <li>Asus RT-N12E (Power)</li>
                  <li>TP-Link TL-WR902AC (Elkjøp)</li>
                </ul>
              </div>

              <h3 style={{ color: "#c770f0", marginTop: "30px", marginBottom: "15px" }}>
                Arbeidsplan
              </h3>
              <p>
                Arbeidet starter med en <strong>litteraturstudie</strong> av Kubernetes, edge computing og KubeEdge. 
                Deretter settes eksperimentmiljøene opp:
              </p>
              <ul style={{ paddingLeft: "20px" }}>
                <li>Installere MicroK8s lokalt som baseline</li>
                <li>Koble til KubeEdge med CloudCore på en lokal server og EdgeCore på distribuerte enheter</li>
                <li>Integrere EdgeMesh og måle robusthet ved node-frakoblinger</li>
                <li>Utvide eksperimentene til små OpenWRT-baserte rutere</li>
              </ul>
              <p>
                Målinger vil inkludere latency, throughput, reconnect-tid og CPU/minnebruk. 
                Resultatene sammenlignes på tvers av konfigurasjoner.
              </p>

              <h3 style={{ color: "#c770f0", marginTop: "30px", marginBottom: "15px" }}>
                Læringsutbytte
              </h3>
              <p>Gjennom oppgaven får studenten erfaring med:</p>
              <ul style={{ paddingLeft: "20px" }}>
                <li>Formulere, undersøke og besvare forskningsspørsmål innen distribuerte systemer</li>
                <li>Sette opp og eksperimentere med Kubernetes, KubeEdge og edge-maskinvare</li>
                <li>Måle og analysere ytelsesdata i ustabile nettverk</li>
                <li>Evaluere robusthetsstrategier og utvikle mulige forbedringer til EdgeMesh eller relaterte protokoller</li>
              </ul>

              <div style={{ 
                backgroundColor: "rgba(199, 112, 240, 0.15)", 
                padding: "25px", 
                borderRadius: "10px", 
                marginTop: "40px",
                border: "1px solid rgba(199, 112, 240, 0.3)"
              }}>
                <h3 style={{ color: "#c770f0", marginBottom: "20px", textAlign: "center" }}>
                  Prosjektdetaljer
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <div>
                    <h4 style={{ color: "#c770f0", marginBottom: "10px" }}>Veiledere:</h4>
                    <ul style={{ paddingLeft: "20px", marginBottom: "0" }}>
                      <li>Carsten Griwodz</li>
                      <li>Frank FFI</li>
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ color: "#c770f0", marginBottom: "10px" }}>Detaljer:</h4>
                    <p style={{ marginBottom: "5px" }}><strong>Omfang:</strong> 60 studiepoeng</p>
                    <p style={{ marginBottom: "0" }}><strong>Institutt:</strong> Institutt for informatikk, UiO</p>
                  </div>
                </div>
                
                <h4 style={{ color: "#c770f0", marginTop: "20px", marginBottom: "10px" }}>Betingelser:</h4>
                <ul style={{ paddingLeft: "20px", marginBottom: "0" }}>
                  <li>Ta dette som en lang masteroppgave (60 studiepoeng)</li>
                  <li>Delta aktivt i de ukentlige SINLab-møtene</li>
                  <li>Inkludere kurs i distribuerte systemer i studieplanen</li>
                </ul>
              </div>

              {/* Footnotes */}
              <div style={{ 
                marginTop: "40px", 
                paddingTop: "20px", 
                borderTop: "1px solid rgba(255, 255, 255, 0.3)",
                fontSize: "0.9em",
                color: "rgba(255, 255, 255, 0.7)"
              }}>
                <h4 style={{ color: "#c770f0", marginBottom: "15px", fontSize: "1.1em" }}>
                  Fotnoter:
                </h4>
                <p>
                  <strong>[1]</strong> Edgemesh: infrastrukturlag som automatisk håndterer kommunikasjon, 
                  sikkerhet og overvåkning mellom mikrotjenester uten at dette bygges inn i selve applikasjonene.
                </p>
                <p>
                  <strong>[2]</strong> Vanlige Kubernetes-cluster forutsetter stabil nettverkstilkobling mellom 
                  master og noder. I edge-miljøer med lav båndbredde og hyppige frakoblinger feiler dette, 
                  dette er det KubeEdge og EdgeMesh adresserer.
                </p>
                <p>
                  <strong>[3]</strong> Det er robustheten til KubeEdge i møte med disconnects som gjør at den 
                  passer i distribuerte systemer som må virke både i "perfekte" datanett og i vanskelige miljøer.
                </p>
                <p>
                  <strong>[4]</strong> Standardkonfigurasjonen av EdgeMesh etablerer en enkel peer-to-peer 
                  tjenestemesh hvor edge-noder automatisk kan oppdage og kommunisere med hverandre via TCP-basert 
                  ruting uten ekstra tilpasninger.
                </p>
                <p>
                  <strong>[5]</strong> Med byggesteiner menes grunnleggende funksjoner som orkestrering (KubeEdge) 
                  og basiskommunikasjon (EdgeMesh) som andre løsninger kan bygge videre på.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Thesis;