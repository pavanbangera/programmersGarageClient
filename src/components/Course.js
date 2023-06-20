import React, { useContext, useEffect } from 'react'
import CourseContext from '../context/Course/CourseContext'
import CourseList from './CourseList'
import PropTypes from 'prop-types'
import SpinnerBar from './SpinnerBar'
import AlertContext from '../context/alert/AlertContext'

const Course = (props) => {
    const { getCourse, getItem, loader, setLoader } = useContext(CourseContext)
    const { setProgress } = useContext(AlertContext)
    useEffect(() => {
        setProgress(10)
        setLoader(true)
        getCourse();
        setLoader(true)
        // eslint-disable-next-line
    }, [])
    const latestData = getItem.slice(-3)
    return (
        <><div className="container pt-4" style={{ minHeight: "80vh" }}>
            <h2 className='text-center'>{props.heading}</h2>
            <div className="row ">

                {loader && <SpinnerBar />}

                {!loader && props.home && latestData.map((e) => {

                    return <div key={e._id} className="col-lg-4 col-md-6 col-sm-6 d-flex justify-content-center my-2">
                        <CourseList list={e} />
                    </div>


                })}
                {!loader && !props.home &&


                    getItem.map((e) => {

                        return <div key={e._id} className="col-lg-4 col-md-6 col-sm-6 d-flex justify-content-center my-2">
                            <CourseList list={e} />
                        </div>


                    })


                } </div>
        </div>


        </>
    )
}

export default Course


Course.prototype = { heading: PropTypes.string }
Course.defaultProps = {
    heading: 'Our Courses'
};