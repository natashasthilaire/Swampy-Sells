import logo from './logo.svg';
import './App.css';
import { Login } from './Login';
import { Register } from './Register';
import React, { useState } from 'react';

function App() {
  const [currForm, setCurrForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrForm(formName);
  }
  return (
    <div className="App">
      {
        currForm === "login" ? <Login  onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm} />
      }
    </div>
  );
}

export default App;
