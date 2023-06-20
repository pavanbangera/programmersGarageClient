import React, { useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AlertContext from '../context/alert/AlertContext'


const Navbar = (props) => {
    const { showAlert, setProgress } = useContext(AlertContext)
    const navigate = useNavigate()
    const location = useLocation();
    const logOut = () => {
        setProgress(20)
        localStorage.removeItem('auth-token')
        navigate('/')
        showAlert("You are logged out", "danger")
        setProgress(100)
    }
    useEffect(() => {
        document.title = `Programmer's Garage |  ${location.pathname === "/" ? "home" : location.pathname.slice(1).split('/')[0]}`;
        // eslint-disable-next-line
    }, [location.pathname])

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Programmer's Garage</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/course" ? "active" : ""}`} to="/course">Courses</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/tutorial" ? "active" : ""}`} to="/tutorial">Tutorials</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/blog" ? "active" : ""}`} to="/blog">Blogs</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/bugs" ? "active" : ""}`} to="/bugs">BugsWorld</Link>
                            </li>
                            {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="/">Action</a></li>
                                    <li><a className="dropdown-item" href="/">Another action</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="/">Something else here</a></li>
                                </ul>
                            </li> */}

                        </ul>
                        <form className="d-flex mx-4 my-1" role="search">
                            <input className="form-control me-2 bg-transparent border-0 text-secondary text-end " type="search" placeholder="Search" defaultValue="I'm here for you..." style={{ outline: '1px solid #ced4da' }}
                                aria-label="Search" onClick={props.handleSearchBoxClick} />

                        </form>
                        {!localStorage.getItem('auth-token') && <Link to="/login" className="btn btn-light px-4 me4">Login</Link>}
                        {localStorage.getItem('auth-token') && <button className="btn btn-light px-4 me4" onClick={logOut}>Logout</button>}

                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar