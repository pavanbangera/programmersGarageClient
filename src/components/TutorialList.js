import React from 'react'
import { Link } from 'react-router-dom'
const TutorialList = (props) => {
    const { _id, title, image } = props.list
    return (
        <div className="card shadow-sm p-3 mb-5 rounded" style={{ width: "18rem" }}>
            <img src={image} className="card-img-top " style={{ width: "auto", height: "100px", margin: "auto" }} alt="..." />
            <div className="card-body">
                <h2 className="card-title mb-4">{title}</h2>

                <Link to={`/tutorial/${_id}`} rel="noreferrer" className="btn btn-dark btn-rounded py-2 px-3">Start learning!</Link>
            </div>
        </div>
    )
}

export default TutorialList