import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CourseContext from '../context/Course/CourseContext';
import SideBar from './assets/SideBar';
import ReactPlayer from 'react-player'
import NotFound from './NotFound';
import CommentBox from './CommentBox';
import SpinnerBar from './SpinnerBar'

const CourseListItem = () => {

    const params = useParams();
    const { fetchCourse, getLession, fetchLession, getLessionData, loader, setLoader, error } = useContext(CourseContext);

    useEffect(() => {
        if (params.id && !params.name) {
            setLoader(true)
            fetchCourse(params.id);
            setLoader(true)
        }
        // eslint-disable-next-line
    }, [params.id]);

    useEffect(() => {
        if (params.name && params.id) {
            setLoader(true)
            fetchLession(params.id, params.name);
            setLoader(true)
        }
        // eslint-disable-next-line
    }, [params.name, params.id]);

    const quillFormat = (content) => {
        if (content) {
            const processedHtml = content.replace(/<img/g, '<img style="max-width: 400px; height: auto;"');
            return { __html: processedHtml };
        }
        return { __html: '' };
    }
    return (
        <>
            <div id="wrapper">
                <div className="overlay"></div>
                {getLession.lessonlist > [0] && <SideBar lession={getLession.lessonlist} />}

                <div id="page-content-wrapper">
                    <button type="button" className="hamburger animated fadeInLeft is-closed" data-toggle="offcanvas">
                        <span className="hamb-top"></span>
                        <span className="hamb-middle"></span>
                        <span className="hamb-bottom"></span>
                    </button>
                    <div className="container">
                        {loader && <SpinnerBar />}
                        <div className="row  d-flex justify-content-center">
                            <div className="col-lg-8 col-lg-offset-2 align-items-center text-start">
                                {error && (<NotFound />)}

                                {!params.name && getLession.course >= {} && (
                                    <>
                                        <img
                                            src={getLession.course.cover}
                                            className="img-fluid"
                                            alt={getLession.course.title}
                                            style={{
                                                width: '100vw',
                                                height: 'calc(100vw / 4)',
                                                objectFit: 'cover',
                                                objectPosition: 'center'
                                            }}
                                        />
                                        <h1>Course on: {getLession.course.title}</h1>
                                        <h4>Description</h4>
                                        <div dangerouslySetInnerHTML={quillFormat(getLession.course?.description)}></div>
                                        {/* <p className='text-start'>{fetchItem.description}</p> */}
                                    </>
                                )}
                                {params.name && (
                                    <>
                                        <ReactPlayer url={getLessionData.link}
                                            className="img-fluid"
                                            style={{
                                                width: '100vw',
                                                height: 'calc(100vw / 4)',
                                                objectFit: 'cover',
                                                objectPosition: 'center'
                                            }} controls />
                                        <h1>{getLessionData.title}</h1>
                                        <div dangerouslySetInnerHTML={quillFormat(getLessionData?.description)} ></div>
                                        {(!error && localStorage.getItem('auth-token')) && <CommentBox />}
                                        {!localStorage.getItem('auth-token') && <> <hr /> <div className="container my-5 py-">
                                            <p className='text-center'>Login for comment section </p></div></>}

                                    </>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CourseListItem;
