import React from 'react'
import { Link } from 'react-router-dom'

const CourseList = (props) => {
    const { _id, title, description, cover } = props.list

    const stripHtmlTags = (html) => {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };
    return (
        <div className="card shadow-sm rounded" style={{ width: "18rem" }}>
            <img src={cover} className="card-img-top" style={{ width: "100%", height: "10rem" }} alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p>{stripHtmlTags(description.slice(0, 90))}</p>

                <Link to={`/course/${_id}`} rel="noreferrer" className="btn btn-dark py-2 px-3">Start watching!</Link>
            </div>
        </div>
    )
}

export default CourseList