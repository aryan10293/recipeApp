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
import './components/slidingButton.css';
import './pages/Messages/messages.css'
import './components/NutritionCard.css'

import Login from './pages/AuthLayout/Login';
import Register from './pages/AuthLayout/Register';
import Feed from './pages/feed/Feed';
import UserContext, { UserProvider } from './contexts/UserContext'
import { Routes, Route, Navigate , Router, BrowserRouter} from 'react-router-dom'
import Messages from './pages/Messages/Messages';
import SavedRecipes from './pages/SavedRecipes/SavedRecipes';
import SingleCard from './pages/SingleCard/SingleCard';
import ProfilePage from './pages/Profile/ProfilePage'
import EditProfile from './pages/EditProfilePage/EditProfile'
import PrivateRoute from './Routes/PrivateRoute'
import ScrollToTop from './Utils/ScrollToTop'
import Profile from './pages/Profile/Profile'
import EditProfileCard from './components/EditProfileCard'

import SearchPage from './pages/searchPage/SearchPage'
function App() {
  const [userId, setUserId] = React.useState<string>('')
  const [userInfo, setUserInfo] = React.useState<any[]>([])
  React.useEffect(() => {
          const getUser = async() => {
              const checkUser = await fetch(`http://localhost:2030/getuser/${localStorage.getItem('token')}`, {
                  method:'GET',
                  headers: {'Content-Type': 'application/json'}
              })
              const userData = await checkUser.json()
              setUserId(userData.userinfo[0]._id)
              setUserInfo(userData.userinfo)
          }
          getUser()
      }, [])
  return (
    
      <>
      <UserProvider>
        <ScrollToTop/>
        <Routes>       
          {/* public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/"element={<Login /> } />
          {/* <PrivateRoute> */}
            <Route path="/savedrecipes"element={<SavedRecipes />  } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/home' element={<Feed />} />
            <Route path='/feed' element={<Feed />} />
            <Route path="/messages" element={<Messages/>} />
            <Route path='/userprofile' element={<EditProfile/>} />
            <Route path="/messages/:id" element={<Messages userId={userId}/>} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/recipe" element={<SingleCard />} />
            <Route path="/search" element={<SearchPage />} />
          {/* </PrivateRoute> */}
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
