function NavBar(){
    return (
        <nav className="nav">
            <a href="/home" className="site-title">Victor R. Uhnger</a>
            <ul>
                <li>
                    <a href="/about">Kontakt meg</a>
                </li>
                <li>
                    <a href="/projects">Prosjekter</a>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar