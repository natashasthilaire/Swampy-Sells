import React, { useState } from "react";


export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const submitForm = (e) => {
        //e.preventDefault is to prevent page from being reloaded
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
            <img className="register-logo"src="../swampysells-logo.png"></img>
            <h1>Create Account</h1>
            <form className="register-form" onSubmit={submitForm}>
                <label htmlFor="name">Full name </label>
                <input value={name} name="name" id="name" placeholder="Full name"/>
                <label htmlFor="email">email </label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address" id="email" name="email" />
                <label htmlFor="password">password </label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Create Account</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
        </div>
    )

}