import React, { useState } from "react";
import TypeAheadDropDown from "./TypeAheadDropDown";
import dorms from "../locations";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [location, setLocation] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [showVerification, setShowVerification] = useState(false);

    const submitForm =  async(event) => {
        event.preventDefault();
        if(validateInput())
            try{
                const response = await fetch('http://localhost:5003/api/register', {
                    mode: 'cors',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ firstName, lastName, email, password, location }),
                });
                if (response.ok) {
                    toast.info('Check your inbox for code');
                    setShowVerification(true);
                } else {
                   toast.error('Error sending code');
                    throw Error;
                }

            } catch (error) {
                console.error(error);
                toast.error('Error creating account');
            }
    }
    const handleVerification = async(event) => {
        try {
            const response = await fetch(`http://localhost:5003/api/register?email=${email}&code=${verificationCode}`);
            if (response.status ===200) {
                toast.success('Account successfully created')
            }
            else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error(error)
            toast.error('Error creating account');

        }
    }
    const validateInput = () => {
        const domainRegex = new RegExp("^[A-Za-z.]+@ufl\.edu$");

        if(!domainRegex.test(email)) {
            toast.error('Must Register With Valid UFL Email');
            return false;
        }
        return true;
    };
    
    return (
        <div className="auth-form-container">
          <img className="register-logo" src="../swampysells-logo.png"/>
          <h1>{verificationCode ? 'Enter Verification Code' : 'Create Account'}</h1>
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
                  required
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
                    required
                />
                <label htmlFor="lastName">Last name</label>
                <input
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    name="lastName"
                    id="lastName"
                    placeholder="Last name"
                    required
                />
                <label htmlFor="email">Email</label>
                <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email address"
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    value={password}
                    onChange={(event)=> setPassword(event.target.value)}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    required
                />
                <label htmlFor="location">Location</label>
                <TypeAheadDropDown onChange={(e)=> setLocation(e.target.value)} iteams={dorms} />
           </div>
            )}
            {verificationCode ? (
              <button type="submit" style={{borderRadius:"10px", marginTop:"10px"}}>Verify Account</button>
            ) : (
              <button type="submit" style={{borderRadius:"10px", marginTop:"10px"}}>Create Account</button>
            )}
          </form>
          <Link to='/'>Already have an account? Log in here.</Link>
        </div>
      );
}      