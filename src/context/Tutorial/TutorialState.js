import React, { useState, useContext } from 'react'
import TutorialContext from './TutorialContext'
import AlertContext from '../alert/AlertContext';

const TutorialState = (props) => {
    const { setProgress } = useContext(AlertContext)
    const [getTutorial, setTutorial] = useState([])
    const [detail, setDetail] = useState([])
    const [loader, setLoader] = useState(true)
    const [error, setError] = useState(false)


    const get = async (e) => {
        setProgress(30)
        const response = await fetch(`${process.env.REACT_APP_API}/api/tutorial/getTutorial`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        setProgress(70)
        if (response.status === 200) {
            const json = await response.json()
            setTutorial(json)
            setLoader(false)
            setProgress(100)
        } else {
            setError(true)
            setLoader(false)
            setProgress(100)
        }
    }
    const getDetail = async (id) => {
        setProgress(30)
        const response = await fetch(`${process.env.REACT_APP_API}/api/tutorial/getTutorialDetail/${id}`, {
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
        <TutorialContext.Provider value={{ getTutorial, get, loader, setLoader, error, getDetail, detail }}>
            {props.children}
        </TutorialContext.Provider>
    )
}

export default TutorialState