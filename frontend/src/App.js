import './App.css';
import React from 'react';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Forgot } from './components/Forgot';
import { Home }  from './components/Home';
import { Post } from './components/Post';
import { Reset } from './components/Reset';
import { History } from './components/History';
import { Inbox } from './components/Inbox/Inbox';
import { Profile } from './components/Profile';
import { useAuth } from './context/AuthProvider';

function ProtectRoute({ element, ...rest }) {
  const  { authenticated } = useAuth();
  console.log('authenticated in ProtectRoute: ', authenticated);

  return authenticated ? (
    element
  ) : (
    <Navigate to='/' replace={true} />
  )
}

function App() {
  return (
    <>
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='register' element={<Register />}></Route>
        <Route path='home' element={<ProtectRoute element={<Home />} />}/>
        <Route path='post' element={<ProtectRoute element={<Post />} />}/>
        <Route path='inbox' element={<ProtectRoute element={<Inbox />}/>}/>
        <Route path='history' element={<ProtectRoute element={<History />}/>}/>
        <Route path='profile' element={<ProtectRoute element={<Profile />}/>}/>
        <Route path='forgot' element={<Forgot />}></Route>
        <Route path='/reset/:id/:token' element={<Reset />}></Route>
      </Routes>
    </div>
    </>
  );

}

export default App;