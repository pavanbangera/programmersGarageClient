import React, { useContext, useRef, useState, useEffect } from 'react'
import Editor from './Editor'
import BugsContext from '../context/Bugs/BugsContext'
import { Link } from 'react-router-dom'
import dateFormat from "dateformat";
import SpinnerBar from './SpinnerBar'


const BugsWorld = () => {

    const { addBug, getBug, bugs, setLoader, loader, deleteBug } = useContext(BugsContext)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")



    const handleEditorChange = (value) => {
        setDescription(value);
    };
    const ref1 = useRef()
    const handleSubmit = (e) => {
        e.preventDefault(e);
        addBug(title, description)
        setTitle("")
        setDescription("")
        ref1.current.click()

    }
    useEffect(() => {
        setLoader(true)
        getBug()
        setLoader(true)
        console.log("hjghgh")
        // eslint-disable-next-line
    }, [])
    const stripHtmlTags = (html) => {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };
    return (
        <> {localStorage.getItem('auth-token') && (<>
            <div className="container pt-5 mb-0">
                <div className="d-flex align-items-center justify-content-center">
                    <h1 className="me-2">Share your bugs</h1>
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                    >
                        +
                    </button>
                </div>
                {loader && <SpinnerBar />}
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Add your bugs</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Bugs Title</label>
                                    <input type="text" className="form-control" id="title" name='title' value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter the course title" required />
                                </div>
                                <Editor value={description} onChange={handleEditorChange} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" ref={ref1} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-4">
                <h6>Your bugs here</h6>
                <div className="row ">
                    {

                        bugs.userBugs > [0] &&
                        bugs.userBugs.map((e) => {

                            return <div key={e._id} className="col-lg-6 col-md-12">
                                <div className="card text-start shadow-sm rounded">
                                    <div className="card-header d-flex justify-content-between">
                                        <p className="text-start">-by {e.user.name} {dateFormat(e.date, "yyyy-mm-dd")}</p>
                                        <p className="text-end"> <i className="fa-solid fa-trash mx-2" onClick={() => { deleteBug(e._id) }} ></i></p>
                                    </div>

                                    <div className="card-body ">
                                        <h5 className="card-title">{e.title}</h5>
                                        <p>{stripHtmlTags(e.description.slice(0, 120))}...</p>
                                        <Link to={`/bugs/${e._id}`} >Read more</Link>
                                    </div>
                                </div>
                            </div>


                        })
                    }
                    {bugs.userBugs < [0] && <p>not found your bugs</p>}

                </div>
                <hr />
            </div>

            <div className="container my-4">
                <h6>Other user's bugs here</h6>
                <div className="row "> {

                    bugs.otherBugs > [0] &&
                    bugs.otherBugs.map((e) => {

                        return <div key={e._id} className="col-lg-6 col-md-12">
                            <div className="card text-start shadow-sm rounded">
                                <p className="card-header">-by {e.user.name}  {dateFormat(e.date, "yyyy-mm-dd")}</p>
                                <div className="card-body ">
                                    <h5 className="card-title">{e.title}</h5>
                                    <p>{stripHtmlTags(e.description.slice(0, 120))}...</p>
                                    <Link to={`/bugs/${e._id}`} >Read more</Link>
                                </div>
                            </div>
                        </div>


                    })
                } </div>
                {bugs.otherBugs < [0] && <p>not found bugs</p>}
            </div>
        </>)
        }
            {!localStorage.getItem('auth-token') && (<>
                <div className="container d-flex align-items-center justify-content-center " style={{ minHeight: "80vh" }}>
                    <div>

                        <h1>Premium users only</h1>
                        <p>If you want to join our community, why wait any longer? Login now!</p>
                    </div>
                </div>
            </>)}
        </>
    )
}

export default BugsWorld