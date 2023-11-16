import React, { useState } from "react";
import TypeAheadDropDown from "./TypeAheadDropDown";
import dorms from "../locations";
import { Link } from "react-router-dom";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [location, setLocation] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [showVerification, setShowVerification] = useState(false);

    //const  dorms = ['Beaty Towers','Broward Hall','Buckman Hall','Corry Village','Cypress Hall','Diamond Village','East Hall','Fletcher Hall','Graham Hall','Honors Village','Hume Hall','Infinity Hall','Keys Complex','Lakeside Complex','Mallory Hall','Murphree Hall','North Hall','Off-campus','Rawlings Hall','Reid Hall','Riker Hall','Simpson Hall','Sledd Hall','Springs Complex','Tanglewood Village','The Continuum','Thomas Hall','Tolbert Hall','Trusler Hall','Weaver Hall','Yulee Hall',];

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
        const nameRegex = new RegExp("^[A-Za-z ]+$");

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
                <label htmlFor="location">Location</label>
                <TypeAheadDropDown iteams={dorms} onChange={(event)=> setLocation(event.target.value)} />
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