import React, { useState } from "react";


export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [verificationCode, setVerificationCode] = useState('');


    const submitForm =  async(event) => {
        console.log('submitform is called')
        event.preventDefault();
        if(validateInput())
            try{
                const response = await fetch('http://localhost:5003/api/register', {
                    mode: 'cors',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email }),
                });
                if (response.ok) {
                    alert('Check your inbox for code');
                    setVerificationCode('Input code');
                } else {
                    alert('Error sending Code')
                    throw Error;
                }

            } catch (error) {
                console.error(error);
            }
    }
    const handleVerification = async(event) => {
        try {
            const response = await fetch(`http://localhost:5003/api/register?email=${email}&code=${verificationCode}`);
            if (response.status ===200) {
                alert('Found in db. created account')
            }
            else {
                alert('Not found in db, did not create account');
            }
        } catch (error) {
            console.error(error)
        }
    }
    const validateInput = () => {
        const domainRegex = new RegExp("^[A-Za-z.]+@ufl\.edu$");
        const nameRegex = new RegExp("^[A-Za-z]+$");

        if (!firstName || !lastName || !email || !password) {
            alert("Empty Fields Not Allowed");
            return false;
        }
        if (!nameRegex.test(firstName) || !nameRegex.test(lastName)){
            alert("Invalid First Name or Last Name Field")
            return false;
        }
        if(!domainRegex.test(email)) {
            alert('Must Register With Valid UFL Email')
            return false;
        }

        return true;
    };
    return (
        <div className="auth-form-container">
          <img className="register-logo" src="../swampysells-logo.png"/>
          <h1>{verificationCode ? 'Enter Verification Code' : 'Create Account'}</h1>
          <form className="register-form" onSubmit={verificationCode ? handleVerification : submitForm}>
            {verificationCode ? (
              <div className="verification-container">
                <label htmlFor="verificationCode">Verification Code</label>
                <input
                  value={verificationCode}
                  onChange={(event) => setVerificationCode(event.target.value)}
                  type="text"
                  placeholder="Enter verification code"
                  id="verificationCode"
                  name="verificationCode"
                />
            </div>
            ) : (
              <div className="verification-container">
                <label htmlFor="firstName">First name</label>
                <input
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    name="firstName"
                    id="firstName"
                    placeholder="First name"
                />
                <label htmlFor="lastName">Last name</label>
                <input
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    name="lastName"
                    id="lastName"
                    placeholder="Last name"
                />
                <label htmlFor="email">Email</label>
                <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email address"
                />
                <label htmlFor="password">Password</label>
                <input
                    value={password}
                    onChange={(event)=> setPassword(event.target.value)}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                />
           </div>
            )}
            {verificationCode ? (
              <button type="submit">Verify Account</button>
            ) : (
              <button type="submit">Create Account</button>
            )}
          </form>
          <button className="link-btn" onClick={() => props.onFormSwitch('login')}>
            Already have an account? Log in here.
          </button>
        </div>
      );
}      