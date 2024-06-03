import React, { useState , useEffect} from "react";
import "./register.scss";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useHistory, useNavigate } from 'react-router-dom';


const Register = () => {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        username:"",
        password:"",
        dob: "",
        address:"",
        phone:"",
        gender:"",
    });
    
    const [error, setErr] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        console.log('Component mounted, message should be empty:', message);
    }, []);
    const handleChange = e => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const handleClick = async (e) => {
      e.preventDefault();
  
      try {
        const response= await axios.post("http://localhost:8800/api/auth/register", inputs);
        if (response.status === 200) {
            // Handle success, maybe redirect or clear form
            console.log(response.data.message);
            setMessage(response.data.message);
            setMessage('Registration successful! Redirecting to login...');
                 setTimeout(() => {
                     navigate('/login');
                 }, 2000); // Redirect after 2 seconds
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
            setMessage(error.response.data.message); 
        } else {
            setErr("An unknown error occurred.");
        }
      }
    };
  
    console.log(error)
    console.log(inputs);
    return (
        <div className="register">
            <div className="card">
                <div className="right">
                    <h1>Register</h1>
                    <form>
                        <input type="text" placeholder="Name" name="name" onChange={handleChange} />
                        <input type="email" placeholder="Email" name="email" onChange={handleChange} />
                        <input type="text" placeholder="Username" name="username" onChange={handleChange} />
                        <input type="password" placeholder="Password" name="password" onChange={handleChange} />
                        <label htmlFor="dob" className="dob">DOB:</label>
                        <input type="date" className="dob-input" placeholder="Date of Birth" name="dob" onChange={handleChange}/>
                        <input type="text" placeholder="Address" name="address" onChange={handleChange} />
                        <input type="tel" placeholder="Phone number" name="phone" onChange={handleChange} />
                        <label htmlFor="gender" className="gender">Select Gender:</label>
                        <select className="gender-select" name="gender" onChange={handleChange}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <button onClick={handleClick}>Register</button>
                    </form>
                    {message && <p>{message}</p>}
                </div>
                <div className="left">
                    <h1>Bronco Connect</h1>
                    <span>Do you have an account?</span>
                    <Link to="/login"><button>Login</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Register;