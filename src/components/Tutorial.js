import React, { useContext, useEffect } from 'react'
import TutorialContext from '../context/Tutorial/TutorialContext'
import TutorialList from './TutorialList'
import SpinnerBar from './SpinnerBar'

const Tutorial = () => {
    const { get, getTutorial, loader, setLoader } = useContext(TutorialContext)
    useEffect(() => {
        setLoader(true)
        get()
        setLoader(true)
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className="container pt-4" style={{ minHeight: "80vh" }}>
                <h2 className='text-center'>Our Tutorials</h2>
                {loader && <SpinnerBar />}
                <div className="container"> <div className="row ">

                    {



                        !loader && getTutorial.map((e) => {

                            return <div key={e._id} className="col-lg-3 col-md-6 col-sm-6 d-flex justify-content-center my-2">
                                <TutorialList list={e} />
                            </div>


                        })
                    } </div>
                </div>
            </div>
        </>
    )
}

export default Tutorial