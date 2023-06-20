import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/Auth/AuthContext'

const LoginPage = () => {
    const { Login, loader, setLoader } = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = (e) => {
        setLoader(true)
        e.preventDefault()
        Login(email, password)

    }

    return (
        <>
            <div className="container-fluid d-flex align-items-center justify-content-center h-100">
                <form className='col-4 my-5' onSubmit={onSubmit}>
                    <h2>Login to - Programmer's Garage</h2>
                    <div className="form-outline mb-4 ">
                        <input type="email" id="form2Example1" className="form-control " value={email} onChange={e => setEmail(e.target.value)} required autoComplete='email' />
                        <label className="form-label" htmlFor="form2Example1">Email address</label>
                    </div>
                    <div className="form-outline mb-4 ">
                        <input type="password" id="form2Example2" className="form-control" value={password} onChange={e => setPassword(e.target.value)} minLength="6" required autoComplete='password' />
                        <label className="form-label" htmlFor="form2Example2">Password</label>
                    </div>
                    <button type="submit" className="btn btn-dark col-12  d-flex align-items-center justify-content-center">
                        <span>Sign in</span>
                        {loader && <div className="spinner-border text-secondary ms-2" role="status"></div>}
                    </button>

                    <div className="text-center">
                        <p className='mb-4'>Not a member? <Link to="/signup">Register</Link></p>
                    </div>
                </form>

            </div>

        </>
    )
}

export default LoginPage