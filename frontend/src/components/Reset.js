import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

//old password $2b$12$h/xjJjdLh8xFlSHwvfHZxOAkmYWpaloKYAt/Nxy1I8Jw03D/6VOXC
export default function Reset() {
  
  const [password, setPassword] = useState(''); 
  const navigate = useNavigate();
  const {id, token} = useParams();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`http://localhost:3001/reset/${id}/${token}`, {password})
    .then(res => {
    if(res.data.Status === "Success") {
      navigate('/')
                  
      }
    }).catch(err => console.log(err))
  }    
  return (
    <div className="auth-form-container">
          <img className="register-logo" src="../swampysells-logo.png"/>
          <h1>Reset Your Password</h1>

          <form onSubmit={handleSubmit} className="register-form">
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
              <button type="submit" style={{borderRadius:"10px", marginTop:"10px"}}>Create Account</button>
          </form>
          <Link to='/' style={{color:"black"}}>Already have an account? Log in here.</Link>
        </div>
  )
}
