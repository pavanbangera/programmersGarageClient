import React from 'react'
import Spinner from './spinner.gif'

export default function pinnerBar () {
    return (
        <div className="container d-flex  align-items-center justify-content-center" style={{ height: "80vh" }}>
            <div className='text-center'>
                <img src={Spinner} alt="loading" />
            </div>
        </div>
    )
}
