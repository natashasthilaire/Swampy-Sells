import React, {useState} from "react"; 
import { Link, useNavigate} from "react-router-dom";
import { useAuth } from '../context/AuthProvider';
//props is a way for parent values to send values to children
export const Login = () => {
const [email, setEmail] = useState(''); 
const [password, setPassword] = useState('');
const { login, user } = useAuth();
const navigate = useNavigate();

const submitForm = async(event) =>
{
    //e.preventDefault is to prevent page from being reloaded
    event.preventDefault(); 
    console.log(email);

    try {
        await login(email, password);
        navigate('/home');
    } catch (error) {
        console.error(error);
    }
}
    return (
        <div className="auth-form-container">
            <img className="login-logo"src="../swampysells-logo.png"></img>
            <h2>Welcome!</h2>
            <form className="login-form"onSubmit={submitForm}>
                <label htmlFor="email">Email </label>
                <input value = {email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Email address" id="email" name="email" required/>
                <label htmlFor="password">Password </label>
                <input value={password} onChange={(event) => setPassword(event.target.value)}type="password" placeholder="Enter password" id="password" name="password" required/>
                <button type="submit" style={{borderRadius:"10px", marginTop:"10px"}}>Log In</button>
            </form>
        <Link to='/register' style={{color:"black", textDecoration:"underline"}}>Don't have an account? Sign up</Link>
        <Link to='/forgot' style={{color:"black", textDecoration:"underline"}}>Forgot your password?</Link>
        </div>
    )
}