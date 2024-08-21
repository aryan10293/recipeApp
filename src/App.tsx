import React from 'react';
import './App.css';
import AuthLayout from './pages/AuthLayout/AuthLayout';
import Login from './pages/AuthLayout/Login';
import Register from './pages/AuthLayout/Register';
import Home from './pages/home/Home';
//import Home from './pages/home/home';
import { Routes, Route, Navigate , Router} from 'react-router-dom'
function App() {
  return (
    <>
      <Routes>
          {/* More routes can be added here */}
        <Route path="/"element={ <AuthLayout />  } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </>
  );  
}

export default App;
