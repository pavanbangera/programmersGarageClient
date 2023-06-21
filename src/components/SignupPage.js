import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/Auth/AuthContext'
import AlertContext from '../context/alert/AlertContext'



const SignupPage = () => {
    const { Signup, loader, setLoader } = useContext(AuthContext)
    const { showAlert } = useContext(AlertContext)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setcPassword] = useState("")

    const onSubmit = (e) => {
        setLoader(true)
        e.preventDefault()
        if (password === cpassword) {
            Signup(name, email, password)
        } else {
            showAlert("Password not matching", "danger")
            setLoader(false)
        }
    }
    return (
        <>
            <div className="container-fluid d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>

                <form className='col-lg-4 col-md-8 my-5' onSubmit={onSubmit} >
                    <h2>SignUp to - Programmer's Garage</h2>
                    <div className="form-outline mb-2 ">
                        <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} className="form-control" minLength="5" required autoComplete='User-name' />
                        <label className="form-label" htmlFor="form2Example1">User name</label>
                    </div>
                    <div className="form-outline mb-2 ">
                        <input type="email" id="email" name='email' value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
                        <label className="form-label" htmlFor="form2Example1" autoComplete="email">Email address</label>
                    </div>
                    <div className="form-outline mb-2 ">
                        <input type="password" id="password" name='password' value={password} onChange={e => setPassword(e.target.value)} className="form-control" minLength="6" required autoComplete='New-Password' />
                        <label className="form-label" htmlFor="form2Example2">Create Password</label>
                    </div>
                    <div className="form-outline mb-2 ">
                        <input type="password" id="cpassword" name='cpassword' value={cpassword} onChange={e => setcPassword(e.target.value)} className="form-control" autoComplete='New-Password' />
                        <label className="form-label" htmlFor="form2Example2">Repeat Password</label>
                    </div>
                    <button type="submit" className="btn btn-dark col-12  d-flex align-items-center justify-content-center">
                        <span>Sign up</span>
                        {loader && <div className="spinner-border text-secondary ms-2" role="status"></div>}
                    </button>
                    <div className="text-center">
                        <p>Our member? <Link to="/login">Login here</Link></p>

                    </div>
                </form>

            </div>

        </>
    )
}

export default SignupPage