import React, { useContext, useState } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from 'react-router-dom';
import AlertContext from "../alert/AlertContext";


const AuthState = (props) => {
    const { showAlert, setProgress } = useContext(AlertContext)
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false)
    const [verified, setVerified] = useState(false)
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
        else if (json.success === false) {
            showAlert(json.msg, "success")
            setLoader(false)
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
            setLoader(false)
            showAlert("SignUp Successfuly" + json.msg, "success")
            setProgress(100)
        }
        else {
            setLoader(false)
            showAlert(json.error, "danger")
            setProgress(100)
        }
    }
    const Verify = async (id) => {
        setLoader(true)
        const response = await fetch(`${process.env.REACT_APP_API}/api/auth/verify/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            setVerified(true)
            setLoader(false)
        }
        else {
            setVerified(false)
            setLoader(false)
        }
    }
    const ForgotPass = async (email) => {
        setProgress(30)
        setLoader(true)
        const response = await fetch(`${process.env.REACT_APP_API}/api/auth/forgot`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        const json = await response.json()
        if (response.status === 200) {
            showAlert(json.msg, "success")
            setLoader(false)
            setProgress(100)
        }
        else {
            showAlert("Email not found", "danger")
            setLoader(false)
            setProgress(100)
        }
    }
    const ChangePass = async (id, password) => {
        setProgress(30)
        setLoader(true)
        const response = await fetch(`${process.env.REACT_APP_API}/api/auth/Changepassword`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, password }),
        });
        if (response.status === 200) {
            setLoader(false)
            window.location.replace('/login');
            showAlert("Password Changed Successfully! ", "success")
            setProgress(100)
        }
        else {
            setLoader(false)
            window.location.replace('/login');
            showAlert("Some Error occured..try again", "danger")
            setProgress(100)
        }
    }

    return (
        <AuthContext.Provider value={{ Login, Signup, loader, setLoader, Verify, verified, ForgotPass, ChangePass }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState