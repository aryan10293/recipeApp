import * as React from 'react'
import './App.css'
import '../src/pages/AuthLayout/Login.css'
import '../src/pages/AuthLayout/Register.css'
import '../src/pages/feed/Feed.css'
import './assets/Navbar.css'
import './assets/CreateRecipe.css'
import '../src/pages/SingleCard/SingleCard.css'
import '../src/components/CommentBox.css'
import '../src/components/ProfileCard.css'

import Login from './pages/AuthLayout/Login';
import Register from './pages/AuthLayout/Register';
// import Home from './pages/home/Home';
import Feed from './pages/feed/Feed';

import UserContext, { UserProvider } from './contexts/UserContext'

import { Routes, Route, Navigate , Router, BrowserRouter} from 'react-router-dom'
import Messages from './pages/Messages/Messages';
import SavedRecipes from './pages/SavedRecipes/SavedRecipes';
import SingleCard from './pages/SingleCard/SingleCard';
import ProfilePage from './pages/Profile/ProfilePage'
import EditProfile from './pages/EditProfilePage/EditProfile'
import PrivateRoute from './Routes/PrivateRoute'
function App() {


  return (   
    
      <>
      <UserProvider>
        <Routes>       
          {/* public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/"element={<Login />  } /> 
        
        
        
          
          {/* private routes */}
          <Route path="/savedrecipes"element={<PrivateRoute><SavedRecipes /></PrivateRoute>  } />
          <Route path='/home' element={<PrivateRoute><Feed /></PrivateRoute>} />
          <Route path='/feed' element={<PrivateRoute><Feed /></PrivateRoute>} />
          <Route path="/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage/></PrivateRoute>} />
          <Route path='/userprofile' element={<PrivateRoute><EditProfile/></PrivateRoute>} />
          <Route path="/recipe" element={<PrivateRoute><SingleCard /></PrivateRoute>} />
          
        </Routes>
        </UserProvider>
        </>
    
  );
}

export default App;
