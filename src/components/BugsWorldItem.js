import React, { useContext, useState, useEffect } from 'react'
import Editor from './Editor'
import BugsContext from '../context/Bugs/BugsContext'
import dateFormat from "dateformat";
import { useParams, useNavigate } from 'react-router-dom'
import NotFound from './NotFound'
import SpinnerBar from './SpinnerBar'

const BugsWorldItem = () => {
    const navigate = useNavigate()
    const params = useParams()
    const { addComment, getComment, comment, getDetail, detail, error, setLoader, loader, deleteComment } = useContext(BugsContext)
    useEffect(() => {
        setLoader(true)
        getDetail(params.bg)
        setLoader(true)
        // eslint-disable-next-line
    }, [params.bg])

    if (!localStorage.getItem('auth-token')) {
        navigate('/')
    }


    const [newComment, setNewComment] = useState("")

    const onSubmit = () => {
        addComment(params.bg, newComment)
        setNewComment("")
    }
    const handleEditorChange = (value) => {
        setNewComment(value);
    };
    useEffect(() => {
        getComment(params.bg)
        // eslint-disable-next-line
    }, [params.bg])
    return (
        <>
            <div className="container my-4">
                {error && (<NotFound />)}
                {loader && <SpinnerBar />}
                {params.bg && detail >= {} && <div className="alert alert-warning text-start " role="alert">
                    <h4 className="alert-heading">{detail.title}</h4>
                    <h6 className='text-start' dangerouslySetInnerHTML={{ __html: detail.description }}></h6>
                    <hr />
                    <p className="mb-0">-by {!detail.user ? "unknown" : detail.user.name}     {dateFormat(detail.date, "hh:MM:sstt  dd-mm-yyyy")}</p>
                </div>}
            </div>

            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-8 col-lg-12">
                        <div className="card shadow-0 border-1 my-2">
                            <div className="card-body p-4">
                                <h4>Solutions</h4>
                                <div className="form-outline mb-4">

                                    {!error && (<> <Editor value={newComment} onChange={handleEditorChange} />
                                        <button className='btn btn-dark col-12 mt-2' onClick={onSubmit}>My Solution</button></>)}
                                </div>
                                <div className="scrolling-body" style={{ maxHeight: "300px", overflowY: "scroll" }}>


                                    {(!error && comment > [0]) && comment.map(data => {
                                        return <div key={data._id} className="card mb-4">
                                            <div className="card-body">

                                                <div className="d-flex justify-content-between">
                                                    <div className='d-flex flex-row align-items-center' dangerouslySetInnerHTML={{ __html: data.content }}></div>

                                                    {data.user._id === localStorage.getItem("user-id") && <div className="d-flex flex-row align-items-center"><i className="fa-solid fa-trash mx-2" onClick={() => deleteComment(data._id)} ></i></div>
                                                    }
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <div className="d-flex flex-row align-items-center">

                                                        <p className="small mb-0 ms-2">-by {data.user.name}</p>
                                                    </div>
                                                    <div className="d-flex flex-row align-items-center">
                                                        <p className="small text-muted mb-0">{dateFormat(data.date, "hh:MM:sstt  dd-mm-yyyy")}</p>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    })}
                                    {comment < [0] && <p className='text-center'>No solutions at</p>}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BugsWorldItem