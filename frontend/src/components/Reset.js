import React from 'react'
import { Link } from "react-router-dom";

export default function Reset() {
  return (
    <div className="auth-form-container">
          <img className="register-logo" src="../swampysells-logo.png"/>
          <h1>Reset Your Password</h1>
          <form className="register-form">
              <div className="verification-container">
                <label>Old Password</label>
                <input
                  //value={verificationCode}
                  type="text"
                  placeholder="Enter verification code"
                  //id="verificationCode"
                  //name="verificationCode"
                />
                <label>New Password</label>
                <input
                  //value={verificationCode}
                  type="text"
                  placeholder="Enter verification code"
                  //id="verificationCode"
                  //name="verificationCode"
                />
              </div>
          </form>
          <Link to='/' style={{color:"black"}}>Already have an account? Log in here.</Link>
        </div>
  )
}
