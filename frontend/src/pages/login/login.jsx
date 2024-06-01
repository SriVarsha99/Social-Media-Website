import React from "react";
import "./login.scss"
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useContext, useState , useEffect} from "react";
import axios from "axios";

const Login = () => {

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
      });
    const [error, setErr] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate()
    useEffect(() => {
        console.log('Component mounted, message should be empty:', message);
    }, []);
    const handleChange = e => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Login function called");
        if (!inputs.username || !inputs.password) {
            setMessage("Username and password are required.");
            return;
        }  
        try {
            const response = await axios.post('http://localhost:8800/api/auth/login', inputs, {
                withCredentials: true
            });
            if (response.status === 200) {
                // Handle success, maybe redirect or clear form
                console.log(response.data.message);
                console.log('Login successful!');
                navigate(`/Home/${response.data.user_id}`);

            }// Navigate to profile page after successful login
        } catch (error) {
            console.error("Login error:", error);
            if (error.response) {
                // Display backend error message
                console.error("Login error:", error.response.data.message);
                setMessage(error.response.data.message);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received:", error.request);
                setMessage("No response from server. Please check your network connection.");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error:", error.message);
                setMessage("Error during login. Please try again.");
            }
        }
    };
    return (
        <div className="login">
            <div className="card">
                <div className="top">
                    <h1>Bronco Connect</h1>
                    <span>Don't have an account?</span>
                    <Link to="/register"><button>Register</button></Link>
                </div>
                <div className="bottom">
                    <h1>login</h1>
                    <form>
                        <input type="text" placeholder="Username" name="username" onChange={handleChange} />
                        <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
                        <button onClick={handleLogin}>Login</button>
                    </form>
                    {message && <p className="error-message">{message}</p>}
                </div>
            </div>
        </div>
    )
}

export default  Login;  