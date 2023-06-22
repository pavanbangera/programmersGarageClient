import React, { useContext, useEffect, useState } from 'react'
import CourseContext from '../context/Course/CourseContext'
import { useParams } from 'react-router-dom'
import dateFormat from "dateformat";
import Editor from './Editor'

const CommentBox = () => {
    const params = useParams()
    const { addComment, getComment, comment, deleteComment } = useContext(CourseContext)
    const [newComment, setNewComment] = useState("")

    const onSubmit = () => {
        addComment(params.name, newComment)
        setNewComment("")
    }
    const handleEditorChange = (value) => {
        setNewComment(value);
    };
    useEffect(() => {
        getComment(params.name)
        // eslint-disable-next-line
    }, [params.name])

    return (
        <div className="container ">
            <div className="row d-flex justify-content-center">
                <div className="col-md-8 col-lg-12">
                    <div className="card shadow-0 border border-1">
                        <div className="card-body p-4">
                            <h4>Comments</h4>
                            <div className="form-outline mb-4 my-1">
                                {/* <input type="text" id="addANote" className="form-control" value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Type comment..." /> */}
                                <Editor value={newComment} onChange={handleEditorChange} />
                                <button className='btn btn-dark col-12 mt-2' onClick={onSubmit}>Add Comment</button>
                            </div>
                            <div className="scrolling-body" style={{ maxHeight: "300px", overflowY: "scroll" }}>

                                {comment > [0] && comment.map(data => {
                                    return <div className="card mb-4">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between">
                                                <div className='d-flex flex-row align-items-center' dangerouslySetInnerHTML={{ __html: data.content }}></div>

                                                {data.user._id === localStorage.getItem("user-id") && <div className="d-flex flex-row align-items-center"><i className="fa-solid fa-trash mx-2" onClick={() => deleteComment(data._id)} ></i></div>
                                                }
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <div className="d-flex flex-row align-items-center">
                                                    {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp" alt="avatar" width="25"
                  height="25" /> */}
                                                    <p className="small mb-0 ms-2">{data.user.name}</p>
                                                </div>
                                                <div className="d-flex flex-row align-items-center">
                                                    <p className="small text-muted mb-0">{dateFormat(data.date, "hh:MM:sstt  dd-mm-yyyy")}</p>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                })}
                                {comment < [0] && <p className='text-center'>No comments at</p>}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentBox