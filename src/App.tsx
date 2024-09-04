import * as React from 'react'
import './App.css'
import '../src/pages/AuthLayout/Login.css'
import '../src/pages/AuthLayout/Register.css'
import '../src/pages/feed/Feed.css'
import './assets/Navbar.css'
import './assets/CreateRecipe.css'
import '../src/pages/SingleCard/SingleCard.css'
import '../src/components/CommentBox.css'

import AuthLayout from './pages/AuthLayout/AuthLayout';
import Login from './pages/AuthLayout/Login';
import Register from './pages/AuthLayout/Register';
// import Home from './pages/home/Home';
import Feed from './pages/feed/Feed';


import { Routes, Route, Navigate , Router} from 'react-router-dom'
import Messages from './pages/Messages/Messages';
import Navbar from './assets/Navbar';
import Profile from './pages/Profile/Profile';
import SavedRecipes from './pages/SavedRecipes/SavedRecipes';
import SingleCard from './pages/SingleCard/SingleCard';
function App() {


  return (
    <>
    
      < Routes>
          {/* More routes can be added here */}
        {/* <Route path="/"element={<AuthLayout />  } /> */}
        <Route path="/"element={<Login />  } />
        <Route path="/savedrecipes"element={<SavedRecipes />  } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/home' element={<Feed />} />
        <Route path='/feed' element={<Feed />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/recipe" element={<SingleCard />} />
      </Routes>
    </>
  );  
}

export default App;
