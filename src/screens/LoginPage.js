import React, { useState, useEffect }  from 'react'
import { Redirect, useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './LoginPage.css'

const axios = require('axios');

function LoginPage() {

    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const history = useHistory();
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            history.push("/");
        }
    });

    const login = () => {
        axios({
            url: "https://humanresources.cleverapps.io/login", 
            method: 'POST',
            data: {
                email: email,
                password: password,
            }
        }).then((res) => {
            if (res.data.code === 200) {
                localStorage.setItem("token", res.data.message);
                history.push("/");
            } else {
                MySwal.fire({
                    title: <p>{res.data.message}</p>,
                    toast: true,
                    position: 'bottom-end',
                    timer: 2500,
                    icon: "error",
                    timerProgressBar: true
                }).then(() => {
                    setEmail("");
                    setPassword("");
                })
            }
        })
    }

    return (
        <div id="main">
            <div id="login" >
                <h2>Login</h2>
                <input type="text" id="email" value={email} onChange={(arg) => setEmail(arg.target.value)} placeholder="Email"/>
                <span id="email-border"></span>
                <input type="password" id="password" value={password} onChange={(arg) => setPassword(arg.target.value)} placeholder="Password" />
                <span id="password-border"></span>
                <button className="button" onClick={login}>login</button>
            </div>
        </div>
    )
}

export default LoginPage;