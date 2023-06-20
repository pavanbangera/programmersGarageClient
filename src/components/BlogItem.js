import React, { useEffect, useContext } from 'react'
import BlogContext from '../context/Blog/BlogContext'
import { useParams } from 'react-router-dom'
import NotFound from './NotFound'
import SpinnerBar from './SpinnerBar'

const BlogItem = () => {
    const params = useParams()
    const { getDetail, detail, error, loader } = useContext(BlogContext)
    useEffect(() => {
        getDetail(params.id)
        // eslint-disable-next-line
    }, [params.id])
    return (
        <div className="container my-4">
            <div className="row  d-flex justify-content-center">
                {loader && <SpinnerBar />}
                <div className="col-lg-8 col-lg-offset-2 align-items-center text-center">
                    {error && (<NotFound />)}


                    {!loader && params.id && (
                        <>
                            <h1> {detail.title}</h1>
                            <hr />
                            <div className='text-start'>
                                <div dangerouslySetInnerHTML={{ __html: detail.content }}></div>
                            </div>

                        </>
                    )}

                </div>
            </div>
        </div>
    )
}

export default BlogItem