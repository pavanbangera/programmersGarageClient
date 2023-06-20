import React, { useState, useContext } from 'react'
import CourseContext from './CourseContext'
import AlertContext from '../alert/AlertContext';

const CourseState = (props) => {
    const { showAlert, setProgress } = useContext(AlertContext)
    const [getItem, setGetItem] = useState([]);
    const [getLession, setLession] = useState({});
    const [getLessionData, setLessionData] = useState({});
    const [lessionLink, setLessionLink] = useState([]);
    const [comment, setComment] = useState([])
    const [loader, setLoader] = useState(true)
    const [error, setError] = useState(false)

    const getCourse = async (e) => {
        setProgress(30)
        const response = await fetch(`${process.env.REACT_APP_API}/api/course/getCourse`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        setProgress(70)
        if (response.status === 200) {
            const json = await response.json()
            setGetItem(json)
            setLoader(false)
            setProgress(100)
        }
        else {
            setLoader(false)
            setError(true)
            setProgress(100)
        }
    }


    const fetchCourse = async (id) => {
        setProgress(30)
        const response = await fetch(`${process.env.REACT_APP_API}/api/lession/getLessionList/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        setProgress(70)
        if (response.status === 200) {
            const json = await response.json()
            console.log(json)
            setLession(json)
            setLoader(false)
            setProgress(100)
        }
        else {
            setLoader(false)
            setError(true)
            setProgress(100)
        }

    };
    const fetchLession = async (id, name) => {
        setProgress(30)
        const response = await fetch(`${process.env.REACT_APP_API}/api/lession/getLession/${id}/${name}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        setProgress(70)
        if (response.status === 200) {
            const json = await response.json()
            setLessionData(json.course[0])
            setLession({ lessonlist: json.lessionList })
            setLoader(false)
            setProgress(100)
        }
        else {
            setError(true)
            setLoader(false)
            setProgress(100)
        }

    };

    const addComment = async (lession, content) => {
        setProgress(30)
        const response = await fetch(`${process.env.REACT_APP_API}/api/lession/addcomment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ lession, content }),
        });
        setProgress(70)
        const json = await response.json()
        if (response.status === 200) {
            setComment([json, ...comment]);
            showAlert("Comment added successfully!", "success")
            setProgress(100)
        } else {
            showAlert(json, "danger")
            setProgress(100)
        }
    }
    const getComment = async (lession) => {
        const response = await fetch(`${process.env.REACT_APP_API}/api/lession/getcomment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ lession }),
        });
        const json = await response.json()
        if (response.status === 200) {
            setComment(json)
        }
        else {
            showAlert(json, "danger")
        }
    }

    const deleteComment = async (id) => {
        setProgress(30)
        const response = await fetch(`${process.env.REACT_APP_API}/api/lession/deletecomment/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        setProgress(70)
        const json = response.json()
        if (response.status === 200) {
            setComment(comment.filter((item) => { return item._id !== id }))
            showAlert("Comment deleted successfully!", "success")
            setProgress(100)
        }
        else {
            showAlert(json, "danger")
            setProgress(100)
        }

    }



    return (
        <CourseContext.Provider value={{ getCourse, getItem, fetchCourse, getLession, setLessionLink, lessionLink, addComment, getComment, comment, fetchLession, getLessionData, loader, setLoader, error, deleteComment }}>
            {props.children}
        </CourseContext.Provider>
    )
}



export default CourseState