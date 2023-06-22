import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AuthContext from '../context/Auth/AuthContext'
import AlertContext from '../context/alert/AlertContext'
import SpinnerBar from './SpinnerBar'
import NotFound from './NotFound'

const ChangePassword = () => {
    const params = useParams();
    const { Verify, loader, setLoader, verified, ChangePass } = useContext(AuthContext)
    const { showAlert } = useContext(AlertContext)
    const [password, setPassword] = useState("")
    const [cpassword, setcPassword] = useState("")
    useEffect(() => {
        Verify(params.id)
        // eslint-disable-next-line
    }, [params.id])

    const onSubmit = (e) => {
        setLoader(true)
        e.preventDefault()
        if (password === cpassword) {
            ChangePass(params.id, password)
        } else {
            showAlert("Password not matching", "danger")
            setLoader(false)
        }
    }
    return (
        <>
            <div className="container-fluid d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
                {loader && <SpinnerBar />}
                {!loader && verified && <form className='col-lg-4 col-md-8 my-5' onSubmit={onSubmit}>
                    <h2>Change Password</h2>
                    <div className="form-outline mb-2 ">
                        <input type="password" id="password" name='password' value={password} onChange={e => setPassword(e.target.value)} className="form-control" minLength="6" required autoComplete='New-Password' />
                        <label className="form-label" htmlFor="form2Example2">New Password</label>
                    </div>
                    <div className="form-outline mb-2 ">
                        <input type="password" id="cpassword" name='cpassword' value={cpassword} onChange={e => setcPassword(e.target.value)} className="form-control" autoComplete='New-Password' />
                        <label className="form-label" htmlFor="form2Example2">Repeat Password</label>
                    </div>
                    <button type="submit" className="btn btn-dark col-12  d-flex align-items-center justify-content-center">
                        <span>Change</span>
                        {loader && <div className="spinner-border text-secondary ms-2" role="status"></div>}
                    </button>
                </form>}
                {!loader && !verified && <NotFound />}
            </div>

        </>
    )
}

export default ChangePassword