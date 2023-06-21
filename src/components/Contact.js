import React from 'react'
import MyPhoto1 from './assets/about.jpg'
import contact1 from './assets/facebook.png'
import contact2 from './assets/instagram.png'
import contact3 from './assets/github.png'
import contact4 from './assets/gmail.png'
import contact5 from './assets/linkedin.png'
const Contact = () => {
    return (
        <>
            <div className="container contact-container d-flex flex-column ">

                <img className="main-img" src={MyPhoto1} alt="" />
                <div>

                    <a href="https://www.pavanbangera.com" target="_blank" rel="noopener noreferrer">
                        <h1>www.pavanbangera.com</h1>
                    </a>
                </div>
                <div className="floating-imgs">
                    <a href="https://www.facebook.com/pavan.k.94" target="_blank" rel="noreferrer"> <img src={contact1} alt="Floating  1" />  </a>
                    <a href="https://www.instagram.com/call__me__pavi/" target="_blank" rel="noreferrer">   <img src={contact2} alt="Floating  2" /> </a>
                    <a href="https://github.com/pavanbangera" target="_blank" rel="noreferrer"> <img src={contact3} alt="Floating  3" />  </a>
                    <a href="mailto:kpavankumar869@gmail.com" target="_blank" rel="noreferrer">  <img src={contact4} alt="Floating  4" />  </a>
                    <a href="https://www.linkedin.com/in/kpavan-kumar869/" target="_blank" rel="noreferrer">    <img src={contact5} alt="Floating  5" />  </a>





                </div>
            </div>
        </>
    )
}

export default Contact