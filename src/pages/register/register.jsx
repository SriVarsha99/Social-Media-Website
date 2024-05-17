import React from "react";
import "./register.scss";
import { Link } from 'react-router-dom';

const Register = () => {
    return(
        <div className="register">
            <div className="card">
                <div className="right">
                    <h1>Register</h1>
                    <form>
                        <input type="text" placeholder="Name"/>
                        <input type="email" placeholder="Email"/>
                        <input type="text" placeholder="Username"/>
                        <input type="password" placeholder="password"/>
                        <input type="date" placeholder="Date of birth"/>
                        <label htmlFor="gender" className="gender">Select Gender:</label>
                        <select className="gender-select">Gender 
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <input type="text" placeholder="Address"/>
                        <button>Register</button>
                    </form>
                </div>
                <div className="left">
                    <h1>Bronco Connect</h1>
                    <span>Do you have an account ?
                    </span>
                    <Link to="/login"><button>Login</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Register;