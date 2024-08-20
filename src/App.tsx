<<<<<<< HEAD
import * as React from 'react'
import './App.css'

=======
import React from 'react';
import './App.css';
import './pages/AuthLayout/Login.css'

import AuthLayout from './pages/AuthLayout/AuthLayout';
import Login from './pages/AuthLayout/Login';
import Register from './pages/AuthLayout/Register';
import { Routes, Route, Navigate , Router} from 'react-router-dom'
import Navbar from './Navbar';
import Home from './pages/home/Home';
import Feed from './Feed';
import Messages from './Messages';
import Profile from './Profile';
import SavedRecipes from './SavedRecipes';
>>>>>>> 6cdccc3 (create a couple of elements and start working on the login page UI)
function App() {


  return (
<<<<<<< HEAD
    <div>
        qwertyuiolkjhgfdsazxcvb    </div>
  )
=======
    <>
      <Routes>
          {/* More routes can be added here */}
        <Route path="/"element={ <AuthLayout />  } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/messages" element={<Messages/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/savedrecipes" element={<SavedRecipes/>} />
      </Routes>
    </>
  );  
>>>>>>> 6cdccc3 (create a couple of elements and start working on the login page UI)
}

export default App
