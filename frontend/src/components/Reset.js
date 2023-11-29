import '../App.css';
import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

export const Reset = (props) => {
  
  const [password, setPassword] = useState(''); 
  const navigate = useNavigate();
  const {id, token} = useParams();

  axios.defaults.withCredentials = true;

  function validateInput(input) {
    const passwordRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$");

    if(!passwordRegex.test(input)) {
        return false;
    }

    return true;
  }
  const handleSubmit = (e) => {

    e.preventDefault()
      if (validateInput(password)) {
      axios.post(`http://localhost:5003/reset/${id}/${token}`, {password})
      .then(res => {
      if(res.data.Status === "Success") {
        navigate('/')     
        }
      }).catch(err => console.log(err))
    } else {
      toast.error('Password must be at least 8 characters and contain one number, one uppercase, and one lowercase letter',
      { autoClose: false })
    }
  }    
  return (

    <div className="auth-form-container">
          <img className='reset-logo' src='/swampysells-logo.png'></img>
          <h1>Reset Your Password</h1>
          <form onSubmit={handleSubmit} className="register-form">
              <div className="verification-container">
                <label htmlFor='email'>New Password</label>
                <input
                  type="password"
                  placeholder="Enter your new password"
                  name="password"
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <button type="submit" style={{borderRadius:"10px", marginTop:"10px"}}>Change Password</button>
          </form>
          <Link to='/'>Already have an account? Log in here.</Link>
        </div>
  )
}
