import './Projects.css';
import appdemo from '../../assets/Projects/App-demo.png'
import uiosegl from '../../assets/Projects/uio-segl.png'

export default function Projects() {
    return (
        <div className="projects-container">
            <h1>Prosjekter jeg har jobbet på</h1>


            <div className="project-item">
                <div className="project-image">
                    <img src={appdemo} alt="Project 1" />
                </div>
                <div className="project-text">
                    <h2>Vannplaning</h2>
                    <p>
                        I et team på 6 studenter i kurset IN2000 - Software Engineering med prosjektarbeid utviklet jeg en android-app som foreslår fritidsaktiviteter på vannet basert på relevant værdata hentet fra Metrologisk institutt sine API-er.
                    </p>
                    <h2>Teknologier</h2>
                    <ul>
                        <li>Kotlin</li>
                        <li>Jetpack Compose</li>
                        <li>RoomDB</li>
                    </ul>
                    <p>Karakter: A</p>
                    <a href="https://github.com/vuhnger/vannplaning">Kildekode</a>
                </div>
            </div>


            <div className="project-item">
                <div className="project-image">
                    <img src={uiosegl} alt="Project 2" />
                </div>
                <div className="project-text">
                    <h2>Læringsplattform for studenter</h2>
                    <p>
                    Utvikler en plattform for oppgaveløsing og monitorering av studenter. Plattformens inngår i et pågående forskningsprosjekt innen læring i informatikkemmner i høyere utdanning. Teamet består av utviklere, designere, dataanalytikere og faglærere. React + TS på frontend og Python, PSQL + Django på backend.
                    </p>
                    <h2>Teknologier</h2>
                    <ul>
                        <li>React + TS</li>
                        <li>Python + Django</li>
                        <li>PostgreSQL</li>
                    </ul>
                </div>
            </div>


        </div>
    );
}