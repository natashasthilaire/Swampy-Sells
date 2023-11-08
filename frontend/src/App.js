import './App.css';
import React from 'react';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Routes, Route } from 'react-router-dom';
import { Forgot } from './components/Forgot';
import  Home  from './components/Home';
import { Post } from './components/Post';
import Reset from './components/Reset';
import { History } from './components/History';
import { Inbox } from './components/Inbox';
import { Profile } from './components/Profile';

function App() {
  return (
    <>
    <div className="App">
      <Routes>
      <Route path='home' element={<Home />}></Route>
        <Route path='/' element={<Login />}></Route>
        <Route path='register' element={<Register />}></Route>
        <Route path='post' element={<Post />}></Route>
        <Route path='inbox' element={<Inbox />}></Route>
        <Route path='history' element={<History />}></Route>
        <Route path='profile' element={<Profile />}></Route>
        <Route path='forgot' element={<Forgot />}></Route>
        <Route path='reset' element={<Reset />}></Route>
      </Routes>
    </div>
    </>
  );

}

export default App;