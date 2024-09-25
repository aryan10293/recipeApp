import HomeButton from "./HomeButton";
import SavedRecipesButton from "./SavedRecipesButton";
import MessageButton from "./MessagesButton";
import ProfileIcon from "./ProfileIcon";
import useFetch from "./useFetch";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignOutButton from "./SignOutButton";


interface userInfo{
    userinfo:[]
}
interface NavbarProps{
    userName:string | null, 
    userProfilePicture?:string | undefined
    userId?:string | undefined
}

const Navbar:React.FC<NavbarProps> = ({userName,userProfilePicture,userId}) => {

    // const {data:picture} = useFetch(`http://localhost:2030/getuser/${localStorage.getItem("token")}`)

    const navigate = useNavigate()
    
    const handleClick = function(){
        navigate('/userprofile',{state:{userId:userId}})
    }
    
    return ( 
        <div className="navbar">
            <ul className="left-side">
                <li><SignOutButton margin="0"/></li>
            </ul>
            
            <ul className="middle-side">
                <li><HomeButton/></li>
                <li><SavedRecipesButton/></li>
                <li><MessageButton/></li>
            </ul>
            <ul className="right-side">
            
                <button onClick={handleClick} style={{backgroundColor:'transparent',border:'none',margin:'auto 10px', fontWeight:'400',fontSize:'1rem',height:'100%'}}>       
                        {/* {picture && picture.userinfo[0].userName}                   */}
                        {userName}
                </button>
            
               < ProfileIcon userId={userId} img={userProfilePicture}/>
            </ul>
        </div>
     );
}
 
export default Navbar;