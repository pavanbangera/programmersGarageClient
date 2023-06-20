import React from 'react'
import { Link } from 'react-router-dom';
import dateFormat from "dateformat";

const BlogList = (props) => {
    const { _id, title, content, date } = props.list

    const stripHtmlTags = (html) => {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };
    return (
        <div className="card text-start shadow-sm rounded">
            <p className="card-header">{dateFormat(date, "yyyy-mm-dd")}</p>
            <div className="card-body ">
                <h5 className="card-title">{title}</h5>
                <p>{stripHtmlTags(content.slice(0, 120))}...</p>
                <Link to={`/blog/${_id}`} >Read more</Link>
            </div>
        </div>
    )
}

export default BlogList