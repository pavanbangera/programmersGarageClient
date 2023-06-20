import React from 'react'
import c1 from './assets/c1.jpg'
import { Link } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation';
// import c2 from './assets/c2.jpg'
// import c3 from './assets/c3.jpg'

const Carosel = () => {
    return (
        <div className="card bg-dark text-white carousel-inner border-0 rounded-0">
            <img src={c1} className="card-img" alt="..." />
            <div className="card-img-overlay">
                <div className="row h-100  ms-5 ">
                    <div className="col-lg-6 col-md-12 d-flex flex-column justify-content-center">
                        <div className="text-start">
                            <h1 className='mb-3'>Welcome to Programmers's Garage</h1>
                            <h5 className='bg-light text-dark d-inline px-4 py-1 text-center rounded'>Your Path to <TypeAnimation
                                sequence={['Reactjs', 500, 'Python', 500, 'CSS', 500]}
                                style={{ color: "red" }}
                                repeat={Infinity}
                            /> Mastery</h5>
                            <p className='mt-2'>Unlock Your Coding Potential with Expert Courses, In-Depth Tutorials, and Engaging Blogs</p>
                            <div>
                                <Link to='/course' className="btn  btn-outline-light">Free Courses</Link>
                                <Link to="/blog" className="btn  btn-light ms-2">Explore blogs</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Carosel