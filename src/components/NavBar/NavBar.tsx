function NavBar(){
    return (
        <nav className="nav">
            <a href="/home" className="site-title">vuhnger.dev</a>
            <ul>
                <li>
                    <a href="/about">Kontakt</a>
                </li>
                <li>
                    <a href="/projects">Prosjekter</a>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar