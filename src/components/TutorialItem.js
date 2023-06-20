import React, { useContext, useEffect } from 'react'
import TutorialContext from '../context/Tutorial/TutorialContext'
import { useParams } from 'react-router-dom'
import NotFound from './NotFound'
import SpinnerBar from './SpinnerBar'


const TutorialItem = () => {
    const params = useParams()
    const { getDetail, detail, setLoader, loader, error } = useContext(TutorialContext)
    useEffect(() => {
        setLoader(true)
        getDetail(params.id)
        setLoader(true)
        // eslint-disable-next-line
    }, [params.id])

    const quillFormat = (content) => {
        if (content) {
            const processedHtml = content.replace(/<img/g, '<img style="max-width: 350px; height: auto;"');
            return { __html: processedHtml };
        }
        return { __html: '' };
    }
    return (
        <div className="container my-4">
            <div className="row  d-flex justify-content-center">
                <div className="col-lg-8 col-lg-offset-2 align-items-center text-center">
                    {error && (<NotFound />)}
                    {loader && <SpinnerBar />}


                    {!loader && params.id && (
                        <>
                            <h1>Tutorial on: {detail.title}</h1>
                            <hr />
                            <div className='text-start'>
                                <div dangerouslySetInnerHTML={quillFormat(detail?.content)}></div>
                                {/* <div dangerouslySetInnerHTML={{ __html: detail.content }}></div> */}
                            </div>

                        </>
                    )}

                </div>
            </div>
        </div>
    )
}

export default TutorialItem