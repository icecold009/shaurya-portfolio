function Navbar() {
    return (
        <header className="site-header">
            <nav className="navbar">
                <a href="#home" className="brand">Shaurya</a>

                <div className="nav-links">
                    <a href="#projects">Projects</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;