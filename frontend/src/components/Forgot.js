import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

export const Forgot = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [showVerification, setShowVerification] = useState(false);

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
                    body: JSON.stringify({ firstName, lastName, email, password }),
                });
                if (response.ok) {
                    alert('Check your inbox for code');
                    setShowVerification(true);
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
            if (response.status === 200) {

                alert('Found in db. created new password')
            }
            else {
                alert('Not found in db, did not create new password');
            }
        } catch (error) {
            console.error(error)
        }
    }
    const validateInput = () => {
        const domainRegex = new RegExp("^[A-Za-z.]+@ufl\.edu$");

        if(!domainRegex.test(email)) {
            alert('Must Register With Valid UFL Email')
            return false;
        }

        return true;
    };
    
    return (
        <div className="auth-form-container">
          <img className="register-logo" src="../swampysells-logo.png"/>
          <h1>Reset Your Password</h1>
          <form className="register-form" onSubmit={showVerification ? handleVerification : submitForm}>
            {showVerification ? (
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
                <label htmlFor="email">Email</label>
                <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email address"
                />
           </div>
            )}
            {verificationCode ? (
               <button type="submit" style={{borderRadius:"10px", marginTop:"10px"}}>Verify Account</button>
            ) : (
              <button type="submit" style={{borderRadius:"10px", marginTop:"10px"}}>Send Verification Code</button>
            )}
          </form>
          <Link to='/' style={{color:"black"}}>Already have an account? Log in here.</Link>
        </div>
      );
}      