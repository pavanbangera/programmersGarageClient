import React, { useContext, useEffect } from 'react'
import BlogContext from '../context/Blog/BlogContext'
import BlogList from './BlogList'
import SpinnerBar from './SpinnerBar'

const Blog = () => {
    const { get, getBlog, loader, setLoader } = useContext(BlogContext)
    useEffect(() => {
        setLoader(true)
        get()
        setLoader(true)
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className="container pt-4" style={{ minHeight: "80vh" }}>
                <h2 className='text-center'>Our Blogs</h2>
                {loader && <SpinnerBar />}
                <div className="container"> <div className="row "> {


                    getBlog.map((e) => {

                        return <div key={e._id} className="col-8 my-2">
                            <BlogList list={e} />
                        </div>


                    })
                } </div>
                </div>
            </div>
        </>
    )
}

export default Blog