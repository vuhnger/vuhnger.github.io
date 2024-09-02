import './Home.css';
import portrait from '../../assets/Home/Victor-portrett.jpeg';

class WorkExperienceItem{
  jobTitle: string;
  companyName: string;
  jobDescription: string;

  public constructor(
    jobTitle: string,
    companyName: string,
    jobDescription: string
  ){
    this.jobTitle = jobTitle;
    this.companyName = companyName;
    this.jobDescription = jobDescription;
  }
}

const workExperiences: WorkExperienceItem[] = [
  new WorkExperienceItem(
    "Full Stack utvikler",
    "Universitetet i Oslo, 06.24 - nå",
    "Utvikler en plattform for oppgaveløsing og monitorering av studenters progresjon. Plattformens inngår i et pågående forskningsprosjekt innen læring i informatikkemmner i høyere utdanning. Teamet består av utviklere, designere, dataanalytikere og faglærere. React + TS på frontend og Python, PostgresQL + Django på backend, Docker + Kubernetes for utviklingsmiljø og produksjonssetting."
  ),
  new WorkExperienceItem(
    "Konsulent i studieadministrasjon",
    "Institutt for informatikk, 01.24 - nå",
    "Jobber i studieadministrasjonen sin førstelinje. Vi imot studenter og gir de studierelatert veiledning. Arbeidsoppgavene innebærer saksbehandling og forefallende studieadministrativt arbeid. Stillingen stiller særskilte krav til integritet og selvstendighet."
  ),
  new WorkExperienceItem(
    "Gruppelærer i universitetsemner",
    "Institutt for informatikk, 08.23 - nå",
    `Gruppelærere holder seminarundervisningen på instituttet og retter innleveringer.
    
    IN1010 - Objektorientert programmering: Holder seminarer som går ut på livekoding foran studentene for å vise studentene hvordan de kan implementere objektorienterte konsepter og avanserte programmeringsteknikker i Java. Rettet studentene sine innleveringer som gikk ut på å levere løsninger til litt større problemer i Java. Vurderer og gir studentene individuell tilbakemelding på korrekthet og kodekvalitet.
    
    IN1020 - Introduksjon til datateknologi: Hatt gruppelærerstilling i emnet både 2023 og 2024. I 2023 hadde jeg og en annen student ansvaret for oppfølging av et alternativt utdanningsløp for omtrent 70 studenter. Holdt faglige seminarer med en spillifisert variant av undervisningen og fulgte opp gruppene med studenter gjennom semesteret med veiledning og faglige tilbakemeldinger. I 2024 administrerer jeg innleveringssystemet og hjelper gruppelærerteamet med å holde undervisningen sin.`
  ),
  new WorkExperienceItem(
    "Frontend utvikler",
    "Universitetet i Oslo, 06.23 - 08.24",
    "Inngikk i et lite team av internasjonale og norske studenter som utviklet et pilotprosjekt til undervisningen i et introduksjonsemne på institutt for informatikk. Vi utviklet en relativt enkel statisk webapplikasjon som tok studentene gjennom pensum på en spillifisert måte. Arbeidet var både vitenskapelig og teknisk, vi utviklet både evalueringsmetoder og selve oppgavene studentene gjennomførte, samt plattformen de skulle løse oppgavene på. Fikk i etterkant ansvar for oppfølging av studentene som benyttet applikasjonen."
  ),
  new WorkExperienceItem(
    "Intern (Økonomi)",
    "Navet - bedriftskontakten til institutt for informatikk, 08.23 - nå",
    "Navet er næringslivsutvalget på instituttet og jobber for å sette studenter i kontakt med bedriftene. Økonomigruppen har ansvaret for budsjettering, fakturering og regnskap. Foreningen omsetter for rundt 1 000 000kr i året, som medfører høye krav til nøyaktighet i den økonomiske driften.",
  ),
  new WorkExperienceItem(
    "Styreleder",
    "Linjeforeningen for informatikk: Språkteknologi [LI:ST], 09.22 - 08.24",
    `Økonomiansvarlig fra 2022 - 2023.
    
    Styreleder fra 2023 - 2024
    
    I min tid i styret til en av linjeforeningene på instituttet har jeg jobbet for å skape faglig engasjement og trivsel gjennom å arrangere faglige og sosiale arrangementer for studentene. Styret består av 10 studenter som jeg ledet i en periode på ett år. Studentforeningen har hatt mange vellykkede faglige og sosiale arrangementer under min ledelse og fortsetter å skape engasjement hos studentene vi jobber for den dag i dag.`,
  )
];

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

        {workExperiences.map((workExperience, index) => (
                <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                    <div className="timeline-content">
                        <h3>{workExperience.jobTitle}</h3>
                        <h4>{workExperience.companyName}</h4>
                        <p>{workExperience.jobDescription}</p>
                    </div>
                </div>
            ))}

        </div>
        <footer>
        &copy; 2024 Victor Rørslett Uhnger. All rights reserved.
        </footer>
      </div>
    );
}