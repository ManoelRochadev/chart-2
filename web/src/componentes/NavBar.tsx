const NavBar = () => {
    return (<header>

        <div className="navbar navbar-expand">
            <div className="container">
                <a href="#" className="navbar-brand">MM-DIRECT</a>
                <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav-collapse"
                    aria-controls="nav-collapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="nav-collapse" className="collapse navbar-collapse justify-content-end">
                    {/* <ul id='w0' className="navbar-nav nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link_1</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link_2</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link_3</a>
                        </li>
                    </ul> */}
                </div>
            </div>
        </div>

    </header>)
}

export default NavBar;