import React, {useState} from "react"; 
//props is a way for parent values to send values to children
export const Login = (props) => {
const [email, setEmail] = useState(''); 
const [password, setPassword] = useState(''); 

const submitForm = (e) =>
{
    //e.preventDefault is to prevent page from being reloaded
    e.preventDefault(); 
    console.log(email); 
}
    return (
        <div className="auth-form-container">
            <img className="login-logo"src="../swampysells-logo.png"></img>
            <h2>Welcome!</h2>
            <form className="login-form"onSubmit={submitForm}>
                <label htmlFor="email">Email </label>
                <input value = {email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address" id="email" name="email"/>
                <label htmlFor="password">Password </label>
                <input value={password} onChange={(e) => setPassword(e.target.value)}type="password" placeholder="********" id="password" name="password"/>
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn"onClick={() => props.onFormSwitch('register')}> Already have an account? Register here.</button>
        </div>
    )
}