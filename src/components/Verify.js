import React from 'react'
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import AuthContext from '../context/Auth/AuthContext';
import { useContext } from 'react';
import SpinnerBar from './SpinnerBar'
import NotFound from './NotFound'

const Verify = () => {
    const params = useParams();
    const { Verify, loader, verified } = useContext(AuthContext)
    useEffect(() => {
        Verify(params.id)
        // eslint-disable-next-line
    }, [params.id])

    return (
        <>
            <div className="verify">
                {loader && <SpinnerBar />}
                {!loader && verified && (<div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card shadow-sm rounded">
                                <div className="card-body text-center">
                                    <h2 className="card-title">Email Verified Successfully</h2>
                                    <p className="card-text">
                                        Congratulations! Your email has been verified.
                                    </p>
                                </div>
                                <Link to='/login' className='btn btn-success' replace>Login</Link>
                            </div>
                        </div>
                    </div>
                </div>)}
                {!loader && !verified && <NotFound />}
            </div>
        </>
    )
}

export default Verify