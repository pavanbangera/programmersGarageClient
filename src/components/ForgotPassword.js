import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/Auth/AuthContext'
const ForgotPassword = () => {
    const { loader, setLoader, ForgotPass } = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const onSubmit = (e) => {
        setLoader(true)
        e.preventDefault()
        ForgotPass(email);

    }
    return (
        <>
            <div className="container-fluid d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
                <form className='col-lg-4 col-md-8 my-5' onSubmit={onSubmit}>
                    <h2>Forgot Password</h2>
                    <div className="form-outline mb-1">
                        <input type="email" id="form2Example1" className="form-control " value={email} onChange={e => setEmail(e.target.value)} required autoComplete='email' />
                        <label className="form-label" htmlFor="form2Example1">Email address</label>
                    </div>
                    <button type="submit" className="btn btn-dark col-12  d-flex align-items-center justify-content-center">
                        <span>Verify</span>
                        {loader && <div className="spinner-border text-secondary ms-2" role="status"></div>}
                    </button>

                    <div className="text-center">
                        <p className='mb-4'>Back to <Link to="/login">Login</Link></p>
                    </div>
                </form>

            </div>

        </>
    )
}

export default ForgotPassword