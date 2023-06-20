import React, { useContext, useState } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from 'react-router-dom';
import AlertContext from "../alert/AlertContext";


const AuthState = (props) => {
    const { showAlert, setProgress } = useContext(AlertContext)
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false)
    const Login = async (email, password) => {
        setProgress(30)
        setLoader(true)
        const response = await fetch(`${process.env.REACT_APP_API}/api/auth/loginUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        setProgress(70)
        const json = await response.json()
        if (json.success) {
            localStorage.setItem('auth-token', json.authToken)
            localStorage.setItem('user-id', json.id)
            navigate('/');
            setLoader(false)

            showAlert("Logged in Successfuly", "success")
            setProgress(100)
        }
        else {
            setLoader(false)
            showAlert(json.error, "danger")
            setProgress(100)
        }
    }
    const Signup = async (name, email, password) => {
        setProgress(30)
        setLoader(true)
        const response = await fetch(`${process.env.REACT_APP_API}/api/auth/createUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });
        setProgress(70)
        const json = await response.json()
        if (json.success) {
            localStorage.setItem('auth-token', json.authToken)
            localStorage.setItem('user-id', json.id)
            navigate('/');
            setLoader(false)
            showAlert("SignUp Successfuly", "success")
            setProgress(100)
        }
        else {
            setLoader(false)
            showAlert(json.error, "danger")
            setProgress(100)
        }
    }
    return (
        <AuthContext.Provider value={{ Login, Signup, loader, setLoader }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState