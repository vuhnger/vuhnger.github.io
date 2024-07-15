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
            <p>
              Engasjert og selvdreven informatikkstudent fra Universitetet i Oslo som trives i hektiske arbeidsmiljøer med kompliserte arbeidsoppgaver. 
            </p>
          </div>
        </div>

        <div className="timeline">
          <div className="timeline-item left">
            <div className="timeline-content">
              <h3>Full Stack utvikler</h3>
              <p>Universitetet i Oslo, 06.24 - 08-24</p>
              <p>Description of your role and responsibilities.</p>
            </div>
          </div>

          <div className="timeline-item right">
            <div className="timeline-content">
              <h3>Konsulent</h3>
              <p>Institutt for informatikk, 01.24 - 
              </p>
              <p>Description of your role and responsibilities.</p>
            </div>
          </div>

          <div className="timeline-item left">
            <div className="timeline-content">
              <h3>Frontend utvikler</h3>
              <p>Universitetet i Oslo, 06.23 - 08.23</p>
              <p>Description of your role and responsibilities.</p>
            </div>
          </div>

          <div className="timeline-item right">
            <div className="timeline-content">
              <h3>Intern (Økonomi)</h3>
              <p>Navet - bedriftskontakten ved institutt for informatikk, 08.23 - 
              </p>
              <p>Description of your role and responsibilities.</p>
            </div>
          </div>

      

        </div>
      </div>
    );
}