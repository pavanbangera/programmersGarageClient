import React, { useContext } from 'react'
import LoadingBar from 'react-top-loading-bar'
import AlertContext from '../context/alert/AlertContext'

const TopBarLoader = () => {
    const { progress } = useContext(AlertContext)
    return (
        <LoadingBar
            color='#f11946'
            progress={progress}
        />
    )
}

export default TopBarLoader