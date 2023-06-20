import React, { useState, useContext } from 'react'
import BlogContext from './BlogContext'
import AlertContext from '../alert/AlertContext';

const BlogState = (props) => {
    const { setProgress } = useContext(AlertContext)
    const [getBlog, setBlog] = useState([])
    const [loader, setLoader] = useState(true)
    const [error, setError] = useState(false)
    const [detail, setDetail] = useState([])


    const get = async (e) => {
        setProgress(30)
        const response = await fetch(`${process.env.REACT_APP_API}/api/blog/getBlog`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        setProgress(70)
        const json = await response.json()
        setBlog(json)
        setLoader(false)
        setProgress(100)
    }

    const getDetail = async (id) => {
        setProgress(30)
        const response = await fetch(`${process.env.REACT_APP_API}/api/blog/getBlogDetail/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        setProgress(70)
        if (response.status === 200) {
            const json = await response.json()
            setDetail(json[0])
            setLoader(false)
            setProgress(100)
        } else {
            setError(true)
            setLoader(false)
            setProgress(100)
        }
    }


    return (
        <BlogContext.Provider value={{ get, getBlog, loader, setLoader, getDetail, detail, error }}>
            {props.children}
        </BlogContext.Provider>
    )
}

export default BlogState