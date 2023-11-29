import '../App.css'
import { Home } from './Home'
import React, { useContext, useEffect, useState} from "react"; 
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//props is a way for parent values to send values to children
export const Forgot = (props) => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const submitForm = (event) =>
    {
        //e.preventDefault is to prevent page from being reloaded
        event.preventDefault(); 
        axios.post('http://localhost:5003/forgot', {email}).then(res => {
            
            console.log("in submit form");
            if (res.data.Status === "Success") {
                console.log(email);
                navigate('/login')
            } 
        }).catch(err => console.log(err))
        //console.log(email);
    }
    return (
            <div className="auth-form-container">
                <img className="login-logo" src="../swampysells-logo.png" style={{justifyContent:"center"}}></img>
                <h2>Forgot Password</h2>
                <p>Enter your email and we'll send you<br></br> a link to reset your password</p>     
                <form className="login-form" onSubmit={submitForm}>
                    <label htmlFor="email">Email </label>
                    <input value = {email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Email address" id="email" name="email" required/>
                    <button type="submit" style={{borderRadius:"10px", marginTop:"10px"}}>Send Link</button>
                </form>
            <Link to='/' style={{marginTop:"5px", color:"black", textDecoration:"underline"}}>Already have an account? Login here</Link>
            </div>
    )
}