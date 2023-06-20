import React, { forwardRef, useContext, useRef, useState, useEffect } from 'react';
import SearchContext from '../context/Search/SearchContext';
import { Link, useLocation } from 'react-router-dom';

const SearchModal = forwardRef((props, ref1) => {
    const [search, setSearch] = useState("");
    const { findSearch, searchData } = useContext(SearchContext);

    const onChange = (e) => {
        setSearch(e.target.value);
    };

    const closeModal = () => {
        setSearch("");
    };

    useEffect(() => {

        if (search.length > 0) {
            findSearch(search);
        }

        // eslint-disable-next-line
    }, [search]);

    const ref2 = useRef();
    const location = useLocation()
    useEffect(() => {
        ref2.current.click();
        // eslint-disable-next-line
    }, [location.pathname])
    const stripHtmlTags = (html) => {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };
    return (
        <>
            <button type="button" ref={ref1} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>

            <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable ">
                    <div className="modal-content">
                        <div className="modal-header">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={onChange} />
                            <button type="button" ref={ref2} className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
                        </div>
                        <div className="modal-body">
                            {localStorage.getItem('auth-token') && <div className="row">
                                {!search && <div className="alert border" role="alert">
                                    <p>Search allowed to course and tutorials only</p>

                                </div>}
                                {(search && searchData.course > [0]) && searchData.course.map(data => (
                                    <div key={data._id} className="col-12">
                                        <Link to={`/course/${data._id}`} >
                                            <div className="alert border" role="alert">
                                                <p><b>{data.title}</b> {stripHtmlTags(data.description.slice(0, 90))}...</p>

                                            </div>
                                        </Link>
                                    </div>
                                ))}
                                {(search && searchData.tutorial > [0]) && searchData.tutorial.map(data => (
                                    <div key={data._id} className="col-12">
                                        <Link to={`/tutorial/${data._id}`} >
                                            <div className="alert border" role="alert">
                                                <p><b>{data.title}</b> {stripHtmlTags(data.content.slice(0, 90))}...</p>

                                            </div>
                                        </Link>
                                    </div>
                                ))}
                                {(search && searchData.course < [0] && searchData.tutorial < [0]) && <div className="alert border" role="alert">
                                    <p>Result Not Found</p>

                                </div>}
                            </div>}
                            {!localStorage.getItem('auth-token') && <p>Premium users only</p>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

export default SearchModal;
