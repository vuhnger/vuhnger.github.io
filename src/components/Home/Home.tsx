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
    "Konsulent i studieadministrasjon",
    "Institutt for informatikk, 01.24 - nå",
    "Jobber i studieadministrasjonen. Vi imot studenter og gir de studierelatert veiledning. Arbeidsoppgavene innebærer saksbehandling og forefallende studieadministrativt arbeid. Stillingen stiller særskilte krav til integritet og selvstendighet."
  ),
  new WorkExperienceItem(
     "Projektveileder",
    "Universitetet i Oslo, 06.24 - 08.24",
    "Kurs: IN2000 - Software Engineering med prosjektarbeid" 
  ),
  new WorkExperienceItem(
    "Full Stack utvikler",
    "Universitetet i Oslo, 06.24 - 08.24",
    "Utvikler en plattform for oppgaveløsing og monitorering av studenters progresjon. Plattformens inngår i et pågående forskningsprosjekt innen læring i informatikkemmner i høyere utdanning. Teamet består av utviklere, designere, dataanalytikere og faglærere. React + TS på frontend og Python, PostgresQL + Django på backend, Docker + Kubernetes for utviklingsmiljø og produksjonssetting."
  ),
  new WorkExperienceItem(
    "Studentassistent",
    "Universitetet i Oslo, 01.24 - 06.24",
    "Kurs: IN2010 - Algoritmer og datastrukturer"
  ),
  new WorkExperienceItem(
    "Gruppelærer",
    "Universitetet i Oslo, 01.24 - 06.24",
    "Kurs: IN1010 - Objektorientert programmering"
  ),
  new WorkExperienceItem(
    "Gruppelærer",
    "Universitetet i Oslo, 08.23 - 12.23",
    "Kurs: IN1020 - Introduksjon til datateknologi"
  ),
  new WorkExperienceItem(
    "Frontend utvikler",
    "Universitetet i Oslo, 06.23 - 08.24",
    "Inngikk i et lite team av internasjonale og norske studenter som utviklet et pilotprosjekt til undervisningen i et introduksjonsemne på institutt for informatikk. Vi utviklet en relativt enkel statisk webapplikasjon som tok studentene gjennom pensum på en spillifisert måte. Arbeidet var både vitenskapelig og teknisk, vi utviklet både evalueringsmetoder og selve oppgavene studentene gjennomførte, samt plattformen de skulle løse oppgavene på. Fikk i etterkant ansvar for oppfølging av studentene som benyttet applikasjonen."
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