import React from "react";
import "./login.scss"
import { Link } from "react-router-dom";
const login = () => {
    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1></h1>
                    <span>Don't have an account?</span>
                    <Link to="/register"><button>Register</button></Link>
                </div>
                <div className="right">
                    <h1>login</h1>
                    <form>
                        <input type="text" placeholder="Username"/>
                        <input type="password" placeholder="Password"/>
                        <button>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default  login;  