import logo from './logo.svg';
import React from 'react';
import './App.css';
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';

import { Login } from './components/Login';
import { Register } from './components/Register';
import Home from './components/Home';
import { useState } from 'react';

function App() {
  const [currForm, setCurrForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrForm(formName);
  }
  return (
    <>
    <Routes>
      <Route path="/" element= {<Home/> }/>
    </Routes>
     <div className="App">
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
     </div>
    </>
  );
}

export default App;