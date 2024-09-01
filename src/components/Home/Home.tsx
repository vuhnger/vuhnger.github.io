import './Home.css';
import portrait from '../../assets/Home/Victor-portrett.jpeg';

export default function Home() {
    return (
      <div className="home-container">
        <div className="home-content">
          <div className="home-image">
            <img 
              src={portrait}
              alt="portrettbilde av Victor Uhnger" 
            />
          </div>
          <div className="home-text">
            <h1>Victor Uhnger</h1>
            <h2>Utvikler og informatikkstudent</h2>
            
            <p>23 år gammel, fra Oslo, studerer informatikk og programmering på 3. året bachelor.</p>
            
            <p>
              Hva er vel bedre enn et problem?
            </p>

            <p>
              En løsning, mener da jeg.
            </p>

            <p>
              Her kan du lese litt om hva jeg har holdt på med de siste årene.
            </p>

          </div>
        </div>

        {/* Full Stack utvikler */}
        <div className="timeline">
          <div className="timeline-item left">
            <div className="timeline-content">
              <h3>Full Stack utvikler</h3>
              <h4>Universitetet i Oslo, 06.24 - nå</h4>
              <p>
                Utvikler en plattform for oppgaveløsing og monitorering av studenters progresjon. Plattformens inngår i et pågående forskningsprosjekt innen læring i informatikkemmner i høyere utdanning. Teamet består av utviklere, designere, dataanalytikere og faglærere. React + TS på frontend og Python, PostgresQL + Django på backend, Docker + Kubernetes for utviklingsmiljø og produksjonssetting.
              </p>
            </div>
          </div>

          {/* Studieadmin */}
          <div className="timeline-item right">
            <div className="timeline-content">
              <h3>Konsulent i studieadministrasjon</h3>
              <h4>
                Institutt for informatikk, 01.24 - nå
              </h4>
              <p>
                Jobber i studieadministrasjonen sin førstelinje. Vi imot studenter og gir de studierelatert veiledning. Arbeidsoppgavene innebærer saksbehandling og forefallende studieadministrativt arbeid. Stillingen stiller særskilte krav til integritet og selvstendighet.
              </p>
            </div>
          </div>

          {/* Gruppelærer */}
          <div className="timeline-item left">
            <div className="timeline-content">
              <h3>Gruppelærer i universitetsemner</h3>
              <h4>
              Institutt for informatikk, 08.23 - nå
              </h4>
              <p>
              Gruppelærere holder seminarundervisningen på instituttet og retter innleveringer. 
              </p>

              <h4>IN1010 - Objektorientert programmering</h4>
              <p>
                Holder seminarer som går ut på livekoding foran studentene for å vise studentene hvordan de kan implementere objektorienterte konsepter og avanserte programmeringsteknikker i Java. Rettet studentene sine innleveringer som gikk ut på å levere løsnigner til litt større problemer i Java. Vurderer og gir studentene individuell tilbakemelding på korrekthet og kodekvalitet.
              </p>

              <h4>IN1020 - Introduksjon til datateknologi</h4>
              <p>
                Hatt gruppelærerstilling i emnet både 2023 og 2024. I 2023 hadde jeg og en annen student ansvaret for oppfølging av et alternativt utdanningsløp for omtrent 70 studenter. Holdt faglige seminarer med en spillifisert variant av undervisningen og fulgte opp gruppene med studenter gjennom semesteret med veiledning og faglige tilbakemeldinger. I 2024 administrerer jeg innleveringssystemet og hjelper gruppelærerteamet med å holde undervisningen sin.
              </p>
            </div>
          </div>

          {/* Frontend utvikler */}
          <div className="timeline-item right">
            <div className="timeline-content">
              <h3>Frontend utvikler</h3>
              <h4>
                Universitetet i Oslo, 06.23 - 08.24
              </h4>
              <p>
                Inngikk i et lite team av internasjonale og norske studenter som utviklet et pilotprosjekt til undervisningen i et introduksjonsemne på institutt for informatikk. Vi utviklet en relativt enkel statisk webapplikasjon som tok studentene gjennom pensum på en spillifisert måte. Arbeidet var både vitenskapelig og teknisk, vi utviklet både evalueringsmetoder og selve oppgavene studentene gjennomførte, samt plattformen de skulle løse oppgavenee på. Fikk i etterkant ansvar for oppfølging av studentene som benyttet applikasjonen.
              </p>
            </div>
          </div>

          {/* Navet */}
          <div className="timeline-item left">
            <div className="timeline-content">
              <h3>Intern (Økonomi)</h3>
              <h4>Navet - bedriftskontakten til institutt for informatikk, 08.23 - nå</h4>
              <p>
                Navet er næringslivsutvalget på instituttet og jobber for å sette studenter i kontakt med bedriftene. Økonomigruppen har ansvaret for budsjettering, fakturering og regnskap. Foreningen omsetter for rundt 1 000 000kr i året, som medfører høye krav til nøyaktighet i den økonomiske driften.
              </p>
              <a href="https://ifinavet.no/for-bedrifter/" target="_blank" rel="noreferrer">Om Navet</a>
            </div>
          </div>

            {/* Styreleder LIST */}
          <div className="timeline-item right">
            <div className="timeline-content">
              <h3>Styreleder</h3>
              <h4>
                Linjeforeningen for informatikk: Språkteknologi [LI:ST], 09.22 - 08.24
              </h4>
              <p>
                Økonomiansvarlig fra 20222 - 2023.
              </p>
              <p>Styreleder fra 2023 - 2024</p>
              <p>
                I min tid i styret til en av linjeforeningene på instituttet har jeg jobbet for å skape faglig engasjement og trivsel gjennom å arrangere faglige og sosiale arrangementer for studentene. Styret består av 10 studenter som jeg ledet i en periode på ett år. Studentforeningen har hatt mange vellykkede faglige og sosiale arrangementer under min ledelse og fortsetter å skape engasjement hos studentene vi jobber for den dag i dag.
              </p>
              <a href="https://www.mn.uio.no/ifi/livet-rundt-studiene/organisasjoner/list.html" target="_blank" rel="noreferrer">Om LI:ST</a>
            </div>
          </div>

        </div>
        <footer>
        &copy; 2024 Victor Rørslett Uhnger. All rights reserved.
        </footer>
      </div>
    );
}