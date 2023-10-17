import React, { useState } from "react";


export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');


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
                <label htmlFor="firstName">First name</label>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} name="firstName" id="firstName" placeholder="First name"/>
                <label htmlFor="lastName">Last name</label>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} name="lastName" id="lastName" placeholder="Last name"/>
                <label htmlFor="email">Email </label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address" id="email" name="email" />
                <label htmlFor="password">Password </label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter password" id="password" name="password" />
                <button type="submit">Create Account</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Log in here.</button>
        </div>
    )

}