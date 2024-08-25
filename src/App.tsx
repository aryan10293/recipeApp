import React from 'react';
import './App.css';
import '../src/pages/AuthLayout/Login.css'
import '../src/pages/AuthLayout/Register.css'
import '../src/pages/feed/Feed.css'
import AuthLayout from './pages/AuthLayout/AuthLayout';
import Login from './pages/AuthLayout/Login';
import Register from './pages/AuthLayout/Register';
import Home from './pages/home/Home';
import Feed from './pages/feed/Feed';
import './Navbar.css'
import { Routes, Route, Navigate , Router} from 'react-router-dom'
import Messages from './Messages';
function App() {
  return (
    <>
      <Routes>
          {/* More routes can be added here */}
        <Route path="/"element={ <AuthLayout />  } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </>
  );  
}

export default App;
