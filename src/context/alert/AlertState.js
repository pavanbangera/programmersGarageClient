import React, { useState } from 'react'
import AlertContext from './AlertContext'

const AlertState = (props) => {
    const [alert, setAlert] = useState(null)
    const [progress, setProgress] = useState(0)

    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null)
        }, 1000);
    }
    return (
        <AlertContext.Provider value={{ showAlert, alert, progress, setProgress }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState