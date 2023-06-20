import React, { useEffect } from 'react';
import './SideBar.css';
import { Link, useParams, useLocation } from 'react-router-dom';



const MyComponent = (props) => {
    const location = useLocation()
    const { id } = useParams()
    useEffect(() => {
        const trigger = document.querySelector('.hamburger');
        const offcanvasToggle = document.querySelector('[data-toggle="offcanvas"]');
        const wrapper = document.querySelector('#wrapper');
        const overlay = document.querySelector('.overlay');

        const toggleSidebar = () => {
            wrapper.classList.toggle('toggled');
            overlay.style.display = wrapper.classList.contains('toggled') ? 'block' : 'none';
        };

        trigger.addEventListener('click', toggleSidebar);
        offcanvasToggle.addEventListener('click', toggleSidebar);

        // Cleanup function
        return () => {
            trigger.removeEventListener('click', toggleSidebar);
            offcanvasToggle.removeEventListener('click', toggleSidebar);
        };
    }, []);


    return (
        <div>
            <nav className="navbar navbar-inverse fixed-top " id="sidebar-wrapper" role="navigation">
                <ul className="nav sidebar-nav">
                    <div className="sidebar-header">
                        <div className="sidebar-brand">
                            <h2 className='text-light'>Lession</h2>
                        </div>
                    </div>
                    {props.lession.map(e => {
                        return <li key={e._id} ><Link className={`nav-link ${location.pathname === `/course/${id}/${e._id}` ? "active-link" : ""}`} to={`/course/${id}/${e._id}`}>{e.title}</Link></li>
                    })}

                </ul>
            </nav>
        </div>
    );
};

export default MyComponent
