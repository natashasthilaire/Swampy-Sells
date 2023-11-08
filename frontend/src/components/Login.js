import '../App.css'
import React, {useState} from "react"; 
import { Link } from "react-router-dom";
//props is a way for parent values to send values to children
export const Login = (props) => {
const [email, setEmail] = useState(''); 
const [password, setPassword] = useState(''); 

const submitForm = (event) =>
{
    //e.preventDefault is to prevent page from being reloaded
    event.preventDefault(); 
     console.log(email);
}
    return (
        <div className="auth-form-container">
            <img className="login-logo" src="../swampysells-logo.png" style={{justifyContent:"center"}}></img>
            <h2>Welcome!</h2>
            <form className="login-form"onSubmit={submitForm}>
                <label htmlFor="email">Email </label>
                <input value = {email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Email address" id="email" name="email"/>
                <label htmlFor="password">Password </label>
                <input value={password} onChange={(event) => setPassword(event.target.value)}type="password" placeholder="Enter password" id="password" name="password"/>
                <button type="submit" style={{borderRadius:"10px", marginTop:"10px"}}>Log In</button>
            </form>
        <Link to='/register'>Don't have an account? Sign up</Link>
        </div>
    )
}