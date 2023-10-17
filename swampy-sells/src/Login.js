import React, {useState} from "react"; 
//props is a way for parent values to send values to children
export const Login = (props) => {
const [email, setEmail] = useState(''); 
const [password, setPassword] = useState(''); 

const submitForm = (event) =>
{
    //e.preventDefault is to prevent page from being reloaded
    event.preventDefault(); 
}
    return (
        <div className="auth-form-container">
            <img className="login-logo"src="../swampysells-logo.png"></img>
            <h2>Welcome!</h2>
            <form className="login-form"onSubmit={submitForm}>
                <label htmlFor="email">Email </label>
                <input value = {email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Email address" id="email" name="email"/>
                <label htmlFor="password">Password </label>
                <input value={password} onChange={(event) => setPassword(event.target.value)}type="password" placeholder="Enter password" id="password" name="password"/>
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn"onClick={() => props.onFormSwitch('register')}> Don't have an account? Sign up</button>
        </div>
    )
}