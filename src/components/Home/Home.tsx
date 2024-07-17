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
            
            <p>23 år gammel fra Oslo på 3. året bachelor.</p>
            
            <p>
              Gjennom internships og jobber, studier og verv har jeg opparbeidet kompetanse innen systemutvikling, både på frontend og backend.
            </p>

            <p>
              Av personlige kvaliteter er jeg rik på engasjement, interessedrevet og trives i miljøer med store utfordringer og høyt tempo. Spiller på lag og trives både i lederrollen og med teknisk arbeid.
            </p>

            <p>
              Informatikk interesserer meg fordi det er en tydelig sammenheng mellom å løse isolerte, komplekse tekniske problemer og å se en synlig og målbar påvirkning på samfunnet.
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
                Utvikler en plattform for oppgaveløsing og monitorering av studenter. Plattformens inngår i et pågående forskningsprosjekt innen læring i informatikkemmner i høyere utdanning. Teamet består av utviklere, designere, dataanalytikere og faglærere. React + TS på frontend og Python, PSQL + Django på backend.
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
                Jobber i studieadministrasjonen sin førstelinje. Vi imot studenter og gir de studierelatert veiledning og rådgivning. Arbeidsoppgavene innebærer enklere saksbehandling og forefallende administrativt arbeid.
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
                Hatt gruppelærerstilling i emnet både 2023 og 2024. I 2023 hadde jeg og en annen student ansvar for oppfølging av et alternativt utdanningsløp for omtrent 70 studenter. Holdt faglige seminarer med en spillifisert variant av undervisningen og fulgte opp gruppene med studenter gjennom semesteret med veiledning og faglige tilbakemeldinger.
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
                Inngikk i et lite team av internasjonale og norske studenter som utviklet et pilotprosjekt til undervisningen i et introduksjonsemne på institutt for informatikk. Vi utviklet en relativt enkel statisk webapplikasjon som tok studentene gjennom pensum på en spillifisert måte. Fikk i etterkant ansvar for oppfølging av studentene som benyttet applikasjonen.
              </p>
            </div>
          </div>

          {/* Navet */}
          <div className="timeline-item left">
            <div className="timeline-content">
              <h3>Intern (Økonomi)</h3>
              <h4>Navet - bedriftskontakten til institutt for informatikk, 08.23 - nå</h4>
              <p>
                Navet er næringslivsutvalget på instituttet og jobber for å sette studenter i kontakt med bedriftene. Økonomigruppen har ansvaret for budsjettering, fakturering og regnskap. Foreningen omsetter for over 1 000 000kr i året.
              </p>
              <a href="https://ifinavet.no/for-bedrifter/" target="_blank" rel="noreferrer">Om Navet</a>
            </div>
          </div>

            {/* Styreleder LIST */}
          <div className="timeline-item right">
            <div className="timeline-content">
              <h3>Styreleder</h3>
              <h4>
                Linjeforeningen for informatikk: Språkteknologi (LI:ST), 09.22 - 08.24
              </h4>
              <p>
                Økonomiansvarlig fra 20222 - 2023.
              </p>
              <p>Styreleder fra 2023 - 2024</p>
              <p>
                I min tid i styret til en av linjeforeningene på instituttet har jeg jobbet for å skape faglig engasjement og trivsel gjennom å arrangere faglige og sosiale arrangementer for studentene. Styret består av 10 studenter som jeg ledet i en periode på ett år.
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