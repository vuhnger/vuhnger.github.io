import './About.css'

function About(){
    return (
        <div className="about-container">
            <h1>Kontakt meg</h1>
            <section className="Links">
                <a href="https://www.linkedin.com/in/victoruhnger/" target="_blank" rel="roreferrer">
                Linkedin
                </a>
                <a href="https://www.mn.uio.no/ifi/?vrtx=person-view&uid=victou" target="_blank" rel="roreferrer">
                Universitetet i Oslo
                </a>
                <a href="https://github.com/vuhnger" target="_blank" rel="roreferrer">
                GitHub
                </a>
                <a href="mailto:victor.uhnger@gmail.com">
                Privat e-post
                </a>
            </section>
        </div>
    );
}

export default About