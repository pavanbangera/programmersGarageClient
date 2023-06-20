import React, { useState, useContext } from 'react'
import BugsContext from './BugsContext'
import AlertContext from '../alert/AlertContext';

const BugsState = (props) => {
    const { showAlert, setProgress } = useContext(AlertContext)
    const [bugs, setBugs] = useState({ userBugs: "", otherBugs: "" })
    const [comment, setComment] = useState([])
    const [loader, setLoader] = useState(true)
    const [error, setError] = useState(false)
    const [detail, setDetail] = useState([])

    const addBug = async (title, description) => {
        setProgress(30)
        const response = await fetch(`${process.env.REACT_APP_API}/api/bug/addbug`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ title, description }),
        });
        setProgress(70)
        const json = await response.json()
        if (response.status === 200) {
            setBugs({ userBugs: [json, ...bugs.userBugs], otherBugs: bugs.otherBugs })
            showAlert("Your bug added Successfully!", "success")
            setProgress(100)
        } else {
            showAlert(json, "danger")
            setProgress(100)
        }


    }
    const getBug = async () => {
        setProgress(30)
        const response = await fetch(`${process.env.REACT_APP_API}/api/bug/getbug`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('auth-token')
            },
        });
        setProgress(70)
        if (response.status === 200) {
            const json = await response.json()
            setBugs(json)
            setProgress(100)
            setLoader(false)
        } else {
            setProgress(100)
            setLoader(false)
        }


    }

    const getDetail = async (id) => {
        setProgress(30)
        const response = await fetch(`${process.env.REACT_APP_API}/api/bug/getBugDetail/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        setProgress(70)
        const json = await response.json()
        if (response.status === 200) {
            setDetail(json[0])
            setLoader(false)
            setProgress(100)
        } else {
            setError(true)
            setLoader(false)
            showAlert(json, "danger")
            setProgress(100)
        }
    }

    const deleteBug = async (id) => {
        setProgress(30)
        const response = await fetch(`${process.env.REACT_APP_API}/api/bug/deletebug/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        setProgress(70)
        if (response.status === 200) {
            setBugs({ userBugs: bugs.userBugs.filter((item) => { return item._id !== id }), otherBugs: bugs.otherBugs })
            showAlert("Your bug deleted successfully!", "success")
            setProgress(100)
        }
        else {
            showAlert(response.json(), "danger")
            setProgress(100)
        }
    }

    const addComment = async (bug, content) => {
        setProgress(30)
        await fetch(`${process.env.REACT_APP_API}/api/bug/addcomment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ bug, content }),
        });
        setProgress(70)
        getComment(bug)
        showAlert("Your solution added", "success")
        setProgress(100)
    }
    const getComment = async (bug) => {
        const response = await fetch(`${process.env.REACT_APP_API}/api/bug/getcomment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ bug }),
        });
        if (response.status === 200) {
            const json = await response.json()
            setComment(json)
            setLoader(false)
        } else {
            setError(true)
            setLoader(false)
        }

    }

    const deleteComment = async (id) => {
        setProgress(30)
        const response = await fetch(`${process.env.REACT_APP_API}/api/bug/deletecomment/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        setProgress(70)
        if (response.status === 200) {
            setComment(comment.filter((item) => { return item._id !== id }))
            showAlert("Your solution deleted!", "success")
            setProgress(100)
        }
        else {
            showAlert(response.json(), "danger")
            setProgress(100)
        }

    }


    return (
        <BugsContext.Provider value={{ addBug, getBug, bugs, getComment, addComment, comment, loader, setLoader, getDetail, detail, error, deleteBug, deleteComment }}>
            {props.children}
        </BugsContext.Provider>
    )
}

export default BugsState